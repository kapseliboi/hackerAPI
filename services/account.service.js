"use strict";
const Account = require("../models/account.model");
const logger = require("./logger.service");

async function findById(id) {
    const TAG = `[Account Service # findById]:`;
    const query = {
        _id: id
    };
    return await Account.findById(query, function (error, user) {
        if (error) {
            logger.error(`${TAG} Failed to verify if accounts exist or not using ${JSON.stringify(query)}`, error);
        } else if (user) {
            logger.debug(`${TAG} accounts using ${JSON.stringify(query)} exist in the database`);
        } else {
            logger.debug(`${TAG} accounts using ${JSON.stringify(query)} do not exist in the database`);
        }
    });
}

async function findByEmail(email) {
    const query = {
        email: email
    };
    return await findOne(query, singleUserCallback);
}

async function findOne(query) {
    const TAG = `[Account Service # findOne ]:`;
    return await Account.findOne(query, function (error, user) {
        if (error) {
            logger.error(`${TAG} Failed to verify if accounts exist or not using ${JSON.stringify(query)}`, error);
        } else if (user) {
            logger.debug(`${TAG} accounts using ${JSON.stringify(query)} exist in the database`);
        } else {
            logger.debug(`${TAG} accounts using ${JSON.stringify(query)} do not exist in the database`);
        }
    });
}

// untested
async function addOneAccount(accountDetails) {
    const TAG = `[Account Service # addOneAccount ]:`;

    const account = new Account(accountDetail);

    const success = await account.save(function (error) {
        if (error) {
            logger.error(`${TAG} Failed to add account`);
        } else {
            logger.error(`${TAG} added account to database`);
        }
    });

    return !!(success);
}

module.exports = {
    findOne: findOne,
    findById: findById,
    findByEmail: findByEmail,
    addOneAccount: addOneAccount
};