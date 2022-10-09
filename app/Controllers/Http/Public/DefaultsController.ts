import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DefaultsController {
  public async home ({ view }: HttpContextContract) {


    return view.render('index')
  }
}
