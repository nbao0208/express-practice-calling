const authService = require('../service/authService');
const Response = require('../../model/response/response');
const {v4:uuid} = require('uuid');

class AuthController {
    async register(request, response){
        const token = await authService.register(request, response);
        response.status(200).send(new Response(
            uuid(),
            token,
        ));
    }

    async login(request, response){
        const token = await authService.login(request, response);
        response.status(200).send(new Response(
            uuid(),
            token,
        ))
    }
}

module.exports = new AuthController();