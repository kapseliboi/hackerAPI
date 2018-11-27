"use strict";

const express = require("express");
const Controllers = {
    Account: require("../../controllers/account.controller")
};
const Middleware = {
    Validator: {
        /* Insert the require statement to the validator file here */
        Account: require("../../middlewares/validators/account.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator"),
        Auth: require("../../middlewares/validators/auth.validator")
    },
    /* Insert all of ther middleware require statements here */
    parseBody: require("../../middlewares/parse-body.middleware"),
    Account: require("../../middlewares/account.middleware"),
    Auth: require("../../middlewares/auth.middleware")
};
const Services = {
    Account: require("../../services/account.service"),
};

module.exports = {
    activate: function (apiRouter) {
        const accountRouter = express.Router();

        /**
         * @api {get} /account/self get information about own account
         * @apiName self
         * @apiGroup Account
         * @apiVersion 0.0.8
         * 
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Account object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Account found by user email", 
                    "data": {AccountObject}
                }

         * @apiError {string} message Error message
         * @apiError {object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Account not found", "data": {}}
         */
        accountRouter.route("/self").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized(),

            Controllers.Account.getUserByEmail
        );

        /**
         * @api {post} /account/ create a new account
         * @apiName create
         * @apiGroup Account
         * @apiVersion 0.0.8
         * 
         * @apiParam (body) {String} firstName First name of the account creator.
         * @apiParam (body) {String} lastName Last name of the account creator.
         * @apiParam (body) {String} email Email of the account.
         * @apiParam (body) {String} dietaryRestrictions Any dietary restrictions for the user. 'None' if there are no restrictions
         * @apiParam (body) {String} shirtSize Size of the shirt that the user will receive.
         * @apiParam (body) {String} passowrd The password of the account.
         * 
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Account object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Account creation successful", 
                    "data": {...}
                }

         * @apiError {string} message Error message
         * @apiError {object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Account already exists", "data": {}}
         */
        accountRouter.route("/").post(
            // validators
            Middleware.Validator.Account.newAccountValidator,

            Middleware.parseBody.middleware,

            // middlewares to parse body/organize body
            // adds default hacker permissions here
            Middleware.Account.parseAccount,

            // Parses account token if it exists
            Middleware.Auth.parseAccountConfirmationToken,
            Middleware.Auth.validateConfirmationTokenWithoutAccount,

            // middleware to create hacker object in database
            Middleware.Account.addAccount,
            Middleware.Auth.addCreationRoleBindings,

            // middleware to create a hacker token 
            // and send a confirmation message
            Middleware.Auth.sendConfirmAccountEmailMiddleware,
            // should return status in this function
            Controllers.Account.addUser
        );

        /**
         * @api {patch} /account/:id update an account's information
         * @apiName updateOneUser
         * @apiGroup Account
         * @apiVersion 0.0.8
         * 
         * @apiParam (body) {String} [firstName] First name of the account creator.
         * @apiParam (body) {String} [lastName] Last name of the account creator.
         * @apiParam (body) {String} [email] Email of the account.
         * @apiParam (body) {String} [dietaryRestrictions] Any dietary restrictions for the user. 'None' if there are no restrictions
         * @apiParam (body) {String} [shirtSize] Size of the shirt that the user will receive.
         * @apiParam (body) {String} [passowrd] The password of the account.
         * 
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Account object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Changed account information", 
                    "data": {...}
                }

         * @apiError {string} message Error message
         * @apiError {object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Error while updating account", "data": {}}
         */
        accountRouter.route("/:id").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Services.Account.findById]),
            // validators
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Validator.Account.updateAccountValidator,

            Middleware.parseBody.middleware,
            Middleware.Account.parsePatch,

            Middleware.Account.updateAccount,
            // no parse account because will use req.body as information
            // because the number of fields will be variable
            Controllers.Account.updatedAccount
        );

        /**
         * @api {get} /account/:id gets information from an account with mongoid ':id'
         * @apiName getAccount
         * @apiGroup Account
         * @apiVersion 0.0.8
         * 
         * @apiParam (param) {ObjectId} id MongoId of an account
         * 
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Account object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Account found by user id", 
                    "data": {AccountObject}
                }

         * @apiError {string} message Error message
         * @apiError {object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Account not found", "data": {}}
         */
        accountRouter.route("/:id").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Services.Account.findById]),

            Middleware.Validator.RouteParam.idValidator,
            Middleware.parseBody.middleware,

            Controllers.Account.getUserById
        );

        /**
         * @api {patch} /account/confirmation/:id update an account's confirmed status
         * @apiName patchAccountConfirmed
         * @apiGroup Account
         * @apiVersion 0.0.9
         * 
         * @apiParam (body) {Boolean} [confirmed] Whether the account is confirmed or not
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Hacker object
         * @apiSuccessExample {object} Success-Response: 
         *      {
         *          "message": "Changed account information", 
         *          "data": {
         *              "confirmed": "true"
         *          }
         *      }
         * @apiPermission Administrator
         */
        accountRouter.route("/confirmation/:id").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Services.Account.findById]),

            Middleware.Validator.RouteParam.idValidator,
            Middleware.Validator.Account.updateConfirmationValidator,
            Middleware.parseBody.middleware,
            Middleware.Account.parsePatch,

            Middleware.Account.updateAccount,
            Controllers.Account.updatedAccount
        );

        apiRouter.use("/account", accountRouter);
    }
};