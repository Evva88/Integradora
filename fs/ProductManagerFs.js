import fs from "fs";
import path from 'path';


class ProductManagerFs {
  constructor() {
    this.products = [];
    this.path = "./dao/models/Products.json";
    this.loadProducts();
    
  }


  validateRequiredFields(fields) {
    for (const field of fields) {
      if (!field.value) {
        throw new Error(`${field.name} es requerido`);
      }
    }
  }

  getProducts = async () => {
    const data = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(data);
    return this.products;
  };

  getId() {
    let max = 0;
    this.products.forEach((item) => {
      if (item.id > max) {
        max = item.id;
      }
    });
    return max + 1;
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error.message);
      this.products = [];
    }
  }


  async addProduct(newProduct) {
    const fields = [
      { name: "nombre", value: newProduct.nombre },
      { name: "detalle", value: newProduct.detalle },
      { name: "precio", value: newProduct.precio },
      { name: "img", value: newProduct.img,},
      { name: "codigo", value: newProduct.codigo },
      { name: "stock", value: newProduct.stock },
    ];

    try {
      this.validateRequiredFields(fields);
    } catch (error) {
      console.error("Error de validación:", error.message);
      throw error;
    }

    const productExists = this.products.find(
      (product) => product.code === newProduct.codigo
    );

    if (productExists) {
      console.error("El código ya existe", productExists.codigo);
      throw new Error("El código del producto ya existe");
    }

    const id = this.getId();

    if (newProduct.status === undefined) {
      newProduct.status = true;
    }

    const product = {
      nombre: newProduct.nombre,
      detalle: newProduct.detalle,
      precio: newProduct.precio,
      img: newProduct.img,
      codigo: newProduct.codigo,
      stock: newProduct.stock,
      status: newProduct.status,
      id: id,
    };

    this.products.push(product);
    this.saveProducts();
    console.log("Producto agregado", product);
  }

  async getProductsById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);

      const existentProduct = this.products.find((prod) => prod.id === id);

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

  async deleteProduct(id) {
    const data = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(data);

    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      console.log("No se encontró ningún producto con ese ID", id);
      throw new Error("Producto no encontrado");
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
    console.log("Producto eliminado", id);
  }


  async updateProduct(id, updatedFields) {
    const data = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(data);

    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex > -1) {
      Object.assign(this.products[productIndex], updatedFields);
      this.saveProducts();
      console.log("Producto actualizado", this.products[productIndex]);
    } else {
      console.log("No se encontró ningún producto con ese ID", id);
      throw new Error("Producto no encontrado");
    }
  }

  async saveProducts() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );
  }
}


  

export default ProductManagerFs;