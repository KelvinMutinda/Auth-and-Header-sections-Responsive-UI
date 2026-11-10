const mongoose=require('mongoose')

const registerSchema=new mongoose.Schema({
    firstname:{required:true, type:String,trim:true},
    lastname:{required:true,type:String,trim:true},
    email:{required:true,type:String,trim:true,unique:true},
    phonenumber:{required:true,type:String,trim:true,unique:true},
    occupation:{required:true,type:String, trim:true},
    password:{required:true,type:String,trim:true},

},

{
timestamps:true
}
)
module.exports=mongoose.model('register',registerSchema)