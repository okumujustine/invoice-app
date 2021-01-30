<template>
  <div>
    <ProductNavigation />
    <router-view />
  </div>
</template>

<script>
import ProductNavigation from "./ProductNavigation.vue";
export default {
  name: "ProductNavigator",
  components: {
    ProductNavigation,
  },
};
</script>
