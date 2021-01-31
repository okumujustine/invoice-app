import { productService } from "../../services/ProductApi";

const state = {
  loading: false,
  products: [],
  error: null,
  isDeleteModalVisible: false,
  isEditModalVisible: false,
  updateProductLoading: false,
  isAddModalVisible: false,
  addProductLoading: false,
  productToEdit: {
    img: null,
    product_price: null,
    product_name: null,
    createdAt: null,
    id: null,
  },
  productToDelete: {
    id: null,
    product_name: null,
  },
};

const getters = {};

const actions = {
  getAll({ commit }) {
    commit("GET_REQUEST");
    productService
      .getAllProducts()
      .then((products) => commit("GET_PRODUCTS_SUCCESS", products.reverse()))
      .catch((error) => commit("GET_PRODUCTS_FAILED", error));
  },

  deleteOneProduct({ commit }, productId) {
    productService
      .deleteProduct(productId)
      .then((product) => commit("DELETE_PRODUCT_SUCCESS", product));
  },

  editProduct({ commit }, productToEdit) {
    commit("PRODUCT_UPDATE_REQUEST");
    productService
      .editProduct(productToEdit)
      .then((editedProduct) => commit("PRODUCT_EDIT_SUCCESS", editedProduct));
  },

  addProduct({ commit }, productData) {
    commit("PRODUCT_ADD_REQUEST");
    productService
      .addProduct(productData)
      .then((product) => commit("ADD_PRODUCT_SUCCESS", product));
  },

  setProductToDelete({ commit }, product) {
    commit("SET_PRODUCT_TO_DELETE", product);
  },

  setProductToEdit({ commit }, product) {
    commit("SET_PRODUCT_TO_EDIT", product);
  },

  updateProductName: ({ commit }, value) => {
    commit("UPDATE_PRODUCT_NAME", value);
  },

  updateProductPrice: ({ commit }, value) => {
    commit("UPDATE_PRODUCT_PRICE", value);
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

  openAddModal({ commit }) {
    commit("OPEN_ADD_MODAL");
  },

  closeAddModal({ commit }) {
    commit("CLOSE_ADD_MODAL");
  },
};

const mutations = {
  GET_REQUEST: (state) => {
    state.loading = true;
  },

  GET_PRODUCTS_SUCCESS: (state, products) => {
    state.products = products;
    state.loading = false;
  },

  GET_PRODUCTS_FAILED: (state, error) => {
    state.error = error;
    state.loading = false;
  },

  SET_PRODUCT_TO_DELETE: (state, product) => {
    state.productToDelete.id = product.id;
    state.productToDelete.product_name = product.product_name;
  },

  DELETE_PRODUCT_SUCCESS: (state, product) => {
    state.products.splice(
      state.products.map((product) => product.id).indexOf(product.id),
      1
    );
    state.isDeleteModalVisible = false;
  },

  UPDATE_PRODUCT_NAME: (state, value) => {
    state.productToEdit.product_name = value;
  },

  UPDATE_PRODUCT_PRICE: (state, value) => {
    state.productToEdit.product_price = value;
  },

  PRODUCT_UPDATE_REQUEST: (state) => {
    state.updateProductLoading = true;
  },

  PRODUCT_EDIT_SUCCESS: (state, editedProduct) => {
    state.products = [
      editedProduct,
      ...state.products.filter((product) => product.id !== editedProduct.id),
    ];
    state.isEditModalVisible = false;
  },

  OPEN_EDIT_MODAL: (state) => {
    state.isEditModalVisible = true;
  },

  CLOSE_EDIT_MODAL: (state) => {
    state.isEditModalVisible = false;
  },

  SET_PRODUCT_TO_EDIT: (state, product) => {
    state.productToEdit.id = product.id;
    state.productToEdit.createdAt = product.createdAt;

    state.productToEdit.product_price = product.product_price;
    state.productToEdit.product_name = product.product_name;
    state.productToEdit.img = product.img;
  },

  PRODUCT_ADD_REQUEST: (state) => {
    state.addProductLoading = true;
  },

  ADD_PRODUCT_SUCCESS: (state, product) => {
    state.products.unshift(product);
    state.isAddModalVisible = false;
    state.addProductLoading = false;
  },

  CLOSE_DELETE_MODAL: (state) => {
    state.isDeleteModalVisible = false;
  },

  OPEN_DELETE_MODAL: (state) => {
    state.isDeleteModalVisible = true;
  },

  OPEN_ADD_MODAL: (state) => {
    state.isAddModalVisible = true;
  },

  CLOSE_ADD_MODAL: (state) => {
    state.isAddModalVisible = false;
  },
};

export const product = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
