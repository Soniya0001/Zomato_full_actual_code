const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Userschema = new Schema({
    
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    });

    // module.exports = mongoose.model('userdetails', Userschema ,'user');

    const EmployeeModel = mongoose.model('user', Userschema );
    //user is the name of database
    module.exports = EmployeeModel

