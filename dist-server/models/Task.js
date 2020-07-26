"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TaskSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a User!'],
    },
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var Task = mongoose_1.model('Task', TaskSchema);
exports.default = Task;
