import Scrollbar from './src/index.vue'

Scrollbar.install = (Vue) => {
  Vue.component(Scrollbar.name, Scrollbar)
}

export default Scrollbar
