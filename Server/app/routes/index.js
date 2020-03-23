'use strict';

const rsaRoute = require('./../routes/rsa-route');

// method to route the initiated app 
module.exports = (app) => {
    rsaRoute(app);
};