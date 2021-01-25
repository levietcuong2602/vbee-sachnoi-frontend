import { getToken, setToken, removeToken } from "@/utils/auth";

import { login } from "@/api/authen";

const state = () => ({
  token: "",
  userName: "",
  avatar: "",
  userId: "1",
  phoneNumber: "",
  email: "",
  fullName: "",
  city: "",
});

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password, captcha, session } = userInfo;
    return new Promise((resolve, reject) => {
      login({ user_name: userName.trim(), password, captcha, session })
        .then((response) => {
          const { accessToken } = response;
          commit("SET_TOKEN", accessToken);
          setToken(accessToken);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // set token
  setToken({ commit }, token) {
    commit("SET_TOKEN", token);
  },
  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
