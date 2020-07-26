import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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
const Task = model('Task', TaskSchema);
export default Task;
