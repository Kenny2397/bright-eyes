import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'


// import VueCodeHighlight from 'vue-code-highlight';
// Vue.config.productionTip = false;
// console.log(Icons)

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(Icons)
// app.use(VueCodeHighlight)

app.mount('#app')