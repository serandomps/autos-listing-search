var Vehicle = require('vehicles-service');
var list = require('vehicles-find');

var numbers = ['price', 'manufacturedAt'];

var cast = function (field, val) {
  if (numbers.indexOf(field) === -1) {
      return val;
  }
  return parseInt(val, 10) || null;
};

module.exports = function (ctx, container, options, done) {
    var query = options.query;
    var o = {};
    Object.keys(query).forEach(function (name) {
        if (name.indexOf(':') === -1) {
            return o[name] = cast(name, query[name]);
        }
        var parts = name.split(':');
        var q = {};
        var field = parts[0];
        var operator = '$' + parts[1];
        q[operator] = cast(field, query[name]);
        o[field] = o[field] || (o[field] = {});
        _.merge(o[field], q);
    });
    Vehicle.find({
        query: o,
        resolution: '288x162'
    }, function (err, vehicles) {
        if (err) {
            return done(err);
        }
        list(ctx, container, {
            deck: options.deck,
            vehicles: vehicles,
            size: 4
        }, done);
    });
};
