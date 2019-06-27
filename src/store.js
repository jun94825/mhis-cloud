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
    VERIFY() {
      const token = localStorage.getItem('cookie');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      // const url = window.location.href;
      const url = 'http://jun.upis.info/fuck';
      const dot = url.indexOf('.');
      this.state.domain = url.substring(7, dot);
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
