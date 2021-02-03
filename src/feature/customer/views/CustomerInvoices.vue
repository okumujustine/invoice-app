<template>
  <div>
    <button type="button">Add Invoice</button>
    <div v-if="this.customer.name">
      {{ `customer name: ${this.customer.name}` }}
    </div>
    <div v-if="customerInvoices.length === 0 && !customerInvoicesLoading">
      No invoices for {{ this.customer.name }}
    </div>
    <div
      v-for="customerInvoice in customerInvoices"
      v-bind:key="customerInvoice.id"
    >
      <hr />
      <div>
        <p>#{{ customerInvoice.invoice_no }}</p>
      </div>
      <div>
        {{ customerInvoice.due_date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
      </div>
      <button>delete</button>
      <router-link
        :to="`/customer/${currentCustomerId}/invoice/${customerInvoice.id}`"
      >
        <span class="hidden sm:block ml-3">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <!-- Heroicon name: link -->
            <svg
              class="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clip-rule="evenodd"
              />
            </svg>
            View Details
          </button>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CustomerInvoices",
  data() {
    return { currentCustomerId: this.$route.params.id };
  },
  computed: {
    ...mapState("customer", {
      customerInvoices: (state) => state.customerInvoices,
      customerInvoicesLoading: (state) => state.customerInvoicesLoading,
      customer: (state) => state.customer,
    }),
  },

  created() {
    this.getOneCustomer(this.currentCustomerId).then(() =>
      this.getCustomerInvoices(this.currentCustomerId)
    );
  },

  methods: {
    ...mapActions("customer", {
      getCustomerInvoices: "getCustomerInvoices",
      getOneCustomer: "getOneCustomer",
    }),
  },
};
</script>
