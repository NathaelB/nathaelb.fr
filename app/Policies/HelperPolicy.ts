import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Modularity from 'App/Services/Modularity'
import Application from '@ioc:Adonis/Core/Application'

export default class HelperPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.isAdmin) {
      return true
    }

    if (!user?.isStaff) {
      return false
    }
  }

  public async section (currentUser: User, method: string, policies: any[]) {
    for (const policy of policies.filter(policy => policy)) {
      const modularity: Modularity = Application.container.resolveBinding('Adonis/modules/Modularity')
      const module = modularity.getModuleFromPolicy(policy)

      const { default: Policy } = module
        ? await import(`modules/${module.name}/Database/Policies/${policy}`)
        : await import(`App/Policies/${policy}`)

      const bouncer = new Policy()

      const isAllow = await bouncer[method](currentUser)
      if (isAllow) {
        return true
      }
    }
  }

  public static async getPermissions (user: User) {
    await user.load('permissions')
    await user.load('roles', (query) => query.preload('permissions'))

    const permissions: string[] = user.permissions.map((permission) => permission.identifier)

    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (!permissions.includes(permission.identifier)) {
          permissions.push(permission.identifier)
        }
      })
    })

    return permissions
  }

  public static async getMaxRole (user: User) {
    await user.load('roles')

    const max: number = Math.max(...user.roles.map((role) => role.power))

    return user.roles.find((role) => role.power === max)!
  }
}
