'use strict'
var res_success = null, res_danger = null, res_warning = null;

const leave = use('app/Models/Leave');

class EmployeeController {
    async create({request, response, session}){
        console.log('leave => ', request.all())

        // await leave.create(request.only(['emp_id', 'emp_username','subject', 'description', 'start_date', 'end_date', 'manager_id']))

        res_success = 'Sccuessfully Applied Leave'
        session.flash({ success: res_success, danger: res_danger, warning: res_warning});
        return response.redirect('/')
    }

    async read({view}){
        console.log('employeeController/read')
        let user_doc = [
            {'id': '1', 'username': 'ram', 'role':'manager'},
            {'id': '2', 'username': 'shyam', 'role':'manager'},
            {'id': '3', 'username': 'dheeraj', 'role':'admin'},
            {'id': '4', 'username': 'neha', 'role':'manager'},
            {'id': '5', 'username': 'dheeraj', 'role':'employee'}
        ]
        user_doc = user_doc.filter((ele)=>ele.role==='manager')

        let leave_doc = [
            {'subject': 'Sick leave', 'description': "Sorry, but I can’t make it to work today. I've got a stomach, so I’m going to take the day off. I’ll be available to emails", 'start_date': '2017-06-15', 'end_date': '2017-06-15', 'manager': 'ram', 'status': 'pending'},
            {'subject': 'vacation leave', 'description': "I am writing to make a formal request for vacation leave from 10th November to 30th November. My children have three weeks off from school for the Diwali holidays in this period, and we have planned a family outing to Kulu-Manali.", 'start_date': '2017-06-15', 'end_date': '2017-06-15', 'manager': 'ram', 'status': 'approved'}
        ]
        return view.render('employee.leave', {managers: user_doc, leaves: leave_doc});
    }
}

module.exports = EmployeeController
