import express from 'express';
import Users from '../Functions/Users.js';
import Authorization from '../Middlewares/Authorization/Authorization.js';

let { CreateUser, ExisingUser, Logout } = Users;

let Router = express.Router(); 

Router.route("/signup").post(CreateUser);
Router.route("/login").post(ExisingUser);
Router.route('/logout').post(Logout);            

export default Router;
