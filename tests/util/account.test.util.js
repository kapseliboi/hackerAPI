"use strict";
const Util = {
    Permission: require("./permission.test.util")
};
const Account = require("../../models/account.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const logger = require("../../services/logger.service");
const TAG = "[ ACCOUNT.TEST.UTIL.JS ]";

const newAccount1 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "newAcc1",
    "firstName": "NEW",
    "lastName": "Account",
    "email": "newexist@blahblah.com",
    "password": "1234567890",
    "permissions": [Util.Permission.Permission1._id, Util.Permission.Permission6._id],
    "dietaryRestrictions": ["none"],
    "shirtSize": "S"
};
const nonAccount1 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "nonAcc1",
    "firstName": "non",
    "lastName": "Account",
    "email": "notexist@blahblah.com",
    "password": "12345789",
    "dietaryRestrictions": ["none"],
    "shirtSize": "S",
};
const Account1 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "acc1",
    "firstName": "ABC",
    "lastName": "DEF",
    "email": "abc.def1@blahblah.com",
    "password": "probsShouldBeHashed1",
    "permissions": [Util.Permission.Permission1._id, Util.Permission.Permission6._id],
    "dietaryRestrictions": ["none"],
    "shirtSize": "S"
};
const Account2 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "acc2",
    "firstName": "abc",
    "lastName": "def",
    "email": "abc.def2@blahblah.com",
    "password": "probsShouldBeHashed2",
    "permissions": [Util.Permission.Permission2._id, Util.Permission.Permission7._id],
    "dietaryRestrictions": ["vegetarian"],
    "shirtSize": "M"
};
const Account3 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "acc3",
    "firstName": "XYZ",
    "lastName": "UST",
    "email": "abc.def3@blahblah.com",
    "password": "probsShouldBeHashed3",
    "permissions": [Util.Permission.Permission3._id, Util.Permission.Permission8._id],
    "dietaryRestrictions": ["vegan"],
    "shirtSize": "L"
};
const Account4 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "acc4",
    "firstName": "xyz",
    "lastName": "ust",
    "email": "abc.def4@blahblah.com",
    "password": "probsShouldBeHashed4",
    "permissions": [Util.Permission.Permission4._id, Util.Permission.Permission9._id],
    "dietaryRestrictions": ["vegetarian", "lactose intolerant"],
    "shirtSize": "XL"
};
const Account5 = {
    "_id": mongoose.Types.ObjectId(),
    "name": "acc5",
    "firstName": "LMAO",
    "lastName": "ROFL",
    "email": "abc.def5@blahblah.com",
    "password": "probsShouldBeHashed5",
    "permissions": [Util.Permission.Permission5._id, Util.Permission.Permission10._id],
    "dietaryRestrictions": ["something1", "something2"],
    "shirtSize": "XXL"
};
const Accounts = [
    Account1,
    Account2,
    Account3,
    Account4,
    Account5,
];

module.exports = {
    nonAccount1: nonAccount1,
    newAccount1: newAccount1,
    Account1: Account1,
    Account2: Account2,
    Account3: Account3,
    Account4: Account4,
    Account5 :Account5,
    Accounts: Accounts,
    storeAll: storeAll,
    dropAll: dropAll
};

function encryptPassword(user) {
    let encryptedUser = JSON.parse(JSON.stringify(user));
    encryptedUser.password = bcrypt.hashSync(user.password,10);
    return encryptedUser;
}

function storeAll(attributes, callback) {
    const acctDocs = [];
    const acctNames = [];
    for (var i = 0; i < attributes.length; i++) {
        const encryptedUser = encryptPassword(attributes[i]);
        acctDocs.push(new Account(encryptedUser));
        acctNames.push(attributes[i].name);
    }

    Account.collection.insertMany(acctDocs).then(
        () => {
            logger.info(`${TAG} saved Account:${acctNames.join(",")}`);
            callback();
        },
        (reason) => {
            logger.error(`${TAG} could not store Account ${acctNames.join(",")}. Error: ${JSON.stringify(reason)}`);
            callback(reason);
        }
    );
}
function dropAll(callback) {
    Account.collection.drop().then(
        () => {
            logger.info(`Dropped table Account`);
            callback();
        },
        (err) => {
            logger.error(`Could not drop Account. Error: ${JSON.stringify(err)}`);
            callback(err);
        }
    );
}