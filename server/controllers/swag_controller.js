const swag = require ('../models/swag'); //models is coming from the folder that contains swag & user .js


module.exports = {
  read: (req, res, next) => {
    res.status(200).send(swag);
  }
};
