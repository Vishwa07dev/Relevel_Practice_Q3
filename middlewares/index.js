
const authJwt = require("./authJwt");
const verifySignup = require("./verifysignup");
const healthTrackRecord = require("./healthTrackRecord");

module.exports = {
    verifySignup : verifySignup,
    healthTrackRecord : healthTrackRecord,
    authJwt : authJwt

const authJwt = require("./authjwt");
const verifyTrackRecord = require("./healthTrackRecord");
module.exports = {
    authJwt,
    verifyTrackRecord
}