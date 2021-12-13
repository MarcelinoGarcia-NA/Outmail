User = require("../models/User");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const authconfig= require("../config/auth.json");

module.exports = {
async authenticate(req, res){
    const{email, password }= req.body;
    const user= await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).json({error: 'Não encontramos este usuário na base de dados!'});

    if(!await bcrypt.compare(password, user.password))
        return  res.status(400).json({error: 'Senha inválida!'});
    

    const token= jwt.sign({id : user.id}, authconfig.secret,{
        expiresIn:86400,
    })
    
    res.send({user, token});
}, 
}