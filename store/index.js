const state = () => ({
  breadScrum: [
    {
      path: "/",
      name: "Sách nói"
    }
  ],
  domainServiceUrl: `${process.env.baseUrl}/api/v1/`
});

const mutations = {
  PUSH_ROUTE(state, route) {
    state.breadScrum.push(route);
  },
  POP_ROUTE(state) {
    state.breadScrum.pop();
  }
};

const actions = {
  pushRoute({ commit }, { route }) {
    commit("PUSH_ROUTE", { route });
  },
  popRoute({ commit }) {
    commit("POP_ROUTE");
  }
};

export default {
  state,
  mutations,
  actions
};
