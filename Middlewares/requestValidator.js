const { Category, Product } = require("../models");

const validateCategoryRequest=(req,res,next)=>{

    if(!req.body.name){
        res.status(400).send({message:"Name of the category cannot be empty"});
        return;
    }
    next()
}

const validateProductRequest=(req,res,next)=>{
    if(!req.body.name || !req.body.cost){
        res.status(400).send({message:"name or cost of the product cannot be empty"});
        return;
    }

    if(!req.body.categoryId){
        res.status(400).send({message:"category of the product cannot be empty"});
        return;
    }
    Category.findByPk(req.body.categoryId)
    .then(category=>{
        if(!category){
            res.status(400).send({message:`category id passed: ${req.body.categoryId} is not available`})
        }
        next()
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}

const validateCategoryPassed=(req,res,next)=>{
    const categoryId=parseInt(req.params.categoryId);

    if(!categoryId){
        res.send(400).send({message:"category id not passsed or invalid data types"})
    }
    Category.findByPk(categoryId)
    .then(category=>{
        if(!category){
            res.status(400).send({message:`category id passed: ${req.params.categoryId} is not available`})
            return;
        }
        next();
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "something went wrong"})
    });
}

const validateCategoryAndProductPassed=(req,res,next)=>{
    const categoryId=parseInt(req.params.categoryId);
    const productId=parseInt(req.params.productId);

    if(!categoryId){
        res.send(400).send({message:"category id not passsed or invalid data types"})
    }
    if(!productId){
        res.send(400).send({message:"productId not passsed or invalid data types"})
    }


    Category.findByPk(categoryId)
    .then(category=>{
        if(!category){
            res.status(400).send({message:`category id passed: ${req.params.categoryId} is not available`})
            return
        }
        Product.findByPk(productId)
        .then(product=>{
            if(!product){
                res.status(400).send({message:`product id passed: ${req.body.productId} is not available`})
                return
            }
        })

        next()
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}

module.exports={
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest:validateProductRequest,
    validateCategoryPassed:validateCategoryPassed,
    validateCategoryAndProductPassed:validateCategoryAndProductPassed
}