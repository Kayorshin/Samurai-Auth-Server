'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => ({ status: 'online' }))

Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.get('services', 'ServiceController.index')
  Route.get('services/:id', 'ServiceController.show')
  Route.post('services', 'ServiceController.store').validator('Service')
}).middleware(['auth'])
