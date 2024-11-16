const mongoose = require('mongoose');
require('dotenv').config({path: '../.evn.local'});

mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSOWRD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/epc-database?authSource=admin`)
    .then(() => {
        console.log("Database Connected!");
    })
    .catch((err) => {
        console.error("database cause: ", err);
    });

module.exports = mongoose;