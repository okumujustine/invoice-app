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
        <button>Details</button>
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
