import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Modularity from '../Services/Modularity'
import { GroupLink, Link } from '../Services/Modularity/Links'

export default class Section {
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const modularity: Modularity = Application.container.resolveBinding('Adonis/modules/Modularity')

    const links = modularity.getLinks(context)

    context.view.share({
      'alone': [
        new Link('Accueil', 'Accueil du manager', 'manager.home', context.request.url() == '/manager', undefined, 'home'),
        ...links.alone
      ],
      'links': [
        new GroupLink('Gestion des utilisateurs')
          .addLink('Roles', 'description', 'manager.roles.index', context.request.url().startsWith('/manager/roles'), 'RolePolicy', 'tag')
          .addLink('Permissions', 'description', 'manager.permissions.index', context.request.url().startsWith('/manager/permissions'), 'PermissionPolicy', 'key')
          .addLink('Utilisateurs', 'description', 'manager.users.index', context.request.url().startsWith('/manager/users'), 'UserPolicy', 'user'),
        ...links.sections,
      ]
    })

    // view.share({
    //   'section_without': [
    //     { label: 'Accueil', icon: 'home', href: 'manager.home', active: request.url() == '/manager' },
    //     { label: 'Réalisations', icon: 'folder', href: 'manager.achievements.index', policy: 'AchievementPolicy', active: request.url().startsWith('/manager/achievements') },
    //     { label: 'Messagerie', icon: 'mail', href: 'manager.mails.index', policy: 'AchievementPolicy', active: request.url().startsWith('/manager/mails') },
    //   ]
    // })
    //
    // view.share({
    //   'section_users': [
    //     { label: 'Roles', icon: 'tag', href: 'manager.roles.index', policy: 'RolePolicy', active: request.url().startsWith('/manager/roles') },
    //     { label: 'Permissions', icon: 'key', href: 'manager.permissions.index', policy: 'PermissionPolicy', active: request.url().startsWith('/manager/permissions') },
    //     { label: 'Utilisateurs', icon: 'user', href: 'manager.users.index', policy: 'UserPolicy', active: request.url().startsWith('/manager/users') },
    //   ]
    // })
    //
    // view.share({
    //   'section_blog': [
    //     { label: 'Catégories', icon: 'book_open', href: 'manager.categories.index', policy: 'CategoryPolicy', active: request.url().startsWith('/manager/categories') },
    //     { label: 'Tags', icon: 'tag', href: 'manager.tags.index', policy: 'TagPolicy', active: request.url().startsWith('/manager/tags') },
    //     { label: 'Articles', icon: 'document_text', href: 'manager.articles.index', policy: 'ArticlePolicy', active: request.url().startsWith('/manager/articles') },
    //   ]
    // })

    await next()
  }
}
