"use strict";

const ACCOUNT_404_MESSAGE = "Account not found";
const HACKER_404_MESSAGE = "Hacker not found";
const TEAM_404_MESSAGE = "Team not found";
const RESUME_404_MESSAGE = "Resume not found";
const SPONSOR_404_MESSAGE = "Sponsor not found";

const ACCOUNT_TYPE_409_MESSAGE = "Wrong account type";
const SPONSOR_ID_409_MESSAGE = "Conflict with sponsor accountId link";
const VOLUNTEER_ID_409_MESSAGE = "Conflict with volunteer accountId link";
const HACKER_ID_409_MESSAGE = "Conflict with hacker accountId link";
const TEAM_MEMBER_409_MESSAGE = "Conflict with team member being in another team";

const TEAM_MEMBER_422_MESSAGE = "Duplicate team member in input";
const VALIDATION_422_MESSAGE = "Validation failed";
const ACCOUNT_DUPLICATE_422_MESSAGE = "Account already exists";

const ACCOUNT_TOKEN_401_MESSAGE = "Invalid token for account";
const AUTH_401_MESSAGE = "Invalid Authentication";

const AUTH_403_MESSAGE = "Invalid Authorization";
const ACCOUNT_403_MESSAGE = "Account not verified";

const HACKER_UPDATE_500_MESSAGE = "Error while updating hacker";
const ACCOUNT_UPDATE_500_MESSAGE = "Error while updating account";
const HACKER_CREATE_500_MESSAGE = "Error while creating hacker";
const SPONSOR_CREATE_500_MESSAGE = "Error while creating sponsor";
const TEAM_CREATE_500_MESSAGE = "Error while creating team";
const VOLUNTEER_CREATE_500_MESSAGE = "Error while creating volunteer";
const EMAIL_500_MESSAGE = "Error while generating email";
const GENERIC_500_MESSAGE = "Internal error";
const LOGIN_500_MESSAGE = "Error while logging in";

module.exports = {
    ACCOUNT_404_MESSAGE: ACCOUNT_404_MESSAGE,
    HACKER_404_MESSAGE: HACKER_404_MESSAGE,
    TEAM_404_MESSAGE: TEAM_404_MESSAGE,
    RESUME_404_MESSAGE: RESUME_404_MESSAGE,
    ACCOUNT_TYPE_409_MESSAGE: ACCOUNT_TYPE_409_MESSAGE,
    SPONSOR_ID_409_MESSAGE: SPONSOR_ID_409_MESSAGE,
    VOLUNTEER_ID_409_MESSAGE: VOLUNTEER_ID_409_MESSAGE,
    TEAM_MEMBER_409_MESSAGE: TEAM_MEMBER_409_MESSAGE,
    TEAM_MEMBER_422_MESSAGE: TEAM_MEMBER_422_MESSAGE,
    VALIDATION_422_MESSAGE: VALIDATION_422_MESSAGE,
    ACCOUNT_TOKEN_401_MESSAGE: ACCOUNT_TOKEN_401_MESSAGE,
    AUTH_401_MESSAGE: AUTH_401_MESSAGE,
    AUTH_403_MESSAGE: AUTH_403_MESSAGE,
    ACCOUNT_403_MESSAGE: ACCOUNT_403_MESSAGE,
    HACKER_UPDATE_500_MESSAGE: HACKER_UPDATE_500_MESSAGE,
    HACKER_ID_409_MESSAGE: HACKER_ID_409_MESSAGE,
    ACCOUNT_UPDATE_500_MESSAGE: ACCOUNT_UPDATE_500_MESSAGE,
    HACKER_CREATE_500_MESSAGE: HACKER_CREATE_500_MESSAGE,
    SPONSOR_404_MESSAGE: SPONSOR_404_MESSAGE,
    SPONSOR_CREATE_500_MESSAGE: SPONSOR_CREATE_500_MESSAGE,
    TEAM_CREATE_500_MESSAGE: TEAM_CREATE_500_MESSAGE,
    VOLUNTEER_CREATE_500_MESSAGE: VOLUNTEER_CREATE_500_MESSAGE,
    EMAIL_500_MESSAGE: EMAIL_500_MESSAGE,
    GENERIC_500_MESSAGE: GENERIC_500_MESSAGE,
    ACCOUNT_DUPLICATE_422_MESSAGE: ACCOUNT_DUPLICATE_422_MESSAGE,
    LOGIN_500_MESSAGE: LOGIN_500_MESSAGE,
};