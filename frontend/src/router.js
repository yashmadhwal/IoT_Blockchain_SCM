import { createWebHistory, createRouter } from "vue-router";
import Home from './pages/Home.vue';
import Producer from './pages/Producer.vue';
import Receive from './pages/Receive.vue';
import Track from './pages/Track.vue';
import PageNotFound from './pages/PageNotFound.vue';

const routes=[
    {
        name:'Home',
        path:'/',
        component: Home
    },
    {
        name:'Producer',
        path:'/Producer',
        component: Producer
    },
    {
        name:'Receive',
        path:'/Receive',
        component: Receive
    },
    {
        name:'Track',
        path:'/Track',
        component: Track
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;