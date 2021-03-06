import Vue from "vue";
import VueRouter from "vue-router";
import DashboardNavigator from "../feature/dashboard/DashboardNavigator.vue";
import CustomerNavigator from "../feature/customer/CustomerNavigator.vue";
import ProductNavigator from "../feature/product/ProductNavigator.vue";
import ListCustomer from "../feature/customer/views/ListCustomer.vue";
import CustomerInvoices from "../feature/customer/views/CustomerInvoices.vue";
import CustomerInvoice from "../feature/customer/views/CustomerInvoice.vue";
import ListProduct from "../feature/product/views/ListProduct.vue";
import InvoiceNavigator from "../feature/invoice/InvoiceNavigator.vue";
import AddInvoice from "../feature/invoice/views/AddInvoice.vue";
import ListInvoice from "../feature/invoice/views/ListInvoice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    redirect: "/customer",
    component: DashboardNavigator,
    children: [
      {
        path: "/customer",
        name: "customer",
        component: CustomerNavigator,
        children: [
          {
            path: "/customer",
            name: "customer-list",
            component: ListCustomer,
          },
          {
            path: "/customer/:id/invoice",
            name: "customer-invoices",
            component: CustomerInvoices,
          },
          {
            path: "/customer/:customerId/invoice/:invoiceId",
            name: "customer-invoice",
            component: CustomerInvoice,
          },
        ],
      },
      {
        path: "/invoice",
        name: "invoice",
        component: InvoiceNavigator,
        children: [
          {
            path: "/invoice",
            name: "invoice-list",
            component: ListInvoice,
          },
          {
            path: "/invoice-add",
            name: "invoice-add",
            component: AddInvoice,
          },
        ],
      },
      {
        path: "/product",
        name: "product",
        component: ProductNavigator,
        children: [
          {
            path: "/product",
            name: "product-list",
            component: ListProduct,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
