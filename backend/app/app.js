const express = require('express');
const cors = require('cors');
const path = require('path');
const glob = require('glob');
const app = express();
const router = express.Router();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load controllers
let controllers = glob.sync(path.join(__dirname, 'routes', '**', '*.js'));

controllers.forEach(controller => {
    module.require(controller)(router);
});

// enable router
app.use('/', router);

//exporting application
module.exports = app;
