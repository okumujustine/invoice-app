<template>
  <div>
    <button class="addUser__Button" @click="openModal">Add User</button>
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
    <div v-if="loading">Loading users...</div>
    <div v-for="customer in customers" class="row" v-bind:key="customer.id">
      <hr />
      <div class="customerListing">
        <div class="customerListing__Left">
          <div class="customerListing__ImgContainer">
            <img
              :src="customer.avatar"
              alt="avatar"
              class="customerListing__Img"
            />
          </div>
          <div>
            <div>{{ customer.name }}</div>
            <div>{{ customer.address }}</div>
          </div>
        </div>
        <div class="customerListing__Right">
          <div class="customerListing__Left_ButtonContainer">
            <button @click="openEditModal(customer)">EDIT</button>
          </div>
          <div class="customerListing__Right_ButtonContainer">
            <button @click="openDeleteModal(customer)">DELETE</button>
          </div>
          <div class="customerListing__Right_ButtonContainer">
            <router-link
              :to="`/customer/${customer.id}/invoice/`"
              class="btn btn-sm show"
            >
              <button>INVOICE</button>
            </router-link>
          </div>
        </div>
      </div>
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
      loading: (state) => state.loading,
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
.addUser__Button {
  margin: 20px 20px 20px 0px;
}
.customerListing {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.customerListing__Left {
  display: flex;
}
.customerListing__Right {
  display: flex;
  flex-direction: row;
}
.customerListing__Left_ButtonContainer {
  margin-right: 10px;
}
.customerListing__Right_ButtonContainer {
  margin-left: 10px;
}
.customerListing__Img {
  zoom: 1;
}
.customerListing__ImgContainer {
  height: 50px;
  width: 50px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid black;
}
</style>
