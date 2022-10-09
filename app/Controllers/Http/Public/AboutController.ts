import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AboutController {
  public async index ({ view }: HttpContextContract) {
    return view.render('pages/about/index')
  }
}
