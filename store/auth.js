const state = () => ({
  isAuthenticated: false,
});

const mutations = {
  SET_AUTHENTICATED: (state, authenticated) => {
    state.isAuthenticated = authenticated;
  },
};

const actions = {
  setAuthenticated({ commit }, authenticated) {
    commit("SET_AUTHENTICATED", authenticated);
  },
};

export default {
  state,
  mutations,
  actions,
};
