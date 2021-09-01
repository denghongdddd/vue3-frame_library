import { createApp, nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './route.config'
import demoBlock from './components/demo-block'
import SideNav from './components/side-nav'
import 'highlight.js/styles/color-brewer.css'
import './demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // todo: locale based on Doc site lang

import App from './app.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/**自定义组件 */
import Dui from "black-knight"

const app = createApp(App)

app.use(ElementPlus)
app.component('DemoBlock', demoBlock)
app.component('SideNav', SideNav)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(Dui)
app.use(router)
router.isReady().then(() => {

  router.afterEach(async route => {
    await nextTick()
    document.title = route.meta.title||document.title
  })

})

app.mount('#app')