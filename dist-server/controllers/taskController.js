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
exports.deleteMyTask = exports.deleteTask = exports.updateMyTask = exports.updateTask = exports.createTask = exports.getAllTasks = exports.getMyTasks = void 0;
var Task_1 = __importDefault(require("../models/Task"));
var User_1 = __importDefault(require("../models/User"));
var moment_1 = __importDefault(require("moment"));
// import { Schema, model, Model, Document } from 'mongoose';
// import * as mongoose from 'mongoose';
function getMyTasks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tw_1, tasksView_1, FcreatedAt, tasks, userObj_1, tasksViewJson, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    console.log('Run getMyTasks...');
                    console.log('User= ' + req.user.id);
                    tw_1 = null;
                    tasksView_1 = [];
                    FcreatedAt = null;
                    return [4 /*yield*/, Task_1.default.find({ user: req.user.id })];
                case 2:
                    tasks = _a.sent();
                    return [4 /*yield*/, User_1.default.findById(req.user.id)];
                case 3:
                    userObj_1 = _a.sent();
                    tasks.forEach(function (task) {
                        tw_1 = {};
                        tw_1._id = task._id;
                        tw_1.nameOfUser = userObj_1.name;
                        tw_1.user = task.user;
                        tw_1.title = task.title;
                        tw_1.description = task.description;
                        tw_1.createdAt = moment_1.default(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
                        tasksView_1.push(tw_1);
                    });
                    tasksViewJson = JSON.stringify(tasksView_1);
                    console.log('TaskView: ' + tasksViewJson);
                    console.log('after await tasks');
                    res.json(tasksView_1);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    res.status(400).json({ msg: e_1.message });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getMyTasks = getMyTasks;
function getAllTasks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tw_2, tasksView_2, nameOfUser_1, FcreatedAt, tasks, users_1, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    moment_1.default.locale('en');
                    tw_2 = null;
                    tasksView_2 = [];
                    nameOfUser_1 = null;
                    FcreatedAt = null;
                    return [4 /*yield*/, Task_1.default.find()];
                case 2:
                    tasks = _a.sent();
                    return [4 /*yield*/, User_1.default.find()];
                case 3:
                    users_1 = _a.sent();
                    tasks.forEach(function (task) {
                        tw_2 = {};
                        users_1.map(function (user) {
                            if (user._id.toString() == task.user.toString()) {
                                nameOfUser_1 = user.name;
                            }
                        });
                        tw_2._id = task._id;
                        tw_2.nameOfUser = nameOfUser_1;
                        tw_2.user = task.user;
                        tw_2.title = task.title;
                        tw_2.description = task.description;
                        tw_2.createdAt = moment_1.default(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
                        tasksView_2.push(tw_2);
                    });
                    if (!tasksView_2)
                        throw Error('No users exist');
                    console.log('TaskViewJson: ' + JSON.stringify(tasksView_2));
                    res.json(tasksView_2);
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    res.status(400).json({ msg: e_3.message });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getAllTasks = getAllTasks;
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tw, title, user, description, resTask, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('CreateTask req.data= ' + JSON.stringify(req.data));
                    console.log('CreateTask req.body= ' + JSON.stringify(req.body));
                    console.log('CreateTask req.user' + JSON.stringify(req.user));
                    tw = null;
                    tw = {};
                    title = req.body.title;
                    user = req.user.id;
                    description = req.body.description;
                    return [4 /*yield*/, Task_1.default.create({ user: user, title: title, description: description })];
                case 1:
                    resTask = _a.sent();
                    tw._id = resTask._id;
                    tw.nameOfUser = req.user.name;
                    tw.user = user;
                    tw.title = title;
                    tw.description = description;
                    tw.createdAt = moment_1.default(Date.now()).format('MMMM dddd Do YYYY, HH:mm');
                    console.log('response: ' + JSON.stringify(resTask));
                    resTask = tw;
                    res.status(200).json({ success: true, data: { resTask: resTask } });
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createTask = createTask;
function updateTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, e_6, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Task_1.default.findByIdAndUpdate(req.params.Id, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 2:
                    task = _a.sent();
                    if (!task)
                        throw Error('No item found');
                    res.status(200).json({ success: true, data: { task: task } });
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    res.status(404).json({ msg: e_6.message, success: false });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_7 = _a.sent();
                    console.log(e_7);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateTask = updateTask;
function updateMyTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, e_8, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Task_1.default.findById(req.params.Id)];
                case 2:
                    task = _a.sent();
                    if (!task)
                        throw Error('No item found');
                    console.log('userId= ' + req.user.id);
                    console.log('task.user = ' + task.user);
                    if (req.user.id != task.user) {
                        return [2 /*return*/, res.status(403).json({ msg: 'You do not have permission to perform this action' })];
                    }
                    return [4 /*yield*/, Task_1.default.findByIdAndUpdate(req.params.Id, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 3:
                    task = _a.sent();
                    res.status(200).json({ success: true, data: { task: task } });
                    return [3 /*break*/, 5];
                case 4:
                    e_8 = _a.sent();
                    res.status(404).json({ msg: e_8.message, success: false });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_9 = _a.sent();
                    console.log(e_9);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateMyTask = updateMyTask;
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, removed, e_10, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    console.log('run delete task');
                    console.log('param = ' + JSON.stringify(req.params.Id));
                    return [4 /*yield*/, Task_1.default.findById(req.params.Id)];
                case 2:
                    task = _a.sent();
                    if (!task)
                        throw Error('No item found');
                    return [4 /*yield*/, task.remove()];
                case 3:
                    removed = _a.sent();
                    if (!removed)
                        throw Error('Something went wrong while trying to delete the task');
                    res.status(200).json({ success: true });
                    return [3 /*break*/, 5];
                case 4:
                    e_10 = _a.sent();
                    res.status(400).json({ msg: e_10.message, success: false });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_11 = _a.sent();
                    console.log(e_11);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTask = deleteTask;
function deleteMyTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, removed, e_12, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Task_1.default.findById(req.params.Id)];
                case 2:
                    task = _a.sent();
                    if (!task)
                        throw Error('No item found');
                    if (req.user.id != task.user) {
                        return [2 /*return*/, res.status(403).json({ msg: 'You do not have permission to perform this action' })];
                    }
                    return [4 /*yield*/, task.remove()];
                case 3:
                    removed = _a.sent();
                    if (!removed)
                        throw Error('Something went wrong while trying to delete the task');
                    res.status(200).json({ success: true });
                    return [3 /*break*/, 5];
                case 4:
                    e_12 = _a.sent();
                    res.status(400).json({ msg: e_12.message, success: false });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_13 = _a.sent();
                    console.log(e_13);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMyTask = deleteMyTask;
