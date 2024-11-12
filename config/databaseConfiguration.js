const mongoose = require('mongoose');

mongoose.connect("mongodb://baonguyen:123@localhost:27017/epc-database?authSource=admin")
    .then(() => {
        console.log("Database Connected!");
    })
    .catch((err) => {
        console.error("database cause: ", err);
    });

module.exports = mongoose;