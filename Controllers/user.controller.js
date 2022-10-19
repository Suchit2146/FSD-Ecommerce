const { User } = require("../models")

exports.findAll=(req,res)=>{

    User.findAll()
    .then(users=>{
        res.send(users)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}