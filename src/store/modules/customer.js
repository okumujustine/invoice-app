import { customerService } from "../../services/CustomerApi";

const state = {
  isModalVisible: false,
  isDeleteModalVisible: false,
  isEditModalVisible: false,
  customerToDelete: {
    id: null,
    name: null,
  },
  customerToEdit: {
    createdAt: null,
    id: null,
    address: null,
    avatar: null,
    name: null,
  },
  loading: false,
  addCustomerLoading: false,
  updateUserLoading: false,
  customers: [],
  error: null,
};

const getters = {
  getCustomers: (state) => {
    return state.customers;
  },
  getCustomerToDelete: (state) => {
    return state.customerToDelete;
  },
  getCustomerToEdit: (state) => {
    return state.customerToEdit;
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

  editCustomer({ commit }, customerToEdit) {
    commit("CUSTOMER_UPDATE_REQUEST");
    customerService
      .editCustomer(customerToEdit)
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
    state.customerToEdit.id = customer.id;
    state.customerToEdit.createdAt = customer.createdAt;

    state.customerToEdit.address = customer.address;
    state.customerToEdit.name = customer.name;
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
    state.customerToEdit.name = value;
  },

  UPDATE_CUSTOMER_ADDRESS: (state, value) => {
    state.customerToEdit.address = value;
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
};

export const customer = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
