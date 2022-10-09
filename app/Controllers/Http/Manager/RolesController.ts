import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import { RoleStoreValidator, RoleUpdateValidator } from 'App/Validators/Manager/RoleValidator'
import PermissionGroup from 'App/Models/PermissionGroup'

export default class RolesController {
  public async index ({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('viewList')

    const page = request.input('page', 1)
    const limit = 20

    const roles = await Role.query()
      .orderBy('power', 'desc')
      .paginate(page, limit)

    return view.render('manager/roles/index', { roles: roles.toJSON() })
  }

  public async create ({ view, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')

    const groups = await PermissionGroup.query()
      .preload('permissions')

    return view.render('manager/roles/create', { groups })
  }

  public async store ({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')

    const data = await request.validate(RoleStoreValidator)
    const role = await  Role.find((await Role.create(data)).id)

    const permissions = request.input('permissions')
    if (permissions) {
      await role?.related('permissions').sync(Array.isArray(permissions) ? permissions : [permissions])
    }

    return response.redirect().toRoute('manager.roles.index')
  }

  public async edit ({ view, params, bouncer }: HttpContextContract) {
    const role = await Role.query()
      .where('id', params.id)
      .preload('permissions')
      .firstOrFail()

    await bouncer.with('RolePolicy').authorize('update', role)

    const groups = await PermissionGroup.query()
      .preload('permissions')


    return view.render('manager/roles/edit', { groups, role })
  }

  public async update ({ request, response, params, bouncer }: HttpContextContract) {
    const role = await Role.query()
      .where('id', params.id)
      .firstOrFail()

    await bouncer.with('RolePolicy').authorize('update', role)
    const data = await request.validate(RoleUpdateValidator)

    await role.merge(data).save()

    const permissions = request.input('permissions')
    if (permissions) {
      await role.related('permissions').sync(Array.isArray(permissions) ? permissions : [permissions])
    }

    return response.redirect().toRoute('manager.roles.index')
  }

  public async destroy ({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('delete')

    const role = await Role.query()
      .where('id', params.id)
      .firstOrFail()

    await role.delete()
    response.redirect().toRoute('manager.roles.index')
  }
}
