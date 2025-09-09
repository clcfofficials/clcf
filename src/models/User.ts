import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password:  string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

export default models.User || model<IUser>('User', UserSchema);
