import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
});