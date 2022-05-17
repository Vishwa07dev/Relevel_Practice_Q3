const authController = require('../controllers/auth.controller');
const {verifySignUp} = require('../middleware')

module.exports = (app)=>{

    app.post("/getfit/api/v1/hospitals/signup",[verifySignUp.validateSignUpRequest],authController.signup);
    app.post("/getfit/api/v1/signin",authController.signin);

}