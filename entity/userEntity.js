const BaseEntity = require('./baseEntity');
const UserEntity = new BaseEntity({
    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true,
        unique: true
    },

    fullName: {
        type: String,
        require: true,
    },

    personId: {
        type: String,
        require: true,
        unique: true
    },

    dob: {
        type: Date,
        required: true
    },

    role: {
        type: String,
        required: true
    }
});

module.exports = UserEntity;
