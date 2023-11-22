const { v4: uuidv4 } = require("uuid"); //paquete para generar ids unicos
const fs = require("fs"); //import
// Inicializa products como un arreglo vacío.
class ProductManager {
  constructor(fileName) {
    this.path = fileName;
    //aqui iba un this.products = []
    if (fs.existsSync(this.path)) {
      try {
        let productFile = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(productFile);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  //agrega un producto
  async addProduct(title, description, price, thumbnail, code, stock) {
    //id autoincrementable
    const id = this.products.length + 1;
 
    if (
      !title ||
      !description ||
      price === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      console.log("Faltan propiedades o algunas son inválidas.");
      return;
    }
    // Validación de código no repetido
    const codeExists = this.isCodeRepeated(code);
    if (codeExists) {
      console.log("El código ya está en uso para otro producto.");
      return;
    }
    this.products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.id,
    });
    await this.saveFileProducts();
  }

  isCodeRepeated(code) {
    return this.products.some((product) => product.code === code);
  }

  //agregar metodo getProducts
  getProducts() {
    return this.products;
  }

  async saveFileProducts() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //get product by id
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return "Not found"; // Devuelve un mensaje en lugar de imprimirlo
    }
    return product;
  }

  async updateProduct(id, field, value) {
    try {
      // Encuentra el índice del producto con el id proporcionado
      const index = this.products.findIndex((product) => product.id === id);

      if (index !== -1) {
        // Actualiza el campo del producto con el nuevo valor
        this.products[index][field] = value;

        await this.saveFileProducts();
      } else {
        console.log("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
    }
  }
  async deleteProduct(id) {
    const productA = this.product.find((p) => p.id == id);

    if (productA) {
      const deleteProducts = this.product.filter((p) => p.id != id);

      this.products = deleteProducts;

      await this.saveFile();
    } else {
      console.log("[ERROR]");
    }
  }
}

const productManagerTest = new ProductManager("./pruebas.txt"); // instancia de la clase
console.log(productManagerTest.getProducts());
productManagerTest.updateProduct(1, "price", 25.99);
console.log(productManagerTest.updateProduct);