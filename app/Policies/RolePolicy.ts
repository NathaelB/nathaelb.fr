import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import HelperPolicy from 'App/Policies/HelperPolicy'
import Role from 'App/Models/Role'

export default class RolePolicy extends BasePolicy {
  public async before(user: User | null) {
    await HelperPolicy.getPermissions(user!)
    if (user && user.isAdmin) {
      return true
    }

    if (!user?.isStaff) {
      return false
    }
  }

  public async viewList (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

    return permissions.includes('create:role')
      || permissions.includes('edit:role')
      || permissions.includes('delete:role')
  }

  public async view (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('edit:role')
  }

  public async create (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('create:role')
  }

  public async update (currentUser: User, role: Role) {
    const hoistRole = await HelperPolicy.getMaxRole(currentUser)
    if (role.power > hoistRole.power) {
      return false
    }

    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('edit:role')
  }

  public async delete (currentUser: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('delete:role')
  }

  public async actions (currentUser: User, role?: Role) {
    const hoistRole = await HelperPolicy.getMaxRole(currentUser)
    if (role && role.power >= hoistRole.power) {
      return false
    }

    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)

    return permissions.includes('edit:role')
      || permissions.includes('delete:role')
  }
}
