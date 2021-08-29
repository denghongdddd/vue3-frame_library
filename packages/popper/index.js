import Popper from './src/index'

Popper.install = (Vue) => {
  Vue.component(Popper.name, Popper)
}

export default Popper

export { default as defaultProps, Effect } from './src/use-popper/defaults'
export { default as usePopper } from './src/use-popper/index'
export * from './src/renderers/index'
