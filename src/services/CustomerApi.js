import API from "./axios";

export const customerService = {
  getOneCustomer(customerId) {
    return API.get(`/customer/${customerId}`).then((customer) => {
      return customer.data;
    });
  },
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

  getCustomerInvoices(customerId) {
    return API.get(`/customer/${customerId}/invoice`).then(
      (customerInvoices) => {
        return customerInvoices.data;
      }
    );
  },

  getCustomerInvoice({ currentCustomerId, currentInvoiceId }) {
    return API.get(
      `/customer/${currentCustomerId}/invoice/${currentInvoiceId}/invoice_item`
    ).then((invoiceItems) => {
      return invoiceItems.data;
    });
  },

  addInvoiceItem(customerId, invoiceId, itemToSubmit) {
    return API.post(
      `/customer/${customerId}/invoice/${invoiceId}/invoice_item`,
      itemToSubmit
    ).then((invoiceItems) => {
      return invoiceItems.data;
    });
  },
};
