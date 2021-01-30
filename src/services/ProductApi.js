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
  addCustomer(customerData) {
    return API.post(`/customer`, customerData).then((customer) => {
      return customer.data;
    });
  },

  editCustomer({ customerCustomerData, customerId }) {
    return API.put(`/customer/${customerId}`, customerCustomerData).then(
      (editedCustomer) => {
        return editedCustomer.data;
      }
    );
  },
};
