<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div>Direction</div>
      <p>Get a direction with your favourite apps</p>
      <input v-model="product.product_name" type="text" placeholder="name" />
      <br />
      <input v-model="product.product_price" type="text" placeholder="price" />
      <br />
      <input type="file" @change="onFileChanged" />
      <br />
      <button @click="submit" class="mt-3 border-b border-teal font-semibold">
        {{ addProductLoading ? "Adding Product ..." : "Add Product" }}
      </button>
      <button @click="close" class="mt-3 border-b border-teal font-semibold">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddProductModal",
  data() {
    return {
      product: {
        product_name: "",
        product_price: "",
        img: "",
      },
    };
  },
  computed: {
    ...mapState("product", {
      addProductLoading: (state) => state.addProductLoading,
    }),
  },
  methods: {
    onFileChanged(event) {
      this.product.img = event.target.files[0];
    },
    close() {
      this.$emit("close");
    },
    submit() {
      const formData = new FormData();
      formData.append("img", this.product.img, this.product.img.name);

      const img =
        "https://s3.amazonaws.com/uifaces/faces/twitter/craighenneberry/128.jpg";

      this.$emit("submit", this.product, img);
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
