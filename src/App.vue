<template>
  <div>
    <header
      class="flex fixed w-full top-0 justify-between items-center py-4 px-6 bg-white border-b-4 border-green-800"
    >
      <div class="flex items-center">
        <button
          @click="toggleNavBar"
          class="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>

        <div class="relative mx-4 lg:mx-0">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <div class="flex items-center">
        <div class="relative">
          <div class="flex items-center">
            <p class="mx-1">Okumu Justine</p>
            <button
              class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div
      class="main md:ml-0 sm:ml-0 xl:ml-customMaxMainWidthlg lg:ml-customMaxMainWidth"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState("dashboard", {
      isOpened: (state) => state.isOpened,
    }),
  },

  methods: {
    ...mapActions("dashboard", {
      toggleNav: "toggleNav",
    }),
    toggleNavBar() {
      this.toggleNav();
    },
  },
};
</script>

<style lang="css">
body {
  font-family: "Lato", sans-serif;
}

.sidenav {
  width: 130px;
  position: fixed;
  top: 0px;
  left: 10px;
  background: #eee;
  overflow-x: hidden;
  padding: 8px 0;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #2196f3;
  display: block;
}

.sidenav a:hover {
  color: #064579;
}

.customMaxMainWidth {
  margin-left: 174px;
}

.customMinMainWidth {
  margin-left: 0px;
}

.main {
  margin-top: 78px;
  font-size: 16px;
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  padding: 20px;
  background: #ffffff;
}

.router-link-active {
  background-color: #054e3c !important;
  border-left-width: 4px;
  border-color: #ffffff !important;
}

#nprogress .bar {
  background: #29d;
  height: 4px !important;
}
</style>
