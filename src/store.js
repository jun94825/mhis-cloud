import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import i18n from './i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    domain: '',
    loading: false,
    language: 'tw',
    collapse: false,
  },
  mutations: {
    // GET_DOMAIN() {
    //   const url = 'http://9797.upis.info';
    //   // const url = window.location.href;
    //   const dot = url.indexOf('.');
    //   this.state.domain = url.substring(7, dot);
    // },
    // VERIFICATION
    VERIFY() {
      // const url = window.location.href;
      const url = 'http://jun.upis.info';
      const dot = url.indexOf('.');
      this.state.domain = url.substring(7, dot);
      const token = localStorage.getItem('cookie');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    LOADING(state, payload) {
      this.state.loading = payload;
    },
    LANGUAGE(state, payload) {
      this.state.language = payload;
      i18n.locale = payload;
    },
    COLLAPSE(state) {
      this.state.collapse = !state.collapse;
    },
  },
  actions: {},
});
