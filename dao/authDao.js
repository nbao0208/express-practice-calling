const userRepository = require('../repository/userRepository');
const {hashPassword} = require('../config/commonBeans');
const {AUTHENTICATION_FAILED} = require("../shared/constants/AuthMessage");
const bcrypt = require('bcrypt');
const role = require('../shared/enums/Role');

class AuthDao {
    async register(username, password, fullName, personId, dob, response) {
        const hashedPassword = await hashPassword(password);
        const user = new userRepository(
            {
                username: username,
                password: hashedPassword,
                fullName: fullName,
                personId: personId,
                dob: dob,
                role: role.STUDENT
            }
        );
        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            response.status(500).send({error: error});
        }
    }

    async login(username, password, response) {
        try {
            const user = await userRepository.findOne({username: username});
            if (!user) {
                response.status(404).send({error: AUTHENTICATION_FAILED});
            }

            console.log('====> Auth Dao: ',user);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                response.status(404).send({error: AUTHENTICATION_FAILED});
            }else{
                return user;
            }
        } catch (error) {
            console.log(error);
            response.status(500).send({error: error});
        }
    }
}

module.exports = new AuthDao();