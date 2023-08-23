import { Router } from "express";
import CartsManager from "../dao/models/CartsManager.js";


const cartRouter = Router();
const CM = new CartsManager

cartRouter.post("/", async(req,res)=>{
  const newCart = await CM.newCart();

  if (newCart) {
    res.send({status: "ok", message: "el carrito se creo correctamente"});
  } else {
    res.status(500).send({status: "error", message: "no se puede crear el carrito"});
}
});

cartRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCart(cid);

  if (cart) {
    res.send({ products: cart.products });
  } else {
    res.status(400).send({ status: "error", message: "no se encuentra id en el carrito" });
  }
});


cartRouter.post("/:cid/products/:pid", async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await CM.addProductToCart(cid, pid);

  if (result) {
    res.send({status: "ok", message: "el producto se agrego crrectamente!"});
  } else {
    res.status(400).send ({status:"error", message: "error! no se puede agregar el producto"})
  }
  
});


export default cartRouter;