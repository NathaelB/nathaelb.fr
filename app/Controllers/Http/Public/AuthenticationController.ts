import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/AuthValidator'

export default class AuthenticationController {
  public async loginWeb ({ view }: HttpContextContract) {
    return view.render('pages/auth/login')
  }

  public async login ({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(LoginValidator)
    try {
      await auth.use('web').attempt(data.email, data.password)
      response.redirect('/')
    } catch {
      session.flash('errors', {
        message: 'Mauvais identifiants'
      })
      response.redirect().back()
    }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect().back()
  }
}
