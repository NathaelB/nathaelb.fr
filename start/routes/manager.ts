import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Manager/DefaultsController.home').as('manager.home')

  Route.group(() => {
    Route.get('/', 'Manager/UsersController.index').as('manager.users.index')
    Route.get('/create', 'Manager/UsersController.create').as('manager.users.create')
    Route.post('/', 'Manager/UsersController.store').as('manager.users.store')
    Route.get('/edit/:id', 'Manager/UsersController.edit').as('manager.users.edit')
    Route.put('/:id', 'Manager/UsersController.update').as('manager.users.update')
    Route.delete('/:id', 'Manager/UsersController.destroy').as('manager.users.destroy')
  }).prefix('users')

  Route.group(() => {
    Route.get('/', 'Manager/RolesController.index').as('manager.roles.index')
    Route.get('/create', 'Manager/RolesController.create').as('manager.roles.create')
    Route.post('/', 'Manager/RolesController.store').as('manager.roles.store')
    Route.get('/edit/:id', 'Manager/RolesController.edit').as('manager.roles.edit')
    Route.put('/:id', 'Manager/RolesController.update').as('manager.roles.update')
    Route.delete('/:id', 'Manager/RolesController.destroy').as('manager.roles.destroy')
  }).prefix('roles')

  Route.group(() => {
    Route.get('/', 'Manager/PermissionsController.index').as('manager.permissions.index')
    Route.get('/create', 'Manager/PermissionsController.index').as('manager.permissions.create')
    Route.get('/edit/:id', 'Manager/PermissionsController.index').as('manager.permissions.edit')
    Route.delete('/:id', 'Manager/PermissionsController.destroy').as('manager.permissions.destroy')
  }).prefix('permissions')
}).prefix('manager').middleware(['auth', 'manager', 'manager-sections'])
