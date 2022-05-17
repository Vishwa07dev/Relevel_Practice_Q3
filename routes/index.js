const hospitalRoute = require("./hospital.route")
const userRoute = require("./user.route")



module.exports = (app)=>{
    hospitalRoute(app),
    userRoute(app);
}