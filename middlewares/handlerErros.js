const logger = require("../config/winston-config");
require("dotenv").config();

module.exports = (error, req, res, next) => {
  if (process.env.NODE_ENV !== "production") logger.error(error.message);
  res
    .status(500)
    .json({ message: "Internal server error", error: error.message });
};
