import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserStoreValidator, UserUpdateValidator } from 'App/Validators/Manager/UserValidator'
import Role from 'App/Models/Role'
import PermissionGroup from 'App/Models/PermissionGroup'
import HelperPolicy from 'App/Policies/HelperPolicy'

export default class UsersController {
  public async index ({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    const page = request.input('page', 1)
    const limit = 20

    const users = await User.query()
      .preload('roles', (query) => query.orderBy('power', 'desc').limit(2))
      .paginate(page, limit)

    return view.render('manager/users/index', {
      users: users.toJSON()
    })
  }

  public async create ({ view, auth, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('view')

    const hoistRole = await HelperPolicy.getMaxRole(auth.user!)
    const roles = await Role.query().whereRaw(`power < ${hoistRole.power}`)
    const groups = await PermissionGroup.query().preload('permissions')

    return view.render('manager/users/create', { roles, groups })
  }

  public async store ({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')

    const data = await request.validate(UserStoreValidator)
    const user = await User.find((await User.create(data)).id)

    const roles = request.input('roles')
    if (roles) {
      await user?.related('roles').sync(Array.isArray(roles) ? roles : [roles])
    }

    const permissions = request.input('permissions')
    if (permissions) {
      await user?.related('permissions').sync(Array.isArray(permissions) ? permissions : [permissions])
    }

    return response.redirect().toRoute('manager.users.index')
  }

  public async edit ({ view, params, auth, bouncer }: HttpContextContract) {
    const user = await User.query()
      .where('id', params.id)
      .preload('roles', (query) => query.orderBy('power', 'desc'))
      .preload('permissions')
      .firstOrFail()

    await bouncer.with('UserPolicy').authorize('update', user)

    const hoistRole = await HelperPolicy.getMaxRole(auth.user!)
    const groups = await PermissionGroup.query().preload('permissions')
    const roles = await Role.query()
      .if(!auth.user?.isAdmin, (query) => {
        query.whereRaw(`power < ${hoistRole.power}`)
      })

    return view.render('manager/users/edit', { roles, groups, user })
  }

  public async update ({ request, response, params, session, bouncer }: HttpContextContract) {
    const user = await User.query()
      .where('id', params.id)
      .firstOrFail()

    await bouncer.with('UserPolicy').authorize('update', user)
    const data = await request.validate(UserUpdateValidator)

    if (user.email !== data.email) {
      const email = await User.findBy('email', data.email)
      if (email) {
        session.flash('errors', { email: 'L\'adresse email est déjà utilisée' })
        return response.redirect().back()
      }
    }

    const roles = request.input('roles')
    if (roles) {
      await user.related('roles').sync(Array.isArray(roles) ? roles : [roles])
    } else {
      await user?.related('roles').sync([4])
    }

    const permissions = request.input('permissions')
    if (permissions) {
      await user.related('permissions').sync(Array.isArray(permissions) ? permissions : [permissions])
    } else {
      await user?.related('permissions').sync([])
    }

    await user.merge({ ...data, isStaff: !!data.isStaff }).save()

    return response.redirect().toRoute('manager.users.index')
  }

  public async destroy ({ response, params, bouncer }: HttpContextContract) {
    const user = await User.query()
      .where('id', params.id)
      .firstOrFail()

    await bouncer.with('UserPolicy').authorize('delete', user)

    await user.delete()
    response.redirect().toRoute('manager.users.index')
  }
}
