import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DefaultsController {
  public async home ({ view }: HttpContextContract) {
    const stats = [
      { label: 'Utilisateurs', href: 'manager.users.index', policy: 'UserPolicy', description: 'Les comptes utilisateurs sont utilisés pour se connecter au manager, vous pouvez gérer vos utilisateurs depuis cette section.' },
      { label: 'Roles', href: 'manager.roles.index', policy: 'RolePolicy', description: 'Assignez des rôles à vos utilisateurs afin de leurs donner des permissions.' },
      { label: 'Messagerie', href: 'manager.mails.index', policy: 'MailPolicy', description: 'Recevez les demandes de prestations ou de conseils.' },
      { label: 'Tags', href: 'manager.tags.index', policy: 'TagPolicy', description: 'Informez vos lecteurs des thèmes abordés dans vos articles.' },
      { label: 'Categories', href: 'manager.categories.index', policy: 'CategoryPolicy', description: 'Définissez le regroupements de vos articles' },
      { label: 'Articles', href: 'manager.articles.index', policy: 'ArticlePolicy', description: 'Informer vos utilisateurs de vos dernières mises à jour ou informations.' },
      { label: 'Réalisations', href: 'manager.achievements.index', policy: 'AchievementPolicy', description: 'Montrez vos compétences au reste du monde.' },
    ]
    return view.render('manager/home', { stats })
  }
}
