"use strict";
exports.__esModule = true;
exports.getIpAddress = function (req) {
    var ipAddresses = req.headers["x-forwarded-for"].split(",");
    var firstIpAddress = ipAddresses[0];
    var remoteAddress = req.connection.remoteAddress;
    return firstIpAddress || remoteAddress;
};
