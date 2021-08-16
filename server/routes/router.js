const express = require('express');
const services = require('../services/render');
const controller = require('../controller/controller');
const route = express.Router();

/** 
* @description Root Router
* @method GET /
*/
route.get('/', services.homeRoutes);

/** 
* @description Add Users
* @method GET /add-user
*/
route.get('/add-user', services.add_user);

/** 
* @description for Update Users
* @method GET /update-user
*/
route.get('/update-user', services.update_user);


route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

module.exports = route;