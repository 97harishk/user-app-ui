import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Users from './components/Users/Users'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/users',
            component: Users,
        }
    ]
})
import App from './App.vue'

const app = createApp(App);

app.use(router);

app.mount('#app');
