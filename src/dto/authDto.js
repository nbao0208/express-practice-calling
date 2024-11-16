const authDao = require('../dao/authDao');

class AuthDto {
    async register(request, response){
        return await authDao.register(
            request.body.username,
            request.body.password,
            request.body.fullName,
            request.body.personId,
            request.body.dob,
            response
        );
    }

    async login(request, response){
        return await authDao.login(
            request.body.username,
            request.body.password,
            response
        );
    }
}

module.exports = new AuthDto();