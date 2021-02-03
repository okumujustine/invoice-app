<template>
  <div class="modal-content">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 sm:p-6">
            <div class="w-full">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Add Customer
                </h3>
                <div class="mt-2">
                  <div class="mb-3">
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700"
                      >Name</label
                    >
                    <div class="mt-2 flex items-center">
                      <input
                        class="border border-gray-300 w-full py-2 px-3 rounded-md shadow-sm"
                        for="name"
                        v-model="customer.name"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label
                      for="address"
                      class="block text-sm font-medium text-gray-700"
                      >Price</label
                    >
                    <div class="mt-2 flex items-center">
                      <input
                        v-model="customer.address"
                        type="number"
                        name="address"
                        id="address"
                        min="1"
                        placeholder="Address"
                        class="border border-gray-300 w-full py-2 px-3 rounded-md shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Avatar
                    </label>
                    <div class="mt-2 flex items-center">
                      <input
                        @change="onFileChanged"
                        type="file"
                        class="bg-white w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="submit"
              class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
              <span>{{
                addCustomerLoading ? "Adding User ..." : "Add User"
              }}</span>
            </button>
            <button
              @click="close"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <svg
                class="fill-current text-gray-300 w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
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

      const avatarLink =
        "https://s3.amazonaws.com/uifaces/faces/twitter/craighenneberry/128.jpg";

      this.$emit("submit", this.customer, avatarLink);
    },
  },
};
</script>

<style lang="css" scoped></style>
