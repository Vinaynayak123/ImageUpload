const { default: mongoose } = require("mongoose");

const UserSchema =new mongoose.Schema({
    Image:String
},{
    timestamps :true
})

const userModel = mongoose.model("Image" ,UserSchema)

module.exports = userModel