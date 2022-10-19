const { Category } = require("../models");

// const db=require("../models");
// const Category=db.Category;


exports.create=(req,res)=>{

    if(req.isAdmin){
        return res.status(403).send({message:"OOPS! you are not authorized to perform yhis task"})
    }

    const {name,description}=req.body;
    const category={
        name:req.body.name,
        description:req.body.description
    }

    Category.create(category)
    .then(category=>{
        console.log(`Category with name ${category.name} created successfully`);
        res.send(category)
    })
    .catch(err=>{
        res.status(500).send({message:"something went wrong"})
    })
}

exports.getAll=(req,res)=>{
    Category.findAll()
    .then(category=>{
        res.send(category)
    })
    .catch(err=>{
        res.status(500).send({message:"something went wrong"})
    })
}

exports.getOne=(req,res)=>{
    const categoryId=req.params.id;

    Category.findByPk(categoryId)
    .then(category=>{
        if(!category){
            res.status(400).send({message:`category with id: ${categoryId} does not exits`})
        }
        res.send(category)
    })
    .catch(err=>{
        res.status(500).send({message:"something went wrong"})
    })
}

exports.update=(req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are not authorized to perform yhis task"})
    }

    const categoryId=req.params.id;
    const {name,description}=req.body;

    const category={};

    if(name){
        category.name=name;
    }
    if(description){
        category.description=description;
    }

    Category.update(category,{
        where:{
            id:categoryId
        }
    })
    .then(updatedCategory=>{
        res.send({message:"success"})
    })
    .catch(err=>{
        res.status(500).send({message:"something went wrong"})
    })
}

exports.delete=(req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are not authorized to perform yhis task"})
    }

    const categoryId=req.params.id;

    Category.destroy({
        where:{
            id:categoryId
        }
    })
    .then((data)=>{
        res.send({message:"successfully deleted the category"})
    })
    .catch(err=>{
        res.status(500).send({message:"something went wrong"})
    })
}