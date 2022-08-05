const mongoose = require('mongoose');


const db_link = 'mongodb+srv://assignment:df5HIUgMuRlF5c8c@cluster0.oiboafg.mongodb.net/?retryWrites=true&w=majority' 
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('user database connected');
})
.catch((error)=>{
    console.log('cannot connect to database')
})

const userprofileSchema = mongoose.Schema({
    uuid: { type: String, required: true },
});

const userprofilemodel = mongoose.model('userprofilemodel',userprofileSchema);

module.exports=userprofilemodel;