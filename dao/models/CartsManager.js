import { carttModel } from "./cart.model.js";

class CartManager {
   async newCart() {
    await carttModel.create({products:[]});
    console.log ("cart creaded!");

    return true;
   }
    
   async getCart(id) {
        if (this.validateId(id)){
            return await carttModel.findOne({_id:id}).lean() || null;
        } else {
            console.log("not found!");
            return null;
        }
    }
   
    validateId(id) {
        return id.length === 24 ? true : false;
    }  

    async getCarts() {
        return await carttModel.find().lean();
    }
    
    async addProductToCart(cid, pid) {
        try {
            if (this.validateId(cid)) {
                const cart = await this.getCart(cid);
                const product = cart.products.find(item => item.product === pid);

                if (product) {
                    product.quantity+= 1;
                } else {
                    cart.products.push({product:pid, quantity:1});
                }

                await carttModel.updateOne({_id:cid}, {products:cart.products});
                console.log("Product added!");
    
                return true;
            } else {
                console.log("Not found!");
                
                return false;
            }
        } catch (error) {
            return false
        }
    }
    }

    export default CartManager;