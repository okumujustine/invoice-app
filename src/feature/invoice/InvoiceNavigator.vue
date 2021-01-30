<template>
  <div>
    <InvoiceNavigation />
    <router-view />
  </div>
</template>

<script>
import InvoiceNavigation from "./InvoiceNavigation.vue";
export default {
  components: {
    InvoiceNavigation,
  },
};
</script>
