const state = () => ({
  packageId: null,
  packageName: null,
  amount: null,
  numberExpireDay: null,
  processingTime: null
});

const mutations = {
  UPDATE_PACKAGE: (
    state,
    { packageId, packageName, amount, numberExpireDay, processingTime }
  ) => {
    state.packageId = packageId;
    state.packageName = packageName;
    state.amount = amount;
    state.numberExpireDay = numberExpireDay;
    state.processingTime = processingTime;
  }
};

const actions = {
  updatePackage(
    { commit },
    { packageId, packageName, amount, numberExpireDay, processingTime }
  ) {
    commit("UPDATE_PACKAGE", {
      packageId,
      packageName,
      amount,
      numberExpireDay,
      processingTime
    });
  }
};

export default {
  state,
  mutations,
  actions
};
