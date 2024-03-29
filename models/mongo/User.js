/**
 * User model
 * */
const MongoDbModel = require('../../bootloader/mongo/lib/MongoDbModel');
// For Number types better reading
const Float = Number;
const Int = Number;

class User extends MongoDbModel {

    /*Define which database to connect to*/
    static get connection() {
        return this.APP_DB;
    }

    /* Needed functions by the MongoDbModel Interface */
    static get Name() {
        return this.name;
    }

    static get Schema() {
        return mongoose => ({
            email:{
                type:String,
                unique:true
            },
            password:String
        })
    }

    static get Indexes() {
        return [];
    }
}

exports = module.exports = User;

