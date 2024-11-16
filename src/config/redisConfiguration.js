const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

client.connect()
    .then(() => {
        console.log("Connected to redis cache");
    })
    .catch((err) => {
        console.error("Redis cause: ", err);
    });

module.exports = client;