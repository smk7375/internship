const express = require('express');

const usermodel = require('../models/usermodel');

const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../secret');

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await usermodel.create(dataObj);
        if (user) {
            res.json({
                message: "user signed up succesfully",
                data: user
            });
        } else {
            res.json({
                message: 'error while signing up',
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message,
        });
    }
}

// login
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await usermodel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id']; // uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('Loggedin', token, { httpOnly: true });
                    return res.json({
                        message: 'user login succesfully',
                        userDetails: user
                    })
                } else {
                    return res.json({
                        message: 'wrong credentials'
                    })
                }
            }
            else {
                return res.json({
                    message: "user not fouond"
                })
            }
        }
        else {
            return res.json({
                message: 'please enter the email field'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: 'operation not allowed',
            });
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.Loggedin) {
            token = req.cookies.Loggedin;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                console.log('payload token', payload);
                const user = await usermodel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role);
                next();
            } else {
                //browser
                const client = req.get(User-Agent);
                if(client.includes("Mozilla") == true){
                    return res.redirect('/login');
                }
                return res.json({
                    message: 'user not verified'
                })
            }
        } else {
            return res.json({
                message: 'please log in'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message,
        });
    }
}



