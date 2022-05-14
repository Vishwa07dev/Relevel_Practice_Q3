const hospitalRoutes = require('./hospital.route');

module.exports = (app) => {
    hospitalRoutes(app);
}