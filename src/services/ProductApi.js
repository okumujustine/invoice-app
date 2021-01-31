import API from "./axios";

export const productService = {
  getAllProducts() {
    return API.get("/product").then((products) => {
      return products.data;
    });
  },
  deleteProduct(id) {
    return API.delete(`/product/${id}`).then((product) => {
      return product.data;
    });
  },
  addProduct(productData) {
    return API.post(`/product`, productData).then((product) => {
      return product.data;
    });
  },

  editProduct({ editedProductData, productId }) {
    return API.put(`/product/${productId}`, editedProductData).then(
      (editedProduct) => {
        return editedProduct.data;
      }
    );
  },
};
