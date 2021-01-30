import Vue from "vue";
import Vuex from "vuex";
import { customer } from "./modules/customer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    customer,
  },
});
