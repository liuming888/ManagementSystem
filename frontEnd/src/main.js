// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import vuex from "vuex";
Vue.use(vuex);
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);
import VeeValidate from 'vee-validate';
import {storeObj} from "./store/store.js";
router.beforeEach((to, from, next) => {
    if (to.path == '/login' || (localStorage.getItem('isLogin')) == 'true') {
        next();
    } else {
        next({ path: '/login' });
    }
})
const config = {
    errorBagName: 'errors',
    fieldsBagName: 'fieldsn',
    delay: 100,
    locale: 'zh_CN',
    strict: true,
    enableAutoClasses: true,
    events: 'blur',
    inject: true
};
Vue.use(VeeValidate, config);
Vue.config.productionTip = false;

const store = new vuex.Store(storeObj);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})
