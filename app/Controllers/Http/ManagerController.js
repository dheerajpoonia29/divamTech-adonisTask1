'use strict'

class ManagerController {
    async read({view}){
        let leave_doc = [
            {'username': 'dheeraj','subject': 'Sick leave', 'description': "Sorry, but I can’t make it to work today. I've got a stomach, so I’m going to take the day off. I’ll be available to emails", 'start_date': '2017-06-15', 'end_date': '2017-06-15', 'manager': 'ram', 'status': 'pending'},
            {'username': 'dheeraj', 'subject': 'vacation leave', 'description': "I am writing to make a formal request for vacation leave from 10th November to 30th November. My children have three weeks off from school for the Diwali holidays in this period, and we have planned a family outing to Kulu-Manali.", 'start_date': '2017-06-15', 'end_date': '2017-06-15', 'manager': 'ram', 'status': 'approved'}
        ]
        return view.render('manager.leave', {leaves: leave_doc});
    }
    
    async update({request, response, view}){
        console.log('manager/leave/update => ', request.all());
        return response.redirect('/manager/leave');
    }
}

module.exports = ManagerController
