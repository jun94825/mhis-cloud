import Vue from 'vue';

/* Element UI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* Axios */
import axios from 'axios';
import VueAxios from 'vue-axios';

/* Google Maps */
import * as VueGoogleMaps from 'vue2-google-maps';

/* i18n */
import i18n from './i18n';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI);

Vue.use(VueAxios, axios);
axios.defaults.headers.post['Content-Type'] = 'application/json-patch+json';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoBtzTdfpxeyLuRcefJjV8mJvb5foxupw',
    libraries: 'places',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
