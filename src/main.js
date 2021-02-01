import Vue from "vue";
import moment from "vue-moment";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(moment);
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
