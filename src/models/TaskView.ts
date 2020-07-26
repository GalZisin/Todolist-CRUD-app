import { Schema, model, Model, Document } from 'mongoose';
import * as mongoose from 'mongoose';

const TaskViewSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must belong to a User!'],
  },
  nameOfUser: {
    type: String,
    required: true,
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

// DO NOT export this
export interface ITaskViewSchema extends Document {
  user: Schema.Types.ObjectId;
  nameOfUser: string;
  title: string;
  description: string;
  createdAt: Date;
}
