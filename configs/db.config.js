module.exports={

    development:{
        HOST:"localhost",
        USER:"root",
        PASSWORD:"Sksql@12345",
        DB:"ecommerce_db",
        dialect:"mysql",
        pool:{
            max:5,
            min:0,
            acquire:30000, //max time in ms that a pool will try to get aconnection before throwing error.
            idle:10000, //max time in ms that a connection can be idle before being released
        }
    },
    production:{
        HOST:"sql6.freemysqlhosting.net",
        USER:"sql6527674",
        PASSWORD:"hJCZrZuWMa",
        DB:"sql6527674",
        dialect:"mysql",
        pool:{
            max:5,
            min:0,
            acquire:30000, //max time in ms that a pool will try to get aconnection before throwing error.
            idle:10000, //max time in ms that a connection can be idle before being released
        }
    }
}