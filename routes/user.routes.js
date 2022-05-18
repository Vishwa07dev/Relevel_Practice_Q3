const userController = require("../controllers/user.controller");

module.exports = (app) =>{
    /**
    * GET 127.0.0.1:8081/gitfit/api/v1/users/
    */
     
    app.get("/getfit/api/v1/users/", userController.findAllUsers);
   
   
    /**
     * GET 127.0.0.1:80801/gitfit/api/v1/users/{id}
     */
    app.get("/getfit/api/v1/users/:userId", userController.findUserById);
   
   
    /**
     * PUT 127.0.0.1:8081/gitfit/api/v1/users/{userId}
     */
    app.put("/getfit/api/v1/users/:userId", userController.updateUser);
   
   }