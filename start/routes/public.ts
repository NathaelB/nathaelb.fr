import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Public/DefaultsController.home').as('home').middleware(['public-sections'])


Route.group(() => {
  Route.group(() => {
    Route.get('/', 'Public/AuthenticationController.loginWeb').as('login')
    Route.post('/', 'Public/AuthenticationController.login')
  }).prefix('login')
  Route.post('/logout', 'Public/AuthenticationController.logout').as('logout')
}).prefix('authentication').middleware(['public-sections'])

Route.group(() => {
  Route.get('/', 'Public/ProfileController.index').as('profile')
  Route.post('/', 'Public/ProfileController.update')
}).prefix('profile').middleware(['public-sections', 'auth'])

Route.get('/about', 'Public/AboutController.index').as('public.about.index').middleware(['public-sections'])
