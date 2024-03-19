const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
},{timestamps: true})

const user = mongoose.model("user", userShema)

module.exports = user