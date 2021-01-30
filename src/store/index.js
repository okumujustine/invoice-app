import Vue from "vue";
import Vuex from "vuex";
import { customer } from "./modules/customer";
import { product } from "./modules/product";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    customer,
    product,
  },
});
