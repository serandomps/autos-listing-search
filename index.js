var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');
var Vehicle = require('vehicles-service');
var list = require('vehicles-find');

module.exports = function (sandbox, options, done) {
    Vehicle.find({
        query: options,
        images: '288x162'
    }, function (err, vehicles) {
        if (err) {
            return done(err);
        }
        list(sandbox, {
            vehicles: vehicles,
            size: 4
        }, done);
    });
};
