'use strict'

// const UserController = require("./AdminController");
var moment = require('moment');

var res_success = null, res_danger = null, res_warning = null;

const leave = use('App/Models/Leave');
const user = use('App/Models/User');

class EmployeeController {
    async read({view, auth}){
        console.log('employeeController/read')

        let user_doc = await user.all()
        let leave_doc = await leave.query().where('employee_id', auth.user.id).fetch()
        
        user_doc = user_doc.toJSON()
        leave_doc = leave_doc.toJSON()

        user_doc = user_doc.filter((ele)=>ele.role==='manager')        
        leave_doc = leave_doc.map(doc => ({ 
            subject: doc.subject, 
            description: doc.description, 
            start_date: moment(doc.start_date).format('DD-MM-YYYY'),
            end_date: moment(doc.end_date).format('DD-MM-YYYY'), 
            manager: doc.manager_id, 
            status: doc.status}));
            
        console.log('leave_doc = ', leave_doc)
        console.log('user_doc = ', user_doc)

        return view.render('employee.leave', {managers: user_doc, leaves: leave_doc});
    }

    async create({request, response, session}){
        res_success=null; res_danger=null; res_warning=null;
        console.log('leave => ', request.all())

        try{
            await leave.create(request.only(['employee_id', 'username','subject', 'description', 'start_date', 'end_date', 'manager_id']))            
            res_success = "Leave submit successfully"
        }
        catch(err){
            console.log('** db error => ', err)
            res_danger = "db error occured"
        }

        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('back')
    }
}

module.exports = EmployeeController
