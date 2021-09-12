import { createApp, nextTick } from 'vue'
import { hyphenate } from '@vue/shared'
import * as ElementPlusSvgIcons from '@element-plus/icons'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './route.config'
import demoBlock from './components/demo-block'
import RightNav from './components/right-nav'
import SideNav from './components/side-nav'

import 'highlight.js/styles/color-brewer.css'
import './demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'
import icon from './icon.json'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // todo: locale based on Doc site lang
import compLang from './i18n/component.json'
import App from './app.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

const svgIcons = []
for (let i in ElementPlusSvgIcons) {
  const component = ElementPlusSvgIcons[i]
  app.component(component.name, component)
  svgIcons.push(component.name)
}
app.config.globalProperties.$svgIcons = svgIcons
app.config.globalProperties.$icon = icon

app.component('DemoBlock', demoBlock)
app.component('RightNav', RightNav)
app.component('SideNav', SideNav)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
app.use(ElementPlus)
app.use(router)
router.isReady().then(() => {
  let lang = location.hash.split('/')[1]
  let langConfig = compLang.filter((config) => config.lang === lang)[0][
    'demo-block'
  ]

//   app.config.globalProperties.$copySvgIcon = (iconName) => {
//     clipboardCopy(
//       `<el-icon>
//   <${hyphenate(iconName)} />
// </el-icon>
//       `
//     )
//       .then(() => {
//         app.config.globalProperties.$message({
//           showClose: true,
//           message: langConfig['copy-success'],
//           type: 'success',
//         })
//       })
//       .catch(() => {
//         app.config.globalProperties.$message({
//           showClose: true,
//           message: langConfig['copy-error'],
//           type: 'error',
//         })
//       })
//   }
  router.afterEach(async (route) => {
    await nextTick()
    document.title = '自定义组件框架'
    ga('send', 'event', 'PageView', route.name)
  })
})

app.mount('#app')
