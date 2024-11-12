const authDto = require('../dto/authDto');
const jwtService = require('./jwtService');

class AuthService {
    async register(request, response){
        const user = await authDto.register(request, response);
        return jwtService.getToken(user);
    }

    async login(request, response){
        const authenticatedUser = await authDto.login(request, response);
        console.log('=====> Auth Service: ', authenticatedUser);
        return jwtService.getToken(authenticatedUser);
    }
}

module.exports = new AuthService();