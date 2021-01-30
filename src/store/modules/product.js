import { productService } from "../../services/ProductApi";

const state = {
  loading: false,
  products: [],
  error: null,
  isDeleteModalVisible: false,
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

  setProductToDelete({ commit }, product) {
    commit("SET_PRODUCT_TO_DELETE", product);
  },

  openDeleteModal({ commit }) {
    commit("OPEN_DELETE_MODAL");
  },
  closeDeleteModal({ commit }) {
    commit("CLOSE_DELETE_MODAL");
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
  CLOSE_DELETE_MODAL: (state) => {
    state.isDeleteModalVisible = false;
  },

  OPEN_DELETE_MODAL: (state) => {
    state.isDeleteModalVisible = true;
  },
};

export const product = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
