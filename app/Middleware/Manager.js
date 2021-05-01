'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

class Manager {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    // call next to advance the request
    let user = await User.find(auth.user.id) 
    let role = user.toJSON().role 

    if(role!=='manager'){
      return response.send('Your are not manager, :) access route directly');
    }
    await next()
  }
}

module.exports = Manager
