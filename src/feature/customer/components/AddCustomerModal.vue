<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div>Direction</div>
      <p>Get a direction with your favourite apps</p>
      <input v-model="customer.name" type="text" placeholder="name" /> <br />
      <input v-model="customer.address" type="text" placeholder="address" />
      <br />
      <input type="file" @change="onFileChanged" />
      <br />
      <button @click="submit" class="mt-3 border-b border-teal font-semibold">
        {{ addCustomerLoading ? "Adding User ..." : "Add User" }}
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
  name: "AddCustomerModal",
  data() {
    return {
      customer: {
        address: "",
        avatar: "",
        name: "",
      },
    };
  },
  computed: {
    ...mapState("customer", {
      addCustomerLoading: (state) => state.addCustomerLoading,
    }),
  },
  methods: {
    onFileChanged(event) {
      this.customer.avatar = event.target.files[0];
    },
    close() {
      this.$emit("close");
    },
    submit() {
      const formData = new FormData();
      formData.append(
        "avatar",
        this.customer.avatar,
        this.customer.avatar.name
      );
      formData.append("name", this.customer.name);

      const avatarLink =
        "https://s3.amazonaws.com/uifaces/faces/twitter/craighenneberry/128.jpg";

      this.$emit("submit", this.customer, avatarLink);
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
