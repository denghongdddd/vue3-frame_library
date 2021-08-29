import "black-knight/config/customeDate"

/**自定义组件 */
import picker from "black-knight/components/picker"
const components=[picker]

/**自定义指令 */
import swiper from "black-knight/directive/swiper"
import swiper_dev from "black-knight/directive/swiper_dev"
const directives=[swiper, swiper_dev]

const install = (Vue, options={})=>{
    components.forEach(item=>{
        Vue.component(item.name, item)
    })
    directives.forEach(item=>{
        Vue.use(item)
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default{
    install,
    picker
}
