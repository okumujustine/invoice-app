<template>
  <div>
    <!-- <div
      v-if="this.error"
      style="z-index:100; width:50px, height:70px; border:1px solid red;"
    >
      <p>{{ this.error }}</p>
    </div> -->
    <DashboardNavigation />
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

import DashboardNavigation from "./DashboardNavigation.vue";

export default {
  components: {
    DashboardNavigation,
  },

  computed: {
    ...mapState("customer", {
      error: (state) => state.error,
    }),
  },
};
</script>
