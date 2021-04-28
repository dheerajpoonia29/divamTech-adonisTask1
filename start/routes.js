'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('test') // This is not working 
Route.on('/').render('index')
Route.on('/about').render('about')
Route.on('/user/add').render('user.add')

// CRUD
Route.post('/user/add-form-submit', 'UserController.create')                            // [CREATE]
Route.get('/user/list', 'UserController.read')                                          // [READ]

// Edit then update
Route.get('/user/list-button-update/:id/:username/:email', ({ view, params }) => {       // {edit}
    // either do this: but email @ change to ascii
    let data = {userid: params.id, username: params.username, email: params.email}
    // else fetch row from db based on params.id
    return view.render('user.edit', data)
})      
Route.post('/user/list-button-update', 'UserController.update')                         // [UPDATE]

// Confirm then delete
Route.get('/user/list-button-delete/:id', ({view, params}) => {                          // {confirm}
    return view.render('user.delete', {userid: params.id})
})
Route.get('/user/list-button-delete', 'UserController.delete')                      // [DELETE]

