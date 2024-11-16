const mongoose = require('mongoose')

class BaseEntity extends mongoose.Schema {
    constructor(childAttribute) {

        super({
            ...childAttribute,
            created: {
                type: Date,
            },

            modified: {
                type: Date,
            },

            createdBy: {
                type: String,
                default: 'Bao Nguyen'
            },

            modifiedBy: {
                type: String,
                default: 'Bao Nguyen'
            },

            isDeleted: {
                type: Boolean,
                default: false
            }
        });
    }

    addHooks(children){
        children.pre('save', function (next) {
            console.log('=====> log in hook save');
            this.created = new Date();
            this.modified = new Date();
            next();
        });

        children.pre(['updateOne', 'updateMany'], function (next) {
            this.modified = new Date();
            next();
        });

        children.pre('deleteOne', function (next) {
            this.modified = new Date();
            this.isDeleted = true;
            next();
        })
    }

}

module.exports = BaseEntity;