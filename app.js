var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var basename = path.basename(__filename);
var fs = require('fs')

var app = express();

app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log('staring app @' + process.env.PORT);
fs
  .readdirSync(path.join(__dirname,'/routes'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const route = require(path.join(__dirname, '/routes/' ,file))
    if (typeof route === 'function') {
        console.log('starting route: ' + file);
        route(app);
    } else {
        console.log('skipping ' + file);
    }
  });

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
