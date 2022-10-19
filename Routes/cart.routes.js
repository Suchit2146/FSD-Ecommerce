const {authJWT}=require("../Middlewares");
const cartControllers=require("../Controllers/cart.controller");

module.exports=function(app){

    app.post("/ecommerce/api/v1/carts",[authJWT.verifyToken],cartControllers.create);

    app.put("/ecommerce/api/v1/carts",[authJWT.verifyToken],cartControllers.update);

    app.get("/ecommerce/api/v1/carts",[authJWT.verifyToken],cartControllers.findCart);

    app.delete("/ecommerce/api/v1/carts/products/:id",[authJWT.verifyToken],cartControllers.deleteProductFromCart);

}