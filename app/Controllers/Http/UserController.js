'use strict'
var res_success = null;
var res_danger = null;
var res_warning = null;

class UserController {
    async create({response, session}) {

        res_success="User added successfully"; res_danger=null; res_warning=null;
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/')
    }

    async read({view, session}) {
        let data = [{id:'1', username:'pankaj', email:'gmaill@gmaill.com', isAdmin:false}, 
                    {id:'2', username:'dheeraj', email:'gmaill@gmail.com', isAdmin:true},  
                    {id:'3', username:'neeraj', email:'gmaill@gmail.com', isAdmin:false},  
                    {id:'4', username:'harsh', email:'gmaill@gmail.com', isAdmin:false},  
                    {id:'5', username:'gautam', email:'gmaill@gmail.com', isAdmin:false}]

        res_success=null; res_danger=null; res_warning=null;
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return view.render('user.list', {users: data});
    }
    
    async update({ request, response, session}) {
        const {userid, username, email} = request.all();
        console.log('udpated user = ', request.all())

        res_success=null; res_danger=null; res_warning='User updated successfully';
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/user/list');
    }

    async delete({ request, response, session}) {
        const {id} = request.all();
        console.log('removed user = ', request.all())

        res_success=null; res_danger='User removed successfully'; res_warning=null;
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/user/list');
    }
}

module.exports = UserController
