<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div>Edit user details</div>
      <input v-model="productName" type="text" placeholder="name" />
      <br />
      <input v-model="productPrice" type="number" placeholder="price" />
      <br />
      <input type="file" @change="onFileChanged" />
      <br />
      <button @click="submit" class="mt-3 border-b border-teal font-semibold">
        Edit Product
      </button>
      <button @click="close" class="mt-3 border-b border-teal font-semibold">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EditProductModal",
  computed: {
    ...mapState("product", {
      productToEdit: (state) => state.productToEdit,
    }),
    productName: {
      get() {
        return this.$store.state.product.productToEdit.product_name;
      },
      set(value) {
        this.updateProductName(value);
      },
    },
    productPrice: {
      get() {
        return this.$store.state.product.productToEdit.product_price;
      },
      set(value) {
        this.updateProductPrice(value);
      },
    },
  },
  methods: {
    ...mapActions("product", ["updateProductName", "updateProductPrice"]),
    onFileChanged(event) {
      this.product.img = event.target.files[0];
    },
    close() {
      this.$emit("close");
    },
    submit() {
      //   const formData = new FormData();

      const img =
        "https://s3.amazonaws.com/uifaces/faces/twitter/craighenneberry/128.jpg";

      this.$emit("submit", this.productToEdit, img);
    },
  },
};
</script>

<style lang="css" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 20px;
  background: #ffffff;
}
</style>
