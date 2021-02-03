<template>
  <div
    class="xsmall: mt-16 :mt-16 hidden md:mt-16 sm:hidden md:hidden lg:block lg:mt-0 fixed flex-col top-0 left-0 w-44 bg-green-700 h-full border-r z-50"
    :class="this.isOpened ? 'toggleNav' : 'hidden'"
  >
    <div
      class="flex items-center justify-center h-14 border-b border-green-800"
    >
      <div class="text-white text-semibold text-lg">FLT Invoice App</div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden flex-grow">
      <ul class="flex flex-col py-4 space-y-1">
        <li>
          <router-link
            to="/customer"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-900 text-green-100 hover:text-white border-l-4 border-transparent hover:border-white pr-6"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <svg
                class="w-5 h-5 text-green-100"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Customers</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/product"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-900 text-green-100 hover:text-white border-l-4 border-transparent hover:border-white pr-6"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <svg
                class="w-5 h-5 text-green-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Products</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DashboardNavigation",
  computed: {
    ...mapState("dashboard", {
      isOpened: (state) => state.isOpened,
    }),
  },
};
</script>

<style scoped>
.toggleNav {
  display: block !important;
}
</style>
