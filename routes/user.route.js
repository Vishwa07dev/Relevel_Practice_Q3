
// define the routes - REST endpoints for user registration

const { signup, signin } = require("../controllers/user.controller");
const { validateSignUpRequest } = require("../middlewares/verifySignUp");

 
module.exports = (app)=>{

//Signup --> POST 127.0.0.1:8080/fitness/api/v1/users/signup
app.post("/fitness/api/v1/user/signup",[validateSignUpRequest], signup);

//Signin --> POST 127.0.0.1:8080/fitness/api/v1/users/signin
app.post("/fitness/api/v1/user/signin", signin);
}