import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	base: '/',
	linkActiveClass: 'active',
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
});

import App from './app';

new Vue({
 el: '#root',
 components: { App },
 router,
 data: {
 	eventHub: new Vue()
 }
});
