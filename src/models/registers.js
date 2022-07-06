const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email : {
        type: String,
        required:true,
        unique: true
    },
    password : {
        type: String,
        required:true
    },
    confirmPassword : {
        type: String,
        required:true
    }
});

//Now we need to create a collections
const Register = new mongoose.model('Register', userSchema);
module.exports = Register;