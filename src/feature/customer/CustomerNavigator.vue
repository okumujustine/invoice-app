<template>
  <div>
    <CustomerNavigation />
    <router-view />
  </div>
</template>

<script>
import CustomerNavigation from "./CustomerNavigation.vue";
export default {
  name: "CustomerNavigator",
  components: {
    CustomerNavigation,
  },
};
</script>
