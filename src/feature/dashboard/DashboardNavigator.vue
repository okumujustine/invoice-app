<template>
  <div>
    <DashboardNavigation />
    <router-view />
  </div>
</template>

<script>
import DashboardNavigation from "./DashboardNavigation.vue";
export default {
  components: {
    DashboardNavigation,
  },
};
</script>
