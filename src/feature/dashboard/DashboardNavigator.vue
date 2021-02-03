<template>
  <div>
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
