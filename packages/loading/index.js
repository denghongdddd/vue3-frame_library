import Loading from './src/index'
import vLoading from './src/directive'

export default {
  install(Vue) {
    Vue.directive('loading', vLoading)
    Vue.config.globalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading,
}
