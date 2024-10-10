import './bootstrap.js';
import '@/assets/css/app.css';
import "@/assets/css/custom-table-theme.css";
import '@/assets/css/satoshi.css'
import '@/assets/css/style.css'
import "@/assets/scss/tailwind.scss";
import 'flatpickr/dist/flatpickr.min.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import App from './App.vue'
import router from './router'
// import axiosPlugin from './plugins/axios';  // Import your Axios plugin

const pinia = createPinia()

const appName = import.meta.env.VITE_APP_NAME || 'My App'
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'

pinia.use(({store}) => {
  store.router = markRaw(router)
})

const app = createApp(App)

// Assign the global variable before mounting
app.config.globalProperties.appName = appName
app.config.globalProperties.appVersion = appVersion

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - ${appName}`;
  next();
});

app.use(pinia)
  .use(router)
  .use(VueSweetalert2)
  .use(Toast, {
    // Optional toast options (you can customize)
    position: "top-right",
    timeout: 5000
  })
  // .use(axios)
  .component('EasyDataTable', Vue3EasyDataTable)
  .mount('#app')
