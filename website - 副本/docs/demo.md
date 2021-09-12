<!-- 不能和 :::demo 共用 -->
<!-- <script>
  export default {
    data(){
      return{
        title: "asdfasdf"
      }
    }
  }
</script> -->

## 组件模板

#### 普通滑动组件

:::demo 停止后才能滑动
  ```html
  <template>
    <div v-swiper="options" class="swiper">
      <div v-for="v in swiperList" :style="{backgroundImage: `url(${v.imgUrl})`,transform: `translateX(${v.posX+movePos}px)`}" />
    </div>
  </template>
  <script>
    import { defineComponent, computed, ref, onMounted, reactive, watch } from 'vue';
    const {utils} = require("gsap").gsap;
    export default defineComponent({
      setup(props, ctx){
        var imgList=[
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29659.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/hpic3377.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29611.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29464.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202011/bpic21796.jpg",
        ]
        var movePos_=ref(0)
        var swiperList = reactive([])
        var imgIndex = ref(0)

        let options = computed(()=>({
          length:0,
          initSwiper(el){
            console.log(el.clientWidth)
            for(var i=-1;i<2;i++){
              swiperList.push({
                imgUrl: utils.wrap(imgList,i),
                index: i,
                posX: el.clientWidth*i
              })
            }
          },
          moveing(el, {movePos}){ movePos_.value=movePos },
          movePage(el, {movePos, page}){
            var swiperItms=swiperList.map(v=>v.index+page).sort((a,b)=>a-b)
            swiperList.forEach(v=>{
              var tem_index=utils.wrap(swiperItms,v.index-page+1)
              v.imgUrl=utils.wrap(imgList,imgIndex.value+tem_index )
              v.posX=el.clientWidth*tem_index
              return v
            })
          },
          moveEnd(el,{movePos, page}){
            imgIndex.value = utils.wrap(0, imgList.length,imgIndex.value+page)
            console.log(imgIndex.value,"------imgIndex----")
            movePos_.value=movePos
            swiperList.forEach(v=>{
              v.index=utils.wrap([-1,0,1],v.index+1 -page)
              v.posX=el.clientWidth*v.index
              return v;
            })
          }
        }))
        
        return{
          options,
          movePos:movePos_,
          swiperList,
          imgIndex,
        }
      }
    })
  </script>
  ```
:::

延迟函数
:::demo
  ```html
    <template>
      <button @click="demo('----test------')">按钮</button>
    </template>
    <script>
    const { delayed } = require("black-knight/config/utils.js")
      export default{
        data(){
          return{
            
          }
        },
        created(){
          
        },
        methods:{
          demo: delayed((a,b,c,d)=>{
            console.log(a,b,c,d,"-------demo---")
          },3000),
        },
      }
    </script>
  ```
:::