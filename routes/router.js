const express = require('express');
const app = express.Router();

/*Product*/
var product = require('../controller/product');
app.use('/app/product', product);
/*End of Product*/

module.exports = app;