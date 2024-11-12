const UserEntity = require('../entity/userEntity');
const mongoose = require('mongoose');

UserEntity.addHooks(UserEntity);
module.exports = mongoose.model('epc-user', UserEntity);
