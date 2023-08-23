import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: Array
});

export const carttModel = mongoose.model("carts", cartSchema);

