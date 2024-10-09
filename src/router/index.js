import { createRouter, createWebHistory } from 'vue-router';
import FileUpload from "../components/FileUpload.vue";
import PeselValidation from "../components/PeselValidation.vue";
import ApiCompnent from "../components/ApiCompnent.vue";

const routes = [
    {
        path: '/',
        name: 'zadanie_1',
        component: FileUpload,
    },
    {
        path: '/zadanie_2',
        name: 'zadanie_2',
        component: PeselValidation,
    },
    {
        path: '/zadanie_3',
        name: 'zadanie_3',
        component: ApiCompnent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;