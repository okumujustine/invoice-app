<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div>
        Are u sure you want to delete <br />{{ this.customerToDelete.name }}
      </div>
      <button @click="onDelete" class="mt-3 border-b border-teal font-semibold">
        Delete
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
  name: "DeleteModal",
  // props: ["dataToDelete"],
  computed: {
    ...mapState("customer", {
      customerToDelete: (state) => state.customerToDelete,
    }),
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onDelete() {
      this.$emit("onDelete");
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
