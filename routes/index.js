const healthCardRoute = require("./healthCard.route")
const hospitalRoute = require("./hospital.route")
const userRoute = require("./user.route")



module.exports = (app)=>{
    hospitalRoute(app),
    userRoute(app),
    healthCardRoute(app)
}