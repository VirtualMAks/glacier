const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordCom = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        // validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:[8,"Password should be greater than 8 Characters"],
        select:false
    },
    gender:{
        type:String,
        required:[true,"Please enter your gender"],
        unique:false,
    },
    companyName:{
        type:String,
        required:[true,"Please enter your Company Name"],
        unique:true,
    },
    salary:{
        type:String,
        required:[true,"Please enter your Salary"],
        unique:true,
    },
    age:{
        type:String,
        required:[true,"Please enter your Age"],
        unique:true,
    },
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this.id},process.env.PRIVATEKEY,{expiresIn:"7d"});
    return token;
}

const User = mongoose.model("user",userSchema);

const validate = (data) =>{
    const schema = joi.object({
        name:joi.string().required().label("Name"),
        email:joi.string().required().label("email"),
        password:passwordCom().required().label("password")

    });
    return schema.validate(data)
}

module.exports = {User,validate}