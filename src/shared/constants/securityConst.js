require('dotenv').config();

const TOKEN_KEY = process.env.TOKEN_KEY;
const TRAINING_MATERIAL_USERNAME = process.env.TRAINING_MATERIAL_USERNAME;
const TRAINING_MATERIAL_PASSWORD = process.env.TRAINING_MATERIAL_PASSWORD;
const EXPIRED_TIME = 24*60*60;
module.exports = {TOKEN_KEY, TRAINING_MATERIAL_USERNAME, TRAINING_MATERIAL_PASSWORD, EXPIRED_TIME};