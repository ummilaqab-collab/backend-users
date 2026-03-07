const dns = require("dns") ;

dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const mongoose = require("mongoose")
const mongoUri = process.env.MONGODB
//console.log(process.env.MONGODB_URI)



console.log(mongoUri)

 const intializerDatabase = async() => {

 await mongoose
 .connect(mongoUri)
 .then(() =>
     console.log("Connected to the Database"))
 .catch((error)=> 
     console.log("Error to Connecting Database",error)
 )
 }

 module.exports = {intializerDatabase}
