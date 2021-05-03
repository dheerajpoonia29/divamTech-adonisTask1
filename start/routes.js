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

// HOME PAGE ROUTE
// Route.on('/').render('index')
Route.get('/', 'AdminController.index')
Route.on('/admin-page').render('admin').middleware(['auth']);
Route.on('/manager-page').render('manager').middleware(['auth']);
Route.on('/employee-page').render('employee').middleware(['auth']);
Route.get('/home', 'AdminController.homeRedirect').as('goto-home')


// AUTH ROUTE
Route.group(()=>{
    Route.on('/login').render('auth.login').as('login-page')
    Route.post('/login', 'AdminController.login').as('login')
    Route.get('/logout', 'AdminController.logout').as('logout')
}).prefix('/auth/user')

// ADMIN ROUTES
Route.group(() => {
    Route.get('/list', 'AdminController.read').as('user-manage-page')
        Route.on('/add').render('admin.add').as('user-add-page')
        Route.post('/add', 'AdminController.create').as('user-add')                          
        Route.get('/edit/:id', 'AdminController.edit').as('user-edit-page')      
        Route.post('/edit/:id', 'AdminController.update').as('user-edit')                      
        Route.get('/delete/confirm/:id', ({view, params}) => {return view.render('admin.delete', {userid: params.id})}).as('user-delete-page')   
        Route.get('/delete/:id', 'AdminController.delete').as('user-delete')
}).prefix('/admin/user').middleware(['auth','isAdmin']);

// MANAGER ROUTES
Route.group(()=>{
    Route.get('/list', 'ManagerController.readUser').as('user-check-page')
    Route.get('/leave', 'ManagerController.readLeave').as('grant-leave-page')
    Route.post('/leave/:id', 'ManagerController.update').as('leave-update')
}).prefix('/manager').middleware(['auth', 'isManager']);

// EMPLOYEE ROUTES
Route.group(()=>{
    Route.on('/task').render('employee.task').as('task-page')
    Route.get('/leave', 'EmployeeController.read').as('leave-page')
    Route.post('/leave', 'EmployeeController.create').as('leave-add')
}).prefix('/employee').middleware(['auth', 'isEmployee']);

