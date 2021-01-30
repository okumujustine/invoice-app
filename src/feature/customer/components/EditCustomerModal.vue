<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div>Edit user details</div>
      <input v-model="customerName" type="text" placeholder="name" />
      <br />
      <input v-model="customerAddress" type="text" placeholder="address" />
      <br />
      <input type="file" @change="onFileChanged" />
      <br />
      <button @click="submit" class="mt-3 border-b border-teal font-semibold">
        Edit User
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
  name: "EditCustomerModal",
  computed: {
    ...mapState("customer", {
      customerToEdit: (state) => state.customerToEdit,
    }),
    customerName: {
      get() {
        return this.$store.state.customer.customerToEdit.name;
      },
      set(value) {
        this.updateCustomerName(value);
      },
    },
    customerAddress: {
      get() {
        return this.$store.state.customer.customerToEdit.address;
      },
      set(value) {
        this.updateCustomerAddress(value);
      },
    },
  },
  methods: {
    ...mapActions("customer", ["updateCustomerName", "updateCustomerAddress"]),
    onFileChanged(event) {
      this.customer.avatar = event.target.files[0];
    },
    close() {
      this.$emit("close");
    },
    submit() {
      //   const formData = new FormData();

      const avatarLink =
        "https://s3.amazonaws.com/uifaces/faces/twitter/craighenneberry/128.jpg";

      this.$emit("submit", this.customerToEdit, avatarLink);
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
