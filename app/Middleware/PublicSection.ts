import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Section {
  public async handle({ view, request }: HttpContextContract, next: () => Promise<void>) {
    view.share({
      'left_sections': [
        { label: 'Accueil', href: 'home', active: request.url() == '/' },
      ]
    })

    view.share({
      'right_sections': [
      ]
    })

    await next()
  }
}
