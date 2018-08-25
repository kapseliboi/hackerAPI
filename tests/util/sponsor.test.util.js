"use strict";
const Util = {
    Account: require("./account.test.util"),
    Hacker: require("./hacker.test.util"),
}
const Sponsor = require("../../models/sponsor.model");
const mongoose = require("mongoose");
const logger = require("../../services/logger.service");
const TAG = "[ SPONSOR.TEST.UTIL.JS ]";

const Sponsor1 = {
    _id: mongoose.Types.ObjectId(),
    "accountId": Util.Account.Account1._id,
    "tier": 3,
    "company": "Best company NA",
    "contractURL": "https://linkto.contract",
    "nominees": Util.Hacker.HackerA._id,
};
const Sponsors = [
    Sponsor1,
];

function storeAll(attributes, callback) {
    const sponsorDocs = [];
    const sponsorNames = [];
    attributes.forEach((attribute) => {
        sponsorDocs.push(new Sponsor(attribute));
        sponsorNames.push(attribute.name);
    });

    Sponsor.collection.insertMany(sponsorDocs).then(
        () => {
            logger.info(`${TAG} saved Sponsors: ${sponsorNames.join(",")}`);
            callback();
        },
        (reason) => {
            logger.error(`${TAG} could not store Sponsors ${sponsorNames.join(",")}. Error: ${JSON.stringify(reason)}`);
            callback(reason);
        }
    );
}

function dropAll(callback) {
    Sponsor.collection.drop().then(
        () => {
            logger.info(`dropped table Sponsor`);
            callback();
        },
        (err) => {
            logger.infor(`Could not drop Sponsor. Error: ${JSON.stringify(err)}`);
            callback();
        }
    );
}

module.exports = {
    Sponsor1: Sponsor1,
    Sponsors: Sponsors,
    storeAll: storeAll,
    dropAll: dropAll,
};