import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import UpdateValidator from 'App/Validators/UserValidator'

export default class ProfileController {
  public async index ({ view }: HttpContextContract) {
    return view.render('pages/profile/index')
  }

  public async update ({ request, auth, response }: HttpContextContract) {
    const user = auth.user
    const data = await request.validate(UpdateValidator)

    if (data.avatar) {
      user!.avatar = Attachment.fromFile(data.avatar!)
    }

    await user?.merge({
      firstname: data.firstname,
      lastname: data.lastname,
      description: data.description
    }).save()
    await response.redirect().back()
  }
}
