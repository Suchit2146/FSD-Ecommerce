const productControllers=require("../Controllers/product.controllers")
const {requestValidator,authJWT} = require("../Middlewares")

module.exports=(app)=>{
    app.post("/ecommerce/api/v1/products",[requestValidator.validateProductRequest,authJWT.verifyToken],productControllers.create);
    
    app.get("/ecommerce/api/v1/products",productControllers.findAll);
    
    app.get("/ecommerce/api/v1/products/:id",productControllers.findOne);

    //update and delete homework

    app.get("/ecommerce/api/v1/category/:categoryId/products",requestValidator.validateCategoryPassed,
    productControllers.findProductsUnderCategory);

    app.get("/ecommerce/api/v1/category/:categoryId/products/:productId",requestValidator.validateCategoryAndProductPassed,productControllers.findProductUnderCategory);
}