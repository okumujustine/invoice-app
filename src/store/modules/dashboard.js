const state = {
  isOpened: false,
};

const getters = {};

const actions = {
  toggleNav({ commit }) {
    commit("TOGGLE_NAV");
  },
};

const mutations = {
  TOGGLE_NAV: (state) => {
    state.isOpened = !state.isOpened;
  },
};

export const dashboard = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
