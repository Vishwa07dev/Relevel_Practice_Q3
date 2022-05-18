
const hospitalRoutes = require('./hospital.routes')
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

module.exports = (app)=>{
    hospitalRoutes(app);
    authRoutes(app);
    userRoutes(app);
};