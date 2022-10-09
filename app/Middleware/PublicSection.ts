import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Section {
  public async handle({ view, request }: HttpContextContract, next: () => Promise<void>) {
    view.share({
      'left_sections': [
        { label: 'Accueil', href: 'home', active: request.url() == '/' },
        { label: 'Nos articles', href: 'public.blog.index', active: request.url().startsWith('/blog') },
        { label: 'Réalisations', href: 'public.achievements.index', active: request.url().startsWith('/realisations') },
        { label: 'À propos', href: 'public.about.index', active: request.url().startsWith('/about')},
        { label: 'Contact', href: 'public.contact.index', active: request.url().startsWith('/contact')}
      ]
    })

    view.share({
      'right_sections': [
      ]
    })

    await next()
  }
}
