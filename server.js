
const express=require("express");
const config=require("./configs/db.config");
const bodyParser=require("body-parser");
const {authJWT}=require("./Middlewares")
require("dotenv").config();

const {Role} = require("./models") 

const app = express();

app.use(bodyParser.json())

const db=require("./models");


db.sequelize.sync({force:false})
.then(()=>{
    console.log("DB synced")
})

//add role

// Role.create({
//     // id:1,
//     name:"user"
// });
// Role.create({
//     // id:2,
//     name:"admin"
// })

//import authentication(signin/signup) routes
require("./Routes/auth.routes")(app);


// app.use(authJWT.verifyToken);

//import category routes
require("./Routes/category.routes")(app);

//import product routes
require("./Routes/product.routes")(app);


//import user routes
require("./Routes/user.routes")(app);

// import cart routes
require("./Routes/cart.routes")(app);


app.listen(process.env.PORT,()=>{
    console.log(`application is running on port ${process.env.PORT}`)
})