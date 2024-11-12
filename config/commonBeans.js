const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 15;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = {hashPassword};