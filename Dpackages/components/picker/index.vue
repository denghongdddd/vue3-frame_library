<style lang="scss" scoped>
    .d-picker{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:200%;
        background-color:rgba(0,0,0,0);
        display:flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        transition: all 0.3s;
        z-index: -10;
        &.show{
            height:100%;
            background-color:rgba(0,0,0,0.6);
            z-index: 100;
        }
        &-down{
            background:#fff;
            height:200px;
            width:100%;
            display:flex;
            flex-direction: column;
            border-top:1px soild #ddd;
            &>.d-picker-btn{
                display:flex;
                flex-shrink:0;
                justify-content: space-between;
                span{
                    color:#777;
                    padding: 3px 2px;
                    &.ok{
                        &:before{
                            content: var(--text);
                            color:#fff;
                            background:rgb(0, 255, 55);
                            box-shadow: 2px 2px 3px rgba(0, 255, 55, 0.5);
                            border-radius: 5px;
                            padding: 3px 5px;
                        }
                    }
                    &.cancel{
                        padding:3px 5px;
                    }
                }
            }
            &>.d-picker-content{
                flex-grow:1;
                margin: 10px 0;
                position:relative;
                transform-style: preserve-3d;
                div{
                    color:#555;
                    padding:0 10px;
                    text-align: center;
                    height:var(--w);
                    line-height:var(--w);
                    position:absolute;
                    box-sizing: border-box;
                    top:calc(50% - 25px);
                    left:0;
                    width:100%;
                }
            }
        }
    }
</style>
<template>
    <slot />
    <teleport to="body">
        <div class="d-picker" :class="{show:visible}" @click="$emit('update:visible',false)">
                <!-- <div style="background:#fff;width:100%;">
                    <span>pickerIndex= {{pickerIndex}}</span> <span>movePos= {{movePos.toFixed(3)}}</span>
                    <table style="width:100%;">
                        <tr> <td>opacity</td> <td>posY</td> </tr>
                        <tr v-for="(v,k) in swiperList" :key="k">
                            <td>{{k}}</td> <td>{{v.tem_index}}</td> <td>{{v.posY}}</td> 
                        </tr>
                    </table>
                </div> -->
            <div class="d-picker-down" @click.stop>
                <div class="d-picker-btn">
                    <span class="ok" style="--text:'确定';"/>
                    <span class="cancel" @click="$emit('update:visible',false)">取消</span>
                </div>
                <div class="d-picker-content" v-swiperDev="options" :style="{transform:`rotateX(${-movePos/rotate}deg)`}">
                    <div v-for="(v,k) in swiperList" :key="k" :style="{transform:`rotateX(-${v.posY/rotate}deg) translateZ(${z}px) scale(${1-Math.abs(v.tem_index+movePos/height)*0.1})`, '--w': height+'px', opacity:3-Math.abs(v.tem_index+movePos/height) }" :data-value="Math.abs(v.tem_index+movePos/height)">item-{{v.text}}</div>
                </div>
            </div>
        </div>
    </teleport>
</template>
<script>
    import {defineComponent, onUnmounted, onMounted, h, ref, reactive, watch} from "vue";
    const {utils} = require("gsap").gsap;

    function objValue(index, i, list){
        if(index<3) return i;
        else if(index>list.length-4) return i-(list.length-3)+4
        else return i-index+3
    }

export default defineComponent({
    name:"Dpicker",
    props:{
        visible:{
            type:Boolean,
            default:false,
        },
        range:{
            type:Array,
            default:()=>[],
        },
    },
    setup(props, ctx){
        var movePos_=ref(0);
        var swiperList = reactive([]);
        var pickerIndex = ref(0);
        var height = 45;
        var z=80;
        
        for(var i=0;i<Math.min(7,props.range.length);i++){
            swiperList.push({
                text: props.range[i],
                tem_index:i,
                posY: height*i,
            })
        }

        let options = reactive({
            length: props.range.length,
            width:height,
            index: pickerIndex,
            direction:"y",
            moveing(el, {movePos}){ movePos_.value = movePos },
            movePage(el, {movePos, page}){
                var swiperItems=[]
                if(pickerIndex.value+page<3){
                    for(var i=0;i<swiperList.length;i++){
                        swiperItems.push(i)
                    }
                }else if(pickerIndex.value+page>props.range.length-4){
                    for(var i=0;i<swiperList.length;i++){
                        swiperItems.push(props.range.length-swiperList.length+i)
                    }
                }else{
                    for(var i=0;i<swiperList.length;i++){
                        swiperItems.push(pickerIndex.value+page+i-3);
                    }
                }
                swiperList.forEach((v,i)=>{
                    var tem_index=utils.wrap(swiperItems, objValue(page+pickerIndex.value, i, props.range))
                    v.tem_index=tem_index
                    v.text = props.range[tem_index]
                    v.posY = height*tem_index
                })
            },
            moveEnd(el, {movePos, page}){
                pickerIndex.value += page
                movePos_.value=movePos
            }
        })
        return{
            options,
            movePos: movePos_,
            swiperList,
            pickerIndex,

            height,
            z,
            rotate: height/(Math.atan(height/2/z)*180/Math.PI*2),
        }
    },
})
</script>