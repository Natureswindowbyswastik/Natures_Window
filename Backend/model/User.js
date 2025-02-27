const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: { type: String, 
        enum: ['admin'], 
        default: 'admin'
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
})
const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;