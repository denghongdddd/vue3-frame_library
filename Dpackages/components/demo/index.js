import demo from "./index.vue"

demo.install=(Vue)=>{
    Vue.component(demo.name,demo)
}

export default demo;