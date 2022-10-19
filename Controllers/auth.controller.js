const {User, Role, Sequelize, ROLES} = require("../models");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup= async (req,res)=>{

    var {userName,email,password,roles} =  req.body;

    if(!roles || !roles.length){
        roles=[ROLES[0]]
    }

    try{
    const user= await User.create({userName,email,password:bcrypt.hashSync(password,8)});
    const userRoles= await Role.findAll({where:{name:{[Sequelize.Op.or] : roles}}});
    console.log(userRoles)
    await user.setRoles(userRoles);
    res.send({message:"user registered successfully"})
    }catch(e){
        res.status(500).send({message:e.message || "something went wrong"})
    }
}

// exports.signup=(req,res)=>{

//     var {userName,email,password,roles} =  req.body;

//     if(!roles || !roles.length){
//         roles=[ROLES[0]]
//     }

//     User.create({
//         userName:userName,
//         email:email,
//         password:bcrypt.hashSync(password,8)
//     })
//     .then(user=>{
//         Role.findAll({
//             where:{
//                 name:{
//                     [Sequelize.Op.or] : roles
//                 }
//             }
//         })
//         .then((roles)=>{
//             user.setRoles(roles)
//             .then(()=>{
//                 res.send({message:"user registered successfully"})
//             })
//         })
//     })
//     .catch(err=>{
//         res.status(500).send({message:"something went wrong"})
//     })

// }

exports.signIn= async (req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        res.status(400).send({message:"Username or Password cannot be empty"})
    }
    try{
        var user =await User.findOne({where:{userName:username}});
    } catch(e){
        return res.status(401).send({message:e.message});
    }

    if(!user){
        res.status(400).send({message:"user not found"});
    }

    var isPasswordValid=bcrypt.compareSync(password,user.password);
    if(!isPasswordValid){
        res.status(401).send({message:"invalid password"});
    }

        console.log(user.id)

        const token=jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn:86400});
        // console.log(token)

        var roles=[];
        const allRoles=await user.getRoles();
        // console.log(allRoles);

        allRoles.forEach(role => {
            roles.push(role.name)
        });

    res.send({
        id:user.id,
        userName:user.userName,
        email:user.email,
        roles:roles,
        accessToken:token
    });
    
};

// exports.signIn=(req,res)=>{
//     const {username,password}=req.body;

//     if(!username || !password){
//         res.status(400).send({message:"Username or Password cannot be empty"})
//     }

//     User.findOne({
//         where:{
//             userName:username
//         }
//     })
//     .then(user=>{
//         if(!user){
//             res.status(400).send({message:"user not found"})
//         }
//         //check the password

//         var isPasswordValid=bcrypt.compareSync(password,user.password);
//         if(!isPasswordValid){
//             res.status(401).send({message:"invalid password"})
//         }

//         res.send({
//             id:user.id,
//             userName:user.userName,
//             email:user.email,
//             roles:user.roles
//         })
//     })
//     .catch(err=>{
//         res.status(500).send({message:"something went wrong"})
//     })
// }