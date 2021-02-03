import { customerService } from "../../services/CustomerApi";
import _ from "lodash";

const state = {
  customers: [],
  customerInvoices: [],
  customerInvoice: [],
  invoiceItems: [],
  customerToDelete: {
    id: null,
    name: null,
  },
  customer: {
    createdAt: null,
    id: null,
    address: null,
    avatar: null,
    name: null,
  },
  loading: false,
  addCustomerLoading: false,
  updateUserLoading: false,
  customerInvoicesLoading: false,
  customerInvoiceLoading: false,
  invoiceItemsLoading: false,
  addInvoiceItemsLoading: false,
  error: null,
  isModalVisible: false,
  isDeleteModalVisible: false,
  isEditModalVisible: false,
};

const getters = {
  getCustomers: (state) => {
    return state.customers;
  },
  getCustomerToDelete: (state) => {
    return state.customerToDelete;
  },
  getCustomerToEdit: (state) => {
    return state.customer;
  },
};

const actions = {
  getAll({ commit }) {
    commit("GET_REQUEST");
    customerService
      .getAllCustomers()
      .then((customers) => commit("GET_CUSTOMERS_SUCCESS", customers.reverse()))
      .catch((error) => {
        alert(error.message);
        commit("GET_CUSTOMERS_FAILED", error.message);
      });
  },

  deleteOneCustomer({ commit }, customerId) {
    customerService
      .deleteCustomer(customerId)
      .then((customer) => commit("DELETE_CUSTOMER_SUCCESS", customer));
  },

  addUser({ commit }, customerData) {
    commit("CUSTOMER_ADD_REQUEST");
    customerService
      .addCustomer(customerData)
      .then((customer) => commit("ADD_CUSTOMER_SUCCESS", customer));
  },

  editCustomer({ commit }, customer) {
    commit("CUSTOMER_UPDATE_REQUEST");
    customerService
      .editCustomer(customer)
      .then((editedCustomer) =>
        commit("CUSTOMER_EDIT_SUCCESS", editedCustomer)
      );
  },

  setCustomerToEdit({ commit }, customer) {
    commit("SET_CUSTOMER_TO_EDIT", customer);
  },

  setCustomerToDelete({ commit }, customer) {
    commit("SET_CUSTOMER_TO_DELETE", customer);
  },

  updateCustomerName: ({ commit }, value) => {
    commit("UPDATE_CUSTOMER_NAME", value);
  },

  updateCustomerAddress: ({ commit }, value) => {
    commit("UPDATE_CUSTOMER_ADDRESS", value);
  },

  openModal({ commit }) {
    commit("OPEN_MODAL");
  },

  closeModal({ commit }) {
    commit("CLOSE_MODAL");
  },

  openDeleteModal({ commit }) {
    commit("OPEN_DELETE_MODAL");
  },

  closeDeleteModal({ commit }) {
    commit("CLOSE_DELETE_MODAL");
  },

  openEditModal({ commit }) {
    commit("OPEN_EDIT_MODAL");
  },

  closeEditModal({ commit }) {
    commit("CLOSE_EDIT_MODAL");
  },

  getOneCustomer({ commit }, customerId) {
    customerService
      .getOneCustomer(customerId)
      .then((customer) => commit("GET_ONE_CUSTOMER_SUCCESS", customer));
  },
  getCustomerInvoices({ commit }, customerId) {
    commit("GET_CUSTOMER_INVOICES_REQUEST");
    customerService
      .getCustomerInvoices(customerId)
      .then((customerInvoices) =>
        commit("GET_CUSTOMER_INVOICES_SUCCESS", customerInvoices)
      );
  },

  getCustomerInvoice({ commit }, userInvoiceData) {
    commit("GET_CUSTOMER_INVOICE_REQUEST");
    customerService
      .getCustomerInvoices(userInvoiceData)
      .then((customerInvoice) =>
        commit("GET_CUSTOMER_INVOICE_SUCCESS", customerInvoice)
      );
  },

  getInvoiceItems({ commit }, userInvoiceData) {
    commit("GET_INVOICE_ITEMS_REQUEST");
    customerService
      .getCustomerInvoice(userInvoiceData)
      .then((invoicesItems) =>
        commit("GET_INVOICE_ITEMS_SUCCESS", invoicesItems)
      );
  },

  async submitItem({ commit }, { item, customerInvoice }) {
    commit("ADD_INVOICE_ITEM_REQUEST");
    const invoiceId = customerInvoice[0].id;
    const customerId = customerInvoice[0].customerId;

    const itemToSubmit = {
      id: Date.now(),
      invoiceId: invoiceId,
      createdAt: new Date(Date.now()).toISOString(),
      item_name: _.upperFirst(item.name),
      item_price: item.price,
      quantity: item.quantity,
    };

    customerService
      .addInvoiceItem(customerId, invoiceId, itemToSubmit)
      .then((invoicesItem) => {
        commit("ADD_INVOICE_ITEM_SUCCESS", invoicesItem);
      });
  },
};

const mutations = {
  GET_REQUEST: (state) => {
    state.loading = true;
  },

  GET_CUSTOMERS_SUCCESS: (state, customers) => {
    state.customers = customers;
    state.loading = false;
    state.error = null;
  },

  GET_CUSTOMERS_FAILED: (state, error) => {
    state.error = error;
    state.loading = false;
  },

  DELETE_CUSTOMER_SUCCESS: (state, customer) => {
    state.customers.splice(
      state.customers.map((customer) => customer.id).indexOf(customer.id),
      1
    );
    state.isDeleteModalVisible = false;
  },

  SET_CUSTOMER_TO_DELETE: (state, customer) => {
    state.customerToDelete.id = customer.id;
    state.customerToDelete.name = customer.name;
  },

  SET_CUSTOMER_TO_EDIT: (state, customer) => {
    state.customer.id = customer.id;
    state.customer.createdAt = customer.createdAt;

    state.customer.address = customer.address;
    state.customer.name = customer.name;
  },

  CUSTOMER_ADD_REQUEST: (state) => {
    state.addCustomerLoading = true;
  },

  ADD_CUSTOMER_SUCCESS: (state, customer) => {
    state.customers.unshift(customer);
    state.isModalVisible = false;
    state.addCustomerLoading = false;
  },

  OPEN_MODAL: (state) => {
    state.isModalVisible = true;
  },
  CLOSE_MODAL: (state) => {
    state.isModalVisible = false;
  },

  OPEN_DELETE_MODAL: (state) => {
    state.isDeleteModalVisible = true;
  },

  CLOSE_DELETE_MODAL: (state) => {
    state.isDeleteModalVisible = false;
  },

  OPEN_EDIT_MODAL: (state) => {
    state.isEditModalVisible = true;
  },

  CLOSE_EDIT_MODAL: (state) => {
    state.isEditModalVisible = false;
  },

  UPDATE_CUSTOMER_NAME: (state, value) => {
    state.customer.name = value;
  },

  UPDATE_CUSTOMER_ADDRESS: (state, value) => {
    state.customer.address = value;
  },

  CUSTOMER_UPDATE_REQUEST: (state) => {
    state.updateUserLoading = true;
  },

  CUSTOMER_EDIT_SUCCESS: (state, editedCustomer) => {
    state.customers = [
      editedCustomer,
      ...state.customers.filter(
        (customer) => customer.id !== editedCustomer.id
      ),
    ];
    state.isEditModalVisible = false;
  },

  GET_CUSTOMER_INVOICES_REQUEST: (state) => {
    state.customer = [];
    state.customerInvoicesLoading = true;
  },

  GET_CUSTOMER_INVOICES_SUCCESS: (state, customerInvoices) => {
    state.customerInvoices = customerInvoices;
    state.customerInvoicesLoading = false;
  },

  GET_CUSTOMER_INVOICE_REQUEST: (state) => {
    state.customerInvoiceLoading = true;
  },

  GET_CUSTOMER_INVOICE_SUCCESS: (state, customerInvoice) => {
    state.customerInvoice = customerInvoice;
    state.customerInvoiceLoading = false;
  },

  GET_ONE_CUSTOMER_SUCCESS: (state, customer) => {
    state.customer = customer;
  },

  GET_INVOICE_ITEMS_REQUEST: (state) => {
    state.invoiceItemsLoading = true;
  },

  GET_INVOICE_ITEMS_SUCCESS: (state, invoicesItems) => {
    state.invoiceItemsLoading = false;
    state.invoiceItems = invoicesItems;
  },

  ADD_INVOICE_ITEM_REQUEST: (state) => {
    state.addInvoiceItemsLoading = true;
  },

  ADD_INVOICE_ITEM_SUCCESS: (state, submitedItem) => {
    state.invoiceItems.push(submitedItem);
  },
};

export const customer = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
