const {Schema, model}= require("mongoose");

const MessageSchema= new Schema(
    {
    email_sender:{
        type: String,
        required: true,
        lowercase:true
    },
    email_recipient:{
        type: String,
        required: true,
        lowercase:true
    },
    title:{
        type: String,
        required: true,
       
    },
    name_sender:{
        type: String,
        required: true,
       
    },
    message:{
        type: String,
        required: true,
      
    },
    },

    {
        timestamps:true
    }

);

    module.exports =model("Message",MessageSchema);