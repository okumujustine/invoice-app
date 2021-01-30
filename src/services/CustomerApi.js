import API from "./axios";

export const customerService = {
  getAllCustomers() {
    return API.get("/customer").then((customers) => {
      return customers.data.items;
    });
  },
  deleteCustomer(id) {
    return API.delete(`/customer/${id}`).then((customer) => {
      return customer.data;
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
