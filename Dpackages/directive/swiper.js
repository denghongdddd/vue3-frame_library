import gsap from "gsap"

export default{
    install(Vue){
        Vue.directive("swiper",{
            beforeMount:(el, binding, vnode, prevVnode)=>{  },
            mounted(el, binding, vnode){
                binding.value.initSwiper&&binding.value.initSwiper(el)
                var options=binding.value
                var width=0//轮播图框宽度
                var startTime=0//开始时间
                var lastX=0//最后1s的位置
                var startX=0//开始位置
                var moveX=0//滑动距离
                var animation=null;
                var tem_page=0
                var moveVal={}
                binding.dir.unmounted=function(){
                    options=null
                    moveVal=null
                    animation&&animation.kill()
                }
                el.ontouchstart = function(e){
                    e.preventDefault()
                    width = options.width||el.clientWidth
                    lastX = e.touches[0].clientX
                    startTime = new Date().getTime()
                    tem_page=0
                    animation&&animation.kill()
                    if(!moveVal.hasOwnProperty("page")){
                        startX = lastX
                        moveVal={
                            page:0,
                            movePos:0
                        }
                    }else{
                        startX =lastX - moveVal.movePos
                    }
                }

                el.ontouchmove = function(e){
                    e.preventDefault()
                    moveX = e.touches[0].clientX - startX
                    var page=parseInt(-(moveX/width).toFixed(0));
                    if(new Date().getTime() - startTime>1000){
                        startTime = new Date().getTime()
                        lastX=e.touches[0].clientX
                    }
                    if(page!=tem_page){
                        options.movePage&&options.movePage(el, Object.assign(moveVal, {movePos:moveX, page: page }));
                        tem_page=page;
                    }
                    options.moveing&&options.moveing(el,Object.assign(moveVal, {movePos:moveX, page: page }))
                }

                el.ontouchend = function(e){
                    var speeh=(e.changedTouches[0].clientX-lastX)/(new Date().getTime()-startTime)
                    moveVal.movePos += moveVal.page*width
                    startX -= moveVal.page*width
                    if(Math.abs(moveVal.page)>0)options.moveEnd&&options.moveEnd(el, moveVal);
                    moveVal.page=0
                    tem_page=0

                    if(Math.abs(moveVal.movePos)>0||Math.abs(speeh)>(options.speeh||0.3)){
                        animation = gsap.to(moveVal,{duration:0.5, movePos: Math.abs(speeh)>(options.speeh||0.3)?(speeh>0?1:-1)*width:0, onUpdate(){
                            var page = parseInt(-((moveVal.movePos)/width).toFixed(0))
                            if(tem_page!=page){
                                options.movePage&&options.movePage(el, Object.assign(moveVal, {page: page}))
                                tem_page = page
                            }

                            options.moveing&&options.moveing(el, {movePos: moveVal.movePos})
                        },onComplete(){
                            if(moveVal.page!=0){
                                options.moveEnd&&options.moveEnd(el, {movePos: moveVal.movePos + moveVal.page*width, page:moveVal.page})
                            }
                            moveVal={}
                        }});
                    }
                }
            },
            beforeUpdate(el, binding){},
            updated(){},
            beforeUnmount(){},
            unmounted(){},
        })
    }
}