<template>
  <div>
    <span class="block my-3">
      <button
        class="inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-800 sm:w-auto sm:text-sm focus:outline-none"
        @click="openModal"
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
        Add User
      </button>
    </span>
    <AddCustomerModal
      v-show="this.isModalVisible"
      @close="closeModal"
      @submit="submitCustomer"
    />
    <DeleteModal
      @onDelete="onDeleteCustomer"
      v-show="this.isDeleteModalVisible"
      @close="closeDeleteModal"
      :name-title="customerToDelete.name"
    />
    <EditCustomerModal
      v-show="this.isEditModalVisible"
      @close="closeEditModal"
      @submit="submitEditedCustomer"
    />

    <div v-for="customer in customers" v-bind:key="customer.id">
      <div
        class="lg:flex lg:items-center md:flex md:items-center md:justify-between lg:justify-between py-3 px-2 border-t border-gray-300"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0 h-14 w-14 mr-2">
            <img
              class="h-14 w-14 rounded-lg"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
              alt=""
            />
          </div>
          <div class="flex flex-col">
            <h2>{{ customer.name }}</h2>
            <p>{{ customer.address }}</p>
          </div>
        </div>
        <div class="mt-5 flex lg:mt-0 lg:ml-4">
          <div>
            <span class="block">
              <button
                @click="openEditModal(customer)"
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
            <span class="block ml-3">
              <button
                @click="openDeleteModal(customer)"
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
          <div>
            <span class="block ml-3">
              <router-link
                :to="`/customer/${customer.id}/invoice/`"
                class="btn btn-sm show"
              >
                <button
                  class="inline-flex items-center px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:text-white hover:bg-green-600 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  INVOICE
                </button>
              </router-link>
            </span>
          </div>
        </div>
      </div>

      <!-- 
              -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import DeleteModal from "../../../components/DeleteModal";
import _ from "lodash";

export default {
  name: "ListCustomer",

  components: {
    AddCustomerModal,
    DeleteModal,
    EditCustomerModal,
  },

  computed: {
    ...mapState("customer", {
      customers: (state) => state.customers,
      isDeleteModalVisible: (state) => state.isDeleteModalVisible,
      isModalVisible: (state) => state.isModalVisible,
      isEditModalVisible: (state) => state.isEditModalVisible,
      customerToDelete: (state) => state.customerToDelete,
    }),
  },

  created() {
    this.getAllCustomers();
  },

  methods: {
    ...mapActions("customer", {
      getAllCustomers: "getAll",
      deleteCustomer: "deleteOneCustomer",
      setCustomerToDelete: "setCustomerToDelete",
      setCustomerToEdit: "setCustomerToEdit",
      onOpenModal: "openModal",
      onCloseModal: "closeModal",
      onCloseDeleteModal: "closeDeleteModal",
      onOpenDeleteModal: "openDeleteModal",
      onAddUser: "addUser",
      onOpenEditModal: "openEditModal",
      onCloseEditModal: "closeEditModal",
      onEditCustomer: "editCustomer",
    }),
    openModal() {
      this.onOpenModal();
    },
    closeModal() {
      this.onCloseModal();
    },
    openDeleteModal(customer) {
      this.setCustomerToDelete(customer);
      this.onOpenDeleteModal();
    },

    closeDeleteModal() {
      this.onCloseDeleteModal();
    },

    openEditModal(customer) {
      this.setCustomerToEdit(customer);
      this.onOpenEditModal();
    },

    closeEditModal() {
      this.onCloseEditModal();
    },

    submitCustomer(customer, avatarLink) {
      const customerData = {
        address: customer.address,
        avatar: avatarLink,
        name: _.upperFirst(customer.name),
        createdAt: new Date(Date.now()).toISOString(),
        id: parseInt(this.customers[0].id, 10) + 1,
      };
      this.onAddUser(customerData);
    },
    submitEditedCustomer(editedCustomer, avatarLink) {
      const customerCustomerData = {
        address: editedCustomer.address,
        avatar: avatarLink,
        name: _.upperFirst(editedCustomer.name),
        createdAt: editedCustomer.createdAt,
      };

      this.onEditCustomer({
        customerCustomerData,
        customerId: editedCustomer.id,
      });
    },
    onDeleteCustomer() {
      this.deleteCustomer(this.customerToDelete.id);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
