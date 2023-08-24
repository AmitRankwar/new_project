const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    tel : {
        type: String,
        required: true
    },

    email : {
        type: String,
        
    },

    
    details : {
        type: String,
        
    },

    createdAt: {
        type: Date,
      default: Date.now()
    },

    updatedAt : {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Customer" , customerSchema );