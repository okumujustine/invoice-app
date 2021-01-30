<template>
  <div>
    <div style="marginBottom: 50px;">cool</div>
    <DeleteModal
      @onDelete="onDeleteProduct"
      v-show="this.isDeleteModalVisible"
      @close="closeDeleteModal"
      :name-title="productToDelete.product_name"
    />
    <div v-if="loading">Loading products...</div>
    <div v-for="product in this.products" class="row" v-bind:key="product.id">
      <hr />
      <div>
        <div>
          <p>{{ product.product_name }}</p>
        </div>
        <div>
          <div>
            <button>EDIT</button>
          </div>
          <div>
            <button @click="openDeleteModal(product)">DELETE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DeleteModal from "../../../components/DeleteModal";

export default {
  name: "ListProduct",
  components: {
    DeleteModal,
  },
  computed: {
    ...mapState("product", {
      products: (state) => state.products,
      loading: (state) => state.loading,
      isDeleteModalVisible: (state) => state.isDeleteModalVisible,
      productToDelete: (state) => state.productToDelete,
    }),
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    ...mapActions("product", {
      getAllProducts: "getAll",
      deleteProduct: "deleteOneProduct",
      onOpenDeleteModal: "openDeleteModal",
      onCloseDeleteModal: "closeDeleteModal",
      setProductToDelete: "setProductToDelete",
    }),

    openDeleteModal(product) {
      this.setProductToDelete(product);
      this.onOpenDeleteModal();
    },
    closeDeleteModal() {
      this.onCloseDeleteModal();
    },

    onDeleteProduct() {
      this.deleteProduct(this.productToDelete.id);
    },
  },
};
</script>
