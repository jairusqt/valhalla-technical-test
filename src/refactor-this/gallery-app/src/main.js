import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888',
});

app.config.globalProperties.$axios = axiosInstance;

app.mount('#app');
