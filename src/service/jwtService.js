const userRepository = require('../repository/userRepository');
const {TOKEN_KEY} = require('../shared/constants/securityConst');
const jwt = require('jsonwebtoken');
const {response} = require("express");

class JwtService {
    getToken(user) {
        const payload = {
            id: user.id,
            "full-name": user.fullName,
            "person-id": user.personId,
            dob: user.dob.toString(),
            role: user.role
        };

        return jwt.sign(payload, TOKEN_KEY, {expiresIn: '1h'});
    }

    extractAllClaims(token) {
        try {
            return jwt.verify(token, TOKEN_KEY);
        } catch (error) {
            response.status(501).send({error: error});
        }
    }

    extractUsername(token) {
        let tokenPayload = this.extractAllClaims(token);
        return tokenPayload.name;
    }

    async isValid(token) {
        let username = this.extractUsername(token);
        try {
            return await userRepository.findOne({username: username});
        }catch (error) {
            console.log(error);
            response.status(500).send({error: error});
        }
    }
}

module.exports = new JwtService();