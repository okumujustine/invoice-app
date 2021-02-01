import API from "./axios";

export const invoiceService = {
  getAllInvoices() {
    return API.get("/invoice").then((invoices) => {
      return invoices.data.items;
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
