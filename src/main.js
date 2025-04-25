import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import 'quasar/dist/quasar.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  config: {
    brand: {
      primary: '#ff4081',      // 更鲜艳的粉色
      secondary: '#7e57c2',    // 柔和的紫色
      accent: '#64b5f6',       // 清新的蓝色
      dark: '#263238',         // 更深沉的暗色
      positive: '#66bb6a',     // 柔和的绿色
      negative: '#ef5350',     // 柔和的红色
      info: '#42a5f5',         // 明亮的蓝色
      warning: '#ffb74d'       // 柔和的橙色
    }
  }
})

app.use(store)
app.use(router)

app.mount('#app')
