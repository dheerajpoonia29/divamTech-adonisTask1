'use strict'
var res_success = null, res_danger = null, res_warning = null;

const moment = require('moment')
const Leave = use('App/Models/Leave');
const User = use('App/Models/User');

class ManagerController {
    
    async readUser({view, session}) {
        console.log('read => ')

        let data = await User.query().select('*').fetch()
        data = data.toJSON();

        res_success=null; res_danger=null; res_warning=null;
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return view.render('manager.list', {users: data});
    }

    async readLeave({view, auth}){
        let leave_doc = await Leave.query().where('manager_id', auth.user.id).fetch()
        leave_doc = leave_doc.toJSON()
        
        leave_doc = leave_doc.map(doc => ({ 
            id: doc.id,
            username: doc.username,
            subject: doc.subject, 
            description: doc.description, 
            start_date: moment(doc.start_date).format('DD-MM-YYYY'),
            end_date: moment(doc.end_date).format('DD-MM-YYYY'), 
            manager: doc.manager_id, 
            status: doc.status}));

        return view.render('manager.leave', {leaves: leave_doc});
    }
    
    async update({request, response, session, params}){
        res_success=null; res_danger=null; res_warning=null;
        console.log('manager/leave/update => ', request.all(), params.id); 
        
        let {status} = request.all();

        try{
            await Leave.query().select('*').where('id', params.id).update({ status: status })
            res_success = 'Leave status updated successfully'
        }catch{
            res_danger = 'db error failed to apply leave'
        }        
        
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/manager/leave');
    }
}

module.exports = ManagerController
