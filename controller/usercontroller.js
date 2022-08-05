const usermodel = require('../models/usermodel');
const userprofilemodel = require('../models/userprofile');

// get all user
module.exports.getAllusers = async function getAllusers(req, res) {
    try {
        let allusers = await usermodel.find();
        if (allusers) {
            res.json({
                message: "list of all users",
                data: allusers,
            });
        } else {
            res.json({
                message: 'user not found',
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message,
        });
    }
}


// to update 
module.exports.updateUser = async function updateUser(req, res) {
    // console.log('req body ->' , req.body);
    try {
        let id = req.params.id;
        let user = await usermodel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "data updated succesfully",
                data: user
            });
        } else {
            res.json({
                message: 'user not found'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message,
        });
    }

}

//get a user
module.exports.getUser = async function getUser(req, res) {
    let id = req.params.id;
    let user = await usermodel.findById(id);
    console.log(user);
    if (user) {
        return res.json(user);
    } else {
        return res.json({
            message: 'user not found'
        });
    }
}