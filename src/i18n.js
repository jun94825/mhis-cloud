import Vue from 'vue';
import VueI18n from 'vue-i18n';

import tw from './i18n/tw';
import us from './i18n/us';

Vue.use(VueI18n);

const messages = {
  tw,
  us,
};

const i18n = new VueI18n({
  locale: 'tw',
  messages,
});

export default i18n;
