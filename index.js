var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');
var Vehicle = require('vehicle-service');
var list = require('autos-listing');

var user;

dust.loadSource(dust.compile(require('./template'), 'autos-listing'));

module.exports = function (sandbox, fn, options) {
    Vehicle.find({
        query: options.query,
        images: '288x162'
    }, function (err, vehicles) {
        if (err) {
            return fn(true, serand.none);
        }
        list(sandbox, fn, {
            vehicles: vehicles,
            styles: options.styles
        });
    });
};

serand.on('user', 'ready', function (usr) {
    user = usr;
});

serand.on('user', 'logged in', function (usr) {
    user = usr;
});

serand.on('user', 'logged out', function (usr) {
    user = null;
});
