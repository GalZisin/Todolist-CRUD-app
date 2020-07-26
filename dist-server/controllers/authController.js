"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.login = exports.register = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' });
var signToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
var createSendToken = function (user, statusCode, req, res) {
    var token = signToken(user._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + Number("" + process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user: user,
        },
    });
};
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, email, password, user, salt, hash, newUser, savedUser, e_1, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                    // Simple validation
                    if (!name_1 || !email || !password) {
                        return [2 /*return*/, res.status(400).json({ msg: 'Please enter all fields' })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, User_1.default.findOne({ email: email })];
                case 2:
                    user = _b.sent();
                    if (user)
                        throw Error('User already exists');
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 3:
                    salt = _b.sent();
                    if (!salt)
                        throw Error('Something went wrong with bcrypt');
                    return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
                case 4:
                    hash = _b.sent();
                    if (!hash)
                        throw Error('Something went wrong hashing the password');
                    newUser = new User_1.default({
                        name: name_1,
                        email: email,
                        password: hash,
                    });
                    return [4 /*yield*/, newUser.save()];
                case 5:
                    savedUser = _b.sent();
                    if (!savedUser)
                        throw Error('Something went wrong saving the user');
                    // const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
                    //   expiresIn: 3600,
                    // });
                    createSendToken(savedUser, 201, req, res);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _b.sent();
                    res.status(400).json({ error: e_1.message });
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_2 = _b.sent();
                    console.log(e_2);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, isMatch, e_3, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.body, email = _a.email, password = _a.password;
                    // Simple validation
                    if (!email || !password) {
                        return [2 /*return*/, res.status(400).json({ msg: 'Please enter all fields' })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, User_1.default.findOne({ email: email })];
                case 2:
                    user = _b.sent();
                    if (!user)
                        throw Error('User Does not exist');
                    return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                case 3:
                    isMatch = _b.sent();
                    if (!isMatch)
                        throw Error('Invalid credentials');
                    createSendToken(user, 200, req, res);
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _b.sent();
                    res.status(400).json({ msg: e_3.message });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_4 = _b.sent();
                    console.log(e_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
// export async function loadUser(
//   req: Request,
//   res: Response
// ): Promise<Response | void> {
//   try {
//     const { email, password } = req.body;
//     // Simple validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }
//     try {
//       // Check for existing user
//       const user: any = await User.findOne({ email });
//       if (!user) throw Error('User Does not exist');
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) throw Error('Invalid credentials');
//       createSendToken(user, 200, req, res);
//     } catch (e) {
//       res.status(400).json({ msg: e.message });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
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
exports.restrictTo = restrictTo;
