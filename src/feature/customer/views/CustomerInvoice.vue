<template>
  <div>
    <p v-if="this.customerInvoice.length > 0">
      invoice_no: # {{ this.customerInvoice[0].invoice_no }}
    </p>
    <div v-if="this.customer.name">
      {{ `customer name: ${this.customer.name}` }}
    </div>

    <div v-for="invoiceItem in invoiceItems" v-bind:key="invoiceItem.id">
      <p>{{ invoiceItem.item_name }}</p>
    </div>
    <div v-for="(input, index) in items" :key="index">
      <input v-model="input.name" type="text" placeholder="Invoice Item" />
      <input v-model="input.price" type="text" placeholder="Price" />
      <input v-model="input.quantity" type="text" placeholder="Quantity" />
    </div>
    <div>
      <button @click="submitInvoiceItem()">submit</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { checkProperties } from "../../../helper-functions";

export default {
  name: "CustomerInvoice",
  data() {
    return {
      currentCustomerId: this.$route.params.customerId,
      currentInvoiceId: this.$route.params.invoiceId,
      items: [{ name: "", price: "", quantity: "" }],
    };
  },

  computed: {
    ...mapState("customer", {
      customerInvoices: (state) => state.customerInvoices,
      customerInvoicesLoading: (state) => state.customerInvoicesLoading,
      customerInvoice: (state) => state.customerInvoice,
      invoiceItems: (state) => state.invoiceItems,
      customer: (state) => state.customer,
    }),
  },

  created() {
    this.getOneCustomer(this.currentCustomerId)
      .then(() => this.getCustomerInvoice(this.currentCustomerId))
      .then(() => {
        this.getInvoiceItems({
          currentCustomerId: this.currentCustomerId,
          currentInvoiceId: this.currentInvoiceId,
        });
      });
  },

  methods: {
    ...mapActions("customer", {
      getCustomerInvoice: "getCustomerInvoice",
      getOneCustomer: "getOneCustomer",
      getInvoiceItems: "getInvoiceItems",
      submitItem: "submitItem",
    }),

    submitInvoiceItem() {
      const isEveryPropertie = checkProperties(this.items);
      if (!isEveryPropertie) {
        return alert("input field cannot be empty");
      }

      this.submitItem({
        item: this.items[0],
        customerInvoice: this.customerInvoice,
      }).then(
        () =>
          (this.items = [
            {
              name: "",
              price: "",
              quantity: "",
            },
          ])
      );
    },
  },
};
</script>
