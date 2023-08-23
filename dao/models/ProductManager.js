import { productModel } from "./products.model.js";
import mongoose from "mongoose";

class ProductManager {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    try {
      return await productModel.find({}).lean();
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      return [];
    }
  }

  async getProductsById(id) {
    try {
      const existentProduct = await productModel.findOne({ _id: id }).lean();
  
      if (!existentProduct) {
        console.log(
          `Not Found: El producto con el id ${id} no existe en nuestra base de datos`
        );
      } else {
        console.log(
          `El producto con el id ${id} fue encontrado en nuestra base de datos`
        );
        return existentProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  async addProduct(newProduct) {
    try {
      const createdProduct = await productModel.create(newProduct);
      console.log("Producto agregado", createdProduct);
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
      throw error;
    }
  }

  async validateCode(code) {
    try {
      const validateProduct = await productModel.findOne({ code: code }).lean();

      if (!validateProduct) {
        console.log(`Not Found: Error al validar`);
      } else {
        console.log(
          `El producto con el code ${code} fue encontrado en nuestra base de datos`
        );
        return validateProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, product) {
    try {
      if (!this.validateId(id)) {
        return { success: false, message: "ID inválido" };
      }

      const existingProduct = await this.getProductsById(id);

      if (!existingProduct) {
        return { success: false, message: "Producto no encontrado" };
      }

      await productModel.updateOne({ _id: id }, product);
      console.log("Producto actualizado");

      return { success: true, message: "Producto actualizado exitosamente" };
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return { success: false, message: "Error al actualizar el producto" };
    }
  }

  validateId(id) {
    return mongoose.isValidObjectId(id);
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        console.log("Producto no encontrado");
        throw new Error("Producto no encontrado");
      }
      console.log("Producto eliminado", deletedProduct);
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      throw error;
    }
  }
}

export default ProductManager;
