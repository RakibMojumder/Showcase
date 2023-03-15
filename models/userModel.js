import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    email: { type: String, require: true, unique: true, trim: true },

    password: { type: String, require: true },

    profileImage: { type: String },

    phone: { type: String, required: true, unique: true, trim: true },

    gender: { type: String, enum: ["male", "female"], required: true },

    address: { type: String, required: true, trim: true },

    latitude: { type: Number, default: -1 },

    longitude: { type: Number, default: -1 },

    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    purchasedProd: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]


}, { timestamps: true });

const Users = new mongoose.model('users', userSchema);

export default Users;