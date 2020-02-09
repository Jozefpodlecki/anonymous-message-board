import Vue from 'vue';
import VueRouter from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faFlag, faTrash, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
import App from './App.vue';
import routes from './routes';
import './styles/style.scss'

Vue.config.productionTip = false

library.add(faTimes);
library.add(faFlag);
library.add(faTrash);
library.add(faGlobe);
library.add(faGithub as any);
library.add(faLinkedin as any);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history'
});

new Vue({
    el: '#app',
    render: h => h(App),
    router
});