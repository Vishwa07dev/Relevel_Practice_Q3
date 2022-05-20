const authRoutes = require("./auth.routes");
const hospitalRoutes = require("./hospital.routes");

module.exports = (app) => {
    authRoutes(app),
    hospitalRoutes(app)
}