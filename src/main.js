import './assets/main.css'
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router.js";

const app=createApp(App)
     app.use(PrimeVue);
     app.mount('#app')
