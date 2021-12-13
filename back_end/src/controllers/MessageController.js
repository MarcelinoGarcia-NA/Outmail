Message= require("../models/Message.js");

module.exports = {
    
    async store(req, res) {
        if( req.body.email_sender ===req.body.email_recipient){
            return res.status(400).json({ error: "O e-mail remetente não pode ser destinatário" });
        }else
        if (!await User.findOne({ email: req.body.email_sender })) {
            return res.status(400).json({ error: "O e-mail remetente não se encontrado na base de dados!" });
        }else
         if (!await User.findOne({ email: req.body.email_recipient })) {
            return res.status(400).json({ error: "O e-mail destinatário não se encontrado na base de dados!" });
        }
        const message = await Message.create(req.body);
        return res.json(message);
    },
    /** 
    async update(req, res) {
        const message= await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(message);
    }, 
    async list(req, res){
        const message= await Message.find();
        return res.json(message);
    },
    async destroy(req, res){
        const message= await Message.deleteOne({_id: req.params.id});
        return res.json({message:"Usuário removido do banco de dados!"});
    },**/
    async findEmailRecipient(req,res){
        const message= await Message.find({email_recipient: req.params.email_recipient});
        return res.json(message);
    },
    async findEmailSender(req,res){
        const message= await Message.find({email_sender: req.params.email_sender});
        return res.json(message);
    },
}