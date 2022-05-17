
const hospitalRoutes = require('./hospital.routes')
const authRoutes = require('./auth.route')

module.exports = (app)=>{
    hospitalRoutes(app);
    authRoutes(app);
}