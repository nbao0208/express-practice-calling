const axios = require("axios");
const {TRAINING_MATERIAL_USERNAME, TRAINING_MATERIAL_PASSWORD, EXPIRED_TIME} = require('../shared/constants/securityConst');
const client = require('../config/redisConfiguration')

module.exports =
    async (request, response, next) => {
        console.log('=====> about to get key');
        try {
            const reply = await client.get('training-material-token');
            if (!reply) {
                try {
                    const requestBody = {
                        account: TRAINING_MATERIAL_USERNAME,
                        password: TRAINING_MATERIAL_PASSWORD
                    };

                    const trainingMaterialResponse = await axios.post('http://localhost:8080/api/v1/authentication/logIn',
                        requestBody,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    if (trainingMaterialResponse) {
                        console.log(`=====> Calling get: ${JSON.stringify(trainingMaterialResponse.data, null, 2)}`);
                        await client.set('training-material-token', trainingMaterialResponse.data.data.token, 'EX', EXPIRED_TIME);
                        await client.set('training-material-user-id', trainingMaterialResponse.data.data.id, 'EX', EXPIRED_TIME);
                    } else {
                        response.status(500).send({error: 'Training material error'});
                        return;
                    }
                } catch (error) {
                    console.log(`=====> API calling cause: ${error}`);
                    response.status(500).send({error: error});
                    return;
                }
            }

            next();
        } catch (error) {
            console.log(`=====> Redis cause: ${error}`);
            response.status(500).send({error: error});
        }
    }