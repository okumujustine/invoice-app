import Vue from "vue";
import Vuex from "vuex";
import { customer } from "./modules/customer";
import { product } from "./modules/product";
import { dashboard } from "./modules/dashboard";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dashboard,
    customer,
    product,
  },
});
