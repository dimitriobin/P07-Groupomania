import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueObserveVisibility from 'vue-observe-visibility';
import router from './router';
import store from './store';
import App from './App.vue';

import './assets/css/custom.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './validation-config';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
