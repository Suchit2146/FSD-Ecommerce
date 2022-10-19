const {signUpValidator} = require("../Middlewares");
const authController = require("../Controllers/auth.controller")

module.exports=function(app){

    app.post("/ecommerce/api/v1/auth/signup",[signUpValidator.checkDuplicateEmailOrUserName,signUpValidator.checkRolesExists],authController.signup);

    app.post("/ecommerce/api/v1/auth/signin",authController.signIn);
}