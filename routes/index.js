
const hospitalRoutes = require('./hospital.routes')
const authRoutes = require('./auth.routes')

module.exports = (app)=>{
    hospitalRoutes(app);
    authRoutes(app);
}