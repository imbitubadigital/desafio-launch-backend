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
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('user', 'UserController.store')

Route.resource('category', 'CategoryController')
  .apiOnly()
  .validator(
    new Map([
      [['category.store'], ['Category']],
      [['category.update'], ['Category']]
    ])
  )
Route.resource('section', 'SectionController')
  .apiOnly()
  .validator(
    new Map([
      [['section.store'], ['Section']],
      [['section.update'], ['Section']]
    ])
  )
Route.resource('product', 'ProductController').apiOnly()
Route.resource('file', 'FileController').apiOnly()
Route.get('cat-form', 'CategoryFormController.index')
Route.get('section-form', 'SectionFormController.index')
