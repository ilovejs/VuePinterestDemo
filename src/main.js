import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import {VueMasonryPlugin} from 'vue-masonry';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueMasonryPlugin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
