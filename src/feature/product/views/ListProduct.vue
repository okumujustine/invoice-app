<template>
  <div>
    <span class="hidden sm:block my-3">
      <button
        @click="openAddModal"
        type="button"
        class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-800 sm:w-auto sm:text-sm focus:outline-none"
      >
        <svg
          class="fill-current text-white w-4 h-4 mr-2"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m256 0c-141.16 0-256 114.84-256 256s114.84 256 256 256 256-114.84 256-256-114.84-256-256-256zm112 277.33h-90.668v90.668c0 11.777-9.5547 21.332-21.332 21.332s-21.332-9.5547-21.332-21.332v-90.668h-90.668c-11.777 0-21.332-9.5547-21.332-21.332s9.5547-21.332 21.332-21.332h90.668v-90.668c0-11.777 9.5547-21.332 21.332-21.332s21.332 9.5547 21.332 21.332v90.668h90.668c11.777 0 21.332 9.5547 21.332 21.332s-9.5547 21.332-21.332 21.332z"
          />
        </svg>
        Add Product
      </button>
    </span>
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

    <div v-for="product in this.products" class="row" v-bind:key="product.id">
      <div
        class="lg:flex lg:items-center lg:justify-between py-3 px-2 border-t border-gray-300"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0 h-14 w-14 mr-2">
            <img
              class="h-14 w-14 rounded-sm"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
              alt=""
            />
          </div>
          <p>{{ product.product_name }}</p>
        </div>
        <div class="mt-5 flex lg:mt-0 lg:ml-4">
          <div>
            <span class="hidden sm:block">
              <button
                @click="openEditModal(product)"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg
                  class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
                Edit
              </button>
            </span>
          </div>
          <div>
            <span class="hidden sm:block ml-3">
              <button
                @click="openDeleteModal(product)"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:text-white hover:bg-red-600 focus:outline-none"
              >
                <svg
                  class="-ml-1 mr-2 h-5 w-5 text-red"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </span>
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
