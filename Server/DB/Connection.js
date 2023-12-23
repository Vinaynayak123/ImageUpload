const mongoose = require("mongoose")

const DBConnection = ()=>{
    mongoose.connect("mongodb://localhost:27017/CURD")
    .then(()=>{
        console.log("Database is connected Successfully :")
    })
    .catch(()=>{
        console.log("Database is not connected :")
    })
}

module.exports = DBConnection
