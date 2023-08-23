import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  detalle: String,
  precio: Number,
  stock: Number,
  img: String,
});

export const productModel = mongoose.model("products", productsSchema);
