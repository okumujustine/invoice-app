<template>
  <div>
    <button style="marginbottom: 50px" @click="openAddModal">
      Add Product
    </button>
    <AddProductModal
      v-show="this.isAddModalVisible"
      @close="closeAddModal"
      @submit="submitProduct"
    />

    <DeleteModal
      @onDelete="onDeleteProduct"
      v-show="this.isDeleteModalVisible"
      @close="closeDeleteModal"
      :name-title="productToDelete.product_name"
    />

    <EditProductModal
      v-show="this.isEditModalVisible"
      @close="closeEditModal"
      @submit="submitEditedProduct"
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
            <button @click="openEditModal(product)">EDIT</button>
          </div>
          <div>
            <button @click="openDeleteModal(product)">DELETE</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.products.length === 0 && !loading">
      <div>no product found</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import _ from "lodash";

import DeleteModal from "../../../components/DeleteModal.vue";
import EditProductModal from "../components/EditProductModal.vue";
import AddProductModal from "../components/AddProductModal.vue";

export default {
  name: "ListProduct",
  components: {
    DeleteModal,
    EditProductModal,
    AddProductModal,
  },
  computed: {
    ...mapState("product", {
      products: (state) => state.products,
      loading: (state) => state.loading,
      productToDelete: (state) => state.productToDelete,
      isDeleteModalVisible: (state) => state.isDeleteModalVisible,
      isEditModalVisible: (state) => state.isEditModalVisible,
      isAddModalVisible: (state) => state.isAddModalVisible,
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
      onOpenEditModal: "openEditModal",
      onCloseEditModal: "closeEditModal",
      setProductToEdit: "setProductToEdit",
      onEditProduct: "editProduct",
      onOpenAddModal: "openAddModal",
      onCloseAddModal: "closeAddModal",
      onAddProduct: "addProduct",
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

    openEditModal(product) {
      this.setProductToEdit(product);
      this.onOpenEditModal();
    },

    closeEditModal() {
      this.onCloseEditModal();
    },

    openAddModal() {
      this.onOpenAddModal();
    },

    closeAddModal() {
      this.onCloseAddModal();
    },

    submitProduct(product, img) {
      const productData = {
        product_price: product.product_price,
        img: img,
        product_name: _.upperFirst(product.product_name),
        createdAt: new Date(Date.now()).toISOString(),
        id: parseInt(this.products[0].id, 10) + 1,
      };
      this.onAddProduct(productData);
    },

    submitEditedProduct(editedProduct, img) {
      const editedProductData = {
        product_price: editedProduct.product_price,
        img: img,
        product_name: _.upperFirst(editedProduct.product_name),
        createdAt: editedProduct.createdAt,
      };

      this.onEditProduct({
        editedProductData,
        productId: editedProduct.id,
      });
    },
  },
};
</script>
