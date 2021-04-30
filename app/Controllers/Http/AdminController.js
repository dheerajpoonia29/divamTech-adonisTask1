'use strict'
var res_success = null, res_danger = null, res_warning = null;

const Database = use('Database')
const User = use('App/Models/User');

class UserController {
    async create({response, request, session}) {
        // let userId = await Database
        //                         .table('users')
        //                         .insert(request.only(['username', 'email', 'role', 'password']))
        res_success=null; res_danger=null; res_warning=null;

        try{
            await User.create(request.only(['username', 'email', 'role', 'password']))
            res_success = "User added successfully"
        }
        catch{
            res_warning = "User exist with given username and email"
            return response.redirect('back')
        }
        
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/home')
    }

    async read({view, session}) {
        console.log('read => ')

        let data = await Database.table('users').select('*')

        res_success=null; res_danger=null; res_warning=null;
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return view.render('admin.list', {users: data});
    }
    
    async update({ request, response, session, params}) {
        console.log('update => ', request.all())
        let {username, email, role} = request.all()

        // ------------FIND------------                            
        let user = await User.find(params.id)
    // or
        // let user = await Database.select('*').from('users').where({id: params.id}) 
// Note: {but both not work with parameter = request.id}
                
        // ------------UPDATE-------------
        user.username = username;
        user.email = email;
        user.role = role;
        await user.save();
    //or
        // await Database 
        //             .table('users')
        //             .where('username', 'email', 'role')
        //             .update(username, email, role)
// TypeError: The operator "email" is not permitted   

        res_success=null; res_danger=null; res_warning='User updated successfully';
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/admin/user/list');
    }

    async delete({response, session, params}) {
        let user = await User.find(params.id)
        await user.delete();

        res_success=null; res_danger='User removed successfully'; res_warning=null;
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/admin/user/list');
    }

    async login({response, request, view, session, auth}) {
        console.log('controller called = ', request.all())
        try {
            const { email, password } = request.all();
            await auth.attempt(email, password);

            res_success='Login successfully'; res_danger=null; res_warning=null;
            
            let user = await User.find(auth.user.id);
            user = user.toJSON();
            session.put('user_role', user.role);            

            session.flash({ success: res_success, danger: res_danger, warning: res_warning});
            if(user.role==='admin')
                return response.redirect('/admin-page')
            else if(user.role==='manager')
                return response.redirect('/manager-page')
            else    
                return response.redirect('/employee-page')

        } catch (error) {
            res_success=null; res_danger='Given credentials does not match'; res_warning=null;
            session.flash({ success: res_success, danger: res_danger, warning: res_warning});
            return response.redirect('back')
        }
    }

    async logout({response, auth, session}){
        await auth.logout()
        session.clear()

        res_success=null; res_danger=null; res_warning='Logout successfully';
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/')
    }

    // TODO: used modal in list->edit button so that we don'nt need this extra route and user.edti edge page
    async edit({ params, view}) {
        const data = await User.find(params.id);
        return view.render('admin.edit', {user: data});
    }

    async homeRedirect({response, session}){
        let role = session.get('user_role')
        if(role==='admin')
            return response.redirect('/admin-page')
        else if(role==='manager')
            return response.redirect('/manager-page')
        else  if(role==='employee')  
            return response.redirect('/employee-page')
        else    
            return response.redirect('/')
    }
}

module.exports = UserController
