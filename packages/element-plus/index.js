import ElButton from '@package/button'
import ElLoading from '@package/loading'
import ElScrollbar from '@package/scrollbar'
import ElTooltip from '@package/tooltip'

const components = [
  ElButton,
  ElScrollbar,
  ElTooltip,
]

const plugins = [
  ElLoading,
]

const install = (Vue, opt) => {
  // Vue.config.globalProperties.$ELEMENT = option

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  plugins.forEach(plugin => {
    Vue.use(plugin)
  })
}

export {
  ElButton,
  ElScrollbar,
  install,
}

export default {
  install,
}
