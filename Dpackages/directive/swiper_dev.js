import gsap from "gsap"

function direction(dir="x"){
    switch(String(dir).toLocaleLowerCase()){
        case "y":return 'clientY';
        default:return 'clientX';
    }
}

export default{
    install(Vue){
        Vue.directive("swiperDev",{
            beforeMount:(el, binding, vnode, prevVnode)=>{ },
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
                    lastX = e.touches[0][direction(options.direction)]
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
                        startX =lastX - (moveVal.movePos+options.index*width)
                    }
                }

                el.ontouchmove = function(e){
                    e.preventDefault()
                    moveX = e.touches[0][direction(options.direction)] - startX
                    var page=parseInt(-(moveX/width).toFixed(0));
                    var index=options.index+page
                    if(index<=0)page=0-options.index;
                    else if(index>=options.length-1)page=options.length-1-options.index;

                    var length=-(options.index)*width + moveX
                    if(new Date().getTime() - startTime>1000){
                        startTime = new Date().getTime()
                        lastX=e.touches[0][direction(options.direction)]
                    }
                    if(page!=tem_page){
                        options.movePage&&options.movePage(el, Object.assign(moveVal, {movePos:length , page: page }));
                        tem_page=page;
                    }
                    if(length<=-(options.length-1)*width ){
                        options.moveing&&options.moveing(el,Object.assign(moveVal, {movePos: -(options.length-1)*width+(length+(options.length-1)*width)/3, page: page }))
                    }else if(length>=0 ){
                        options.moveing&&options.moveing(el,Object.assign(moveVal, {movePos:length/3, page: page }))
                    }else{
                        options.moveing&&options.moveing(el,Object.assign(moveVal, {movePos:length, page: page }))
                    }
                }

                el.ontouchend = function(e){
                    var speeh=(e.changedTouches[0][direction(options.direction)]-lastX)/(new Date().getTime()-startTime)
                    
                    if(Math.abs(moveVal.page)>0)options.moveEnd&&options.moveEnd(el, moveVal);
                    moveVal.page=0;
                    tem_page=0;

                    if(Math.abs(moveVal.movePos)>0||Math.abs(speeh)>0.3){
                        var moveLength = -(moveVal.page+options.index)*width + ( speeh>0.3&&(moveVal.page+options.index>0)&&width || speeh<-0.3&&(moveVal.page+options.index<options.length-1)&&-width||0 )

                        animation = gsap.to(moveVal,{duration:0.5, movePos: moveLength, onUpdate(){
                            var page = parseInt(-((moveVal.movePos)/width).toFixed(0))-options.index
                            if(tem_page!=page){
                                options.movePage&&options.movePage(el, Object.assign(moveVal, {page: page}))
                                tem_page = page
                            }
                            options.moveing&&options.moveing(el, {movePos: moveVal.movePos})
                        },onComplete(){
                            console.log(moveVal,"----complete----")
                            if(moveVal.page!=0){
                                options.moveEnd&&options.moveEnd(el, {movePos: moveVal.movePos, page:moveVal.page})
                            }
                            moveVal={}
                        }});
                    }
                }
            },
            beforeUpdate(){},
            updated(){},
            beforeUnmount(){},
            unmounted(){},
        })
    }
}