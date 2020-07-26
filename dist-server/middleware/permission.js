"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function restrictTo() {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        // roles ['admin', 'user']. role='user'
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'You do not have permission to perform this action' });
        }
        next();
    };
}
exports.default = restrictTo;
