"use strict";
const Services = {
    Hacker: require("../services/hacker.service"),
    Logger: require("../services/logger.service"),
    Email: require("../services/email.service")
};
const Util = require("../middlewares/util.middleware");
const Constants = {
    Error: require("../constants/error.constant"),
};

/**
 * @async
 * @function findById
 * @param {{body: {id: ObjectId}}} req
 * @param {*} res
 * @return {JSON} Success or error status
 * @description Retrieves a hacker's information via it's mongoId specified in req.params.id. The id is moved to req.body.id from req.params.id by validation.
 */
async function findById(req, res) {
    const hacker = await Services.Hacker.findById(req.body.id);

    if (hacker) {
        return res.status(200).json({
            message: "Successfully retrieved hacker information",
            data: hacker.toJSON()
        });
    } else {
        return res.status(404).json({
            message: Constants.Error.HACKER_404_MESSAGE,
            data: {}
        });
    }
}

/**
 * @async
 * @function createHacker
 * @param {{body: {hackerDetails: {_id: ObjectId, accountId: ObjectId, school: string, gender: string, needsBus: boolean, application: {Object}}}}} req
 * @param {*} res
 * @return {JSON} Success or error status
 * @description create a hacker from information in req.body.hackerDetails
 */
async function createHacker(req, res) {
    const hackerDetails = req.body.hackerDetails;

    const success = await Services.Hacker.createHacker(hackerDetails);

    if (success) {
        return res.status(200).json({
            message: "Hacker creation successful",
            data: hackerDetails
        });
    } else {
        return res.status(400).json({
            message: Constants.Error.HACKER_CREATE_500_MESSAGE,
            data: {}
        });
    }
}

/**
 * @async
 * @function updateHacker
 * @param {{params: {id: ObjectId}, body: {Object}}} req
 * @param {*} res
 * @return {JSON} Success or error status
 * @description 
 *      Change a hacker's information based on the hacker's mongoID specified in req.params.id.
 *      The id is moved to req.body.id from req.params.id by validation.
 *      Returns a 200 status for an updated hacker.
 *      The new information is located in req.body.
 */
async function updatedHacker(req, res) {
    return res.status(200).json({
        message: "Changed hacker information",
        data: req.body
    });
}

function uploadedResume(req, res) {
    return res.status(200).json({
        message: "Uploaded resume",
        data: {
            filename: req.body.gcfilename
        }
    });
}

function downloadedResume(req, res) {
    return res.status(200).json({
        message: "Downloaded resume",
        data: {
            id: req.body.id,
            resume: req.body.resume
        }
    });
}

module.exports = {
    updatedHacker: updatedHacker,
    findById: Util.asyncMiddleware(findById),
    createHacker: Util.asyncMiddleware(createHacker),
    uploadedResume: uploadedResume,
    downloadedResume: downloadedResume
};