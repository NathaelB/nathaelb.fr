import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index ({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionPolicy').authorize('viewList')

    const page = request.input('page', 1)
    const limit = 20

    const permissions = await Permission.query().paginate(page, limit)

    return view.render('manager/permissions/index', { permissions: permissions.toJSON() })
  }

  public async create ({ response }: HttpContextContract) {
    response.redirect().back()
  }

  public async edit ({ response }: HttpContextContract) {
    response.redirect().back()
  }

  public async destroy ({ response }: HttpContextContract) {
    response.redirect().back()
  }
}
