const express = require('express');
const router = express.Router();
const axios = require('axios');
const redisClient = require('../config/redisConfiguration');


router.get('', async (req, res) => {
    await axios.get('http://localhost:8080/api/v1/express/test')
        .then(async response => {
            try {
                console.log(`training material token: ${await redisClient.get('training-material-token')}`);
                console.log(`training material user id: ${await redisClient.get('training-material-user-id')}`);
            }catch (error) {
                console.error(error);
            }
            console.log(response.data)
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
});

module.exports = router;