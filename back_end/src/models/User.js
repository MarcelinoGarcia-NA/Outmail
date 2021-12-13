const {Schema, model}= require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema= new Schema(
    {
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        select:false
    },
    name:{
        type: String,
        required: true
    },
    },
    {
        timestamps:true
    }

);

UserSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;

    next();
});



    module.exports =model("User",UserSchema);