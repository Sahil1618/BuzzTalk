import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requires: [true, "Email is Requires"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required."],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) { //pre is a type of middleware
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();// this function tells the server that this is completed and lets procced
});

const User = mongoose.model("Users", userSchema);

export default User;