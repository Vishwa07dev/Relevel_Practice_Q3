const authJwt = require("./authjwt");
const verifyTrackRecord = require("./healthTrackRecord");
const verifyPrescription = require("./prescription");
const verifyAppointment = require("./appointment");
module.exports = {
    authJwt,
    verifyTrackRecord,
    verifyPrescription,
    verifyAppointment
}