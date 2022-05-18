if (process.env.NODe_ENV != "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
};
