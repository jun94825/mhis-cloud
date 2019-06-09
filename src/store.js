import Vue from 'vue';
import Vuex from 'vuex';

import i18n from './i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'us',
    collapse: false,
  },
  mutations: {
    SWITCH_COLLAPSE(state) {
      this.state.collapse = !state.collapse;
    },
  },
  actions: {},
});
