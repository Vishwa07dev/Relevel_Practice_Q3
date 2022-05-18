const authController = require("../controllers/auth.contoller");
const {userCheckPoint} = require("../middlewares");


module.exports = (app)=>{
    
    
    app.post("/getfit/api/v1/users", [userCheckPoint.validateSignupRequest], authController.signup);

  
    app.post("/getfit/api/v1/auth/signin", [userCheckPoint.validateSigninRequest], authController.signin);


}