import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    zip: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    comissions: { type: Number, required: true },
    role: { type: String, required: true }
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserModel);

export default Users;
