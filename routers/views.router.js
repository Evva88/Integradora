import express from "express";
import ProductManager from "../dao/models/ProductManager.js";

const router = express.Router();
const PM = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await PM.getProducts();
    res.render("layouts/main", { products });
  } catch (err) {
    console.log("Error al cargar los productos:", err);
    res.status(500).send("Error al cargar los productos");
  }
});

router.get("/realtimeproducts", (req,res)=>{
  res.render("layouts/realtimeproducts");
});

router.get("/chat", (req, res) => {
  res.render("layouts/chat");
});

export default router;