"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var userController_1 = require("../controllers/userController");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.Router();
router.route('/register').post(authController_1.register);
router.route('/login').post(authController_1.login);
router.use(auth_1.default);
router.route('/getallusers').get(authController_1.restrictTo('admin'), userController_1.getAllUsers);
router.route('/loadUser').post(userController_1.loadUser);
exports.default = router;
