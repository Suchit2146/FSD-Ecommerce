const categoryControllers=require("../Controllers/category.controllers")
const { requestValidator,authJWT }=require("../Middlewares")

module.exports=(app)=>{

    // create a new category
    app.post("/ecommerce/api/v1/category",[requestValidator.validateCategoryRequest,authJWT.verifyToken],categoryControllers.create);

    // get all the routes or categories
    app.get("/ecommerce/api/v1/category",categoryControllers.getAll)

    //get one category with the help if categoryId 
    app.get("/ecommerce/api/v1/category/:id",categoryControllers.getOne)
    
    //update a route by id
    app.put("/ecommerce/api/v1/category/:id",authJWT.verifyToken, categoryControllers.update)

    //delete a category

    app.delete("/ecommerce/api/v1/category/:id",authJWT.verifyToken,categoryControllers.delete)
}