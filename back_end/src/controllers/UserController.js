User = require("../models/User");
const jwt = require('jsonwebtoken');
const authconfig= require("../config/auth.json");
const bcrypt = require("bcryptjs");

function generateToken(params={}){
    return jwt.sign(params, authconfig.secret,{
        expiresIn:86400,
    });
}
module.exports = {
    
    async store(req, res) {
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).json({ error: "Usuário já encontrado na base de dados!" });
        }
       
        const user = await User.create(req.body);
        return res.json({user, token: generateToken({id: user.id})});
    },
    /**
    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(user);
    }, 
   
    async destroy(req, res){
        const user= await User.deleteOne({_id: req.params.id});
        return res.json({message:"Usuário removido do banco de dados!"});
    },
        async list(req, res){
        const user= await User.find();
        return res.json(user);
    },
    */
    async finduser(req,res){
        const user= await User.findOne({email:req.params.email});
        return res.json(user.name);
    },

    
}