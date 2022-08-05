const express = require('express');

const userRouter = express.Router();

const{getUser , getAllusers , updateUser} = require('../controller/usercontroller');

const {login , signup , protectRoute} = require('../controller/authcontroller');

// sign up
userRouter.route('/signup')
.post(signup)

// login
userRouter.route('/login')
.post(login)


// api for edit profile only when user Logged in 
userRouter.use(protectRoute);
userRouter.route('/:id')
.patch(updateUser)

// get a user profile when user logged in
userRouter.use(protectRoute);
userRouter.route('/userProfile')
.get(getUser)


// public api to get all users
userRouter.route('/')
.get(getAllusers)

module.exports=userRouter;