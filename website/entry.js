import { createApp, nextTick } from 'vue'
import * as ElementPlusSvgIcons from '@element-plus/icons'
import router from './route.config.js'
import demoBlock from './components/demo-block'
import RightNav from './components/right-nav'
import SideNav from './components/side-nav'

import 'highlight.js/styles/color-brewer.css'
import './demo-styles/index.scss'
import icon from './icon.json'
import App from './app.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Dpackages from 'black-knight'

const app = createApp(App)

const svgIcons = []
for (let i in ElementPlusSvgIcons) {
  const component = ElementPlusSvgIcons[i]
  app.component(component.name, component)
  svgIcons.push(component.name)
}
app.config.globalProperties.$svgIcons = svgIcons
app.config.globalProperties.$icon = icon

app.use(ElementPlus)
  .use(demoBlock)
  .use(Dpackages)
  .use(RightNav)
  .use(SideNav)
  .use(router)
  .mount('#app')
