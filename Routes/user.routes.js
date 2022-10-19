const userController=require("../Controllers/user.controller")

module.exports=(app)=>{
    app.get("/ecommerce/api/v1/users",userController.findAll)
}