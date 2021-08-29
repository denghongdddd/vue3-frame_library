export const swiper = {
    beforeMount:(el, binding, vnode, prevVnode)=>{
        window.the_=binding
        console.log(el,binding, vnode)
        console.log(binding.arg)
    },
    mounted(el,b,c){
        
    },
    beforeUpdate(){},
    updated(){},
    beforeUnmount(){},
    unmounted(){},
}