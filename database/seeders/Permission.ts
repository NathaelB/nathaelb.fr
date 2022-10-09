import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import PermissionGroup from 'App/Models/PermissionGroup'

export default class extends BaseSeeder {
  public async run () {
    const [user, role, permission] = await PermissionGroup.createMany([
      { label: 'Gestion des utilisateurs' },
      { label: 'Gestion des roles' },
      { label: 'Gestion des permissions' },
    ])

    await Permission.createMany([
      { label: 'Création d\'utilisateurs', identifier: 'create:user', permissionGroupId: user.id },
      { label: 'Edition d\'utilisateurs', identifier: 'edit:user', permissionGroupId: user.id },
      { label: 'Suppression d\'utilisateurs', identifier: 'delete:user', permissionGroupId: user.id },

      { label: 'Création de roles', identifier: 'create:role', permissionGroupId: role.id },
      { label: 'Edition de roles', identifier: 'edit:role', permissionGroupId: role.id },
      { label: 'Suppression de roles', identifier: 'delete:role', permissionGroupId: role.id },

      { label: 'Création de permissions', identifier: 'create:permission', permissionGroupId: permission.id },
      { label: 'Edition de permissions', identifier: 'edit:permission', permissionGroupId: permission.id },
      { label: 'Suppression de permissions', identifier: 'delete:permission', permissionGroupId: permission.id },
    ])
  }
}
