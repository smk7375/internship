const mongoose = require('mongoose');

const emailValidaor = require('email-validator');


const db_link = 'mongodb+srv://assignment:df5HIUgMuRlF5c8c@cluster0.oiboafg.mongodb.net/?retryWrites=true&w=majority' 
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('user database connected');
})
.catch((error)=>{
    console.log('cannot connect to database')
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:function(){
            return emailValidaor.validate(this.email);
        }
    },
    password:{
        type:String,
        require:true,
        minLength:8
    },
    confirmpassword:{
        type:String,
        require:true,
        validate:function(){
            return this.confirmpassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['user','admin','delieveryboy','restrauntowner'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/user/default.jpeg'
    },
});

userSchema.pre('save',function(){
    // confirmpassword field is not visible after using the below command
    this.confirmpassword=undefined;
});
 

const usermodel = mongoose.model('usermodel',userSchema);

module.exports=usermodel;

//df5HIUgMuRlF5c8c