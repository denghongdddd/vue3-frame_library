import Alert from './index.vue'
Alert.install = (Vue) => {
  Vue.component(Alert.name, Alert)
}
export default Alert
