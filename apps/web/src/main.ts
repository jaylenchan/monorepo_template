import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { transpiler } from '@jeditor/transpiler'

console.log("transpiler", transpiler)

createApp(App).mount('#app')
