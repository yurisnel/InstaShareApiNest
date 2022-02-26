"use strict";
exports.__esModule = true;
exports.convertObject = void 0;
var convertObject = function (from, to) {
    for (var _i = 0, _a = Reflect.ownKeys(from); _i < _a.length; _i++) {
        var key = _a[_i];
        if (to.hasOwnProperty(key)) {
            from[key] = to[key];
        }
    }
    return from;
};
exports.convertObject = convertObject;
