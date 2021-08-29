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

## 在移动端使用

#### 高性能移动端滑动功能
:::demo 普通滑动
  ```html
  <template>
    <div v-swiperDev="options" class="swiper">
      <div v-for="(v,k) in swiperList" :key="k" :data-index="k" :style="{backgroundImage: `url(${v.imgUrl})`,transform: `translateX(${v.posX+movePos}px)`}" />
    </div>
  </template>
  <script>
    import { defineComponent, computed, ref, onMounted, reactive, watch } from 'vue';
    const {utils} = require("gsap").gsap;
    function objValue(obj,key='',defaultValue=''){
      if(obj.hasOwnProperty(key))return obj[key];
      return defaultValue;
    }
    export default defineComponent({
      setup(props, ctx){
        var imgList=[
          `https://scpic.chinaz.net/files/pic/pic9/202012/apic29669.jpg`,
          "https://scpic.chinaz.net/files/pic/pic9/202012/hpic3376.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29613.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29461.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202011/bpic21794.jpg",
        ]
        var movePos_=ref(0)
        var swiperList = reactive([])
        var imgIndex = ref(0)

        let options = reactive({
          length: imgList.length,
          index: imgIndex,
          initSwiper(el){
            for(var i=0;i<3;i++){
              swiperList.push({
                imgUrl: imgList[i],
                index: i,
                posX: el.clientWidth*i
              })
            }
          },
          moveing(el, {movePos}){ movePos_.value=movePos },
          movePage(el, {movePos, page}){
            if(imgIndex.value+page==0){
              var swiperItems=[0,1,2]
            }else if(imgIndex.value+page==imgList.length-1){
              var swiperItems=[imgList.length-3, imgList.length-2, imgList.length-1]
            }else{
              var swiperItems=[imgIndex.value+page-1, imgIndex.value+page, imgIndex.value+page+1]
            }
            
            swiperList.forEach((v,i)=>{
              var tem_index=utils.wrap(swiperItems, objValue({0: i,[imgList.length-1]: i-(page+imgIndex.value)+2}, page+imgIndex.value, i-(page+imgIndex.value)+1) )
              v.imgUrl=imgList[tem_index]
              v.posX=el.clientWidth*tem_index
            })
          },
          moveEnd(el,{movePos, page}){
            imgIndex.value += page
            movePos_.value=movePos
          }
        })

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

#### 连续滑动轮播功能
:::demo 连续滑动
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
          "https://scpic.chinaz.net/files/pic/pic9/202011/bpic21796.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29611.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29659.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/hpic3377.jpg",
          "https://scpic.chinaz.net/files/pic/pic9/202012/apic29464.jpg",
        ]
        var movePos_=ref(0)
        var swiperList = reactive([])
        var imgIndex = ref(0)

        let options = reactive({
          initSwiper(el){
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
            })
          },
          moveEnd(el,{movePos, page}){
            imgIndex.value = utils.wrap(0, imgList.length,imgIndex.value+page)
            movePos_.value=movePos
            swiperList.forEach(v=>{
              v.index=utils.wrap([-1,0,1],v.index+1 -page)
              v.posX=el.clientWidth*v.index
            })
          }
        })

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

#### 层叠滑动
:::demo
```html
  <template>
    <!-- <span>imgIndex= {{imgIndex}}</span> <span>movePage= {{movePage}}</span>
    <table style="font-size:10px;width:100%;">
      <tr> <td>#</td> <td>index</td> <td>tem_index</td> <td>posX</td> <td>opacity</td> </tr>
      <tr v-for="(v,k) in swiperList" :key="k"> <td>{{k}}</td> <td>{{v.index}}</td> <td>{{v.tem_index}}</td> <td>{{v.posX.toFixed(3)}}</td> <td>{{v.opacity.toFixed(1)}}</td> </tr>
    </table> -->
    <div v-swiper="options" class="cascade" :ref="swiperEl">
      <div v-for="v in swiperList" :style="{backgroundImage:`url(${v.imgUrl})`,transform:`translateX(${v.posX}px) scale(${v.rotate})`, zIndex: (4-v.tem_index+movePage)*10, opacity:v.opacity }" />
    </div>
  </template>
  <script>
    import { defineComponent, computed, ref, onMounted, reactive, watch } from 'vue';
    const {utils} = require("gsap").gsap;
    export default defineComponent({
      name:"cascade",
      setup(props, ctx){
          var imgList=[
            "http://img.sccnn.com/bimg/340/01968.jpg",
            "http://img.sccnn.com/bimg/340/01957.jpg",
            "http://img.sccnn.com/bimg/340/01803.jpg",
            "http://img.sccnn.com/bimg/340/01745.jpg",
            "http://img.sccnn.com/bimg/340/01693.jpg",
          ]
          var swiperList=reactive([]);
          var imgIndex = ref(0);
          var movePage = ref(0);
          var width = ref(0);
          var movePer = 0;
          watch(width,n=>{
            for(var i=-1;i<4;i++){
              swiperList.push({
                imgUrl: utils.wrap(imgList,i),
                index:i,
                tem_index:i,
                posX: i==-1?-width.value:i*width.value*movePer,
                rotate:1-(i==-1?0:i*0.1),
                opacity: i==3?0:1
              })
            }
          })
          
          let options = reactive({
            speeh:0.2,
            width,
            moveing(el,{movePos}){
              swiperList.forEach(v=>{
                v.posX = movePos+v.tem_index*width.value
                if(v.posX>0){
                  v.posX *=movePer
                  v.rotate = 1-(v.tem_index+movePos/width.value)*0.1
                }else{
                  v.rotate=1
                }
                v.opacity=(3*width.value*movePer - v.posX)/(width.value*movePer)
              })
            },
            movePage(el, {movePos, page}){
              movePage.value=page;
              var swiperItms=swiperList.map(v=>v.index+page).sort((a,b)=>a-b)
              swiperList.forEach(v=>{
                v.tem_index=utils.wrap(swiperItms,v.index-page+1)
                v.imgUrl=utils.wrap(imgList,imgIndex.value+v.tem_index )
              })
            },
            moveEnd(el, {movePos, page}){
              movePage.value=page;
              imgIndex.value = utils.wrap(0, imgList.length, imgIndex.value+page)
              swiperList.forEach(v=>{
                v.tem_index=v.index=utils.wrap([-1,0,1,2,3], v.index+1-page)
                this.moveing(el,{movePos, page})
              })
            }
          })
        return{
          options,
          swiperList,
          imgIndex,
          movePage,
          swiperEl(el){
            setTimeout(()=>{
              if(el&&el.clientWidth>0){
                movePer = (el.clientWidth*0.4-20)/2/9*10/(el.clientWidth*0.6)
                width.value= el.clientWidth*0.6+10
              }
            })
          },
        }
      }
    })
  </script>
```
:::

#### 翻页轮播
:::demo
```html
  <template>
    <!-- <span>imgIndex= {{imgIndex}}</span> <span>movePage= {{movePage}}</span>
    <table style="font-size:10px;width:100%;">
      <tr> <td>#</td> <td>index</td> <td>tem_index</td> <td>posX</td> <td>opacity</td> <td>rotate</td> </tr>
      <tr v-for="(v,k) in swiperList" :key="k"> <td>{{k}}</td> <td>{{v.index}}</td> <td>{{v.tem_index}}</td> <td>{{v.posX.toFixed(3)}}</td> <td>{{(2-(1-v.rotate)*10).toFixed(1)}}</td> <td>{{v.rotate.toFixed(1)}}</td> </tr>
    </table> -->
    <div class="turnPage">
      <div v-swiper="options" :ref="swiperEl">
        <div v-for="v in swiperList" :style="{backgroundImage:`url(${v.imgUrl})`,transform:`translateX(${v.posX}px) translateZ(${ v.rotate*10 }px) scale(${v.rotate})`, opacity:2-(1-v.rotate)*10 }" />
      </div>
    </div>
  </template>
  <script>
    import { defineComponent, computed, ref, onMounted, reactive, watch } from 'vue';
    const {utils} = require("gsap").gsap;
    export default defineComponent({
      name:"turnPage",
      setup(props, ctx){
          var imgList=[
            "http://img.sccnn.com/bimg/340/01968.jpg",
            "http://img.sccnn.com/bimg/340/01957.jpg",
            "http://img.sccnn.com/bimg/340/01803.jpg",
            "http://img.sccnn.com/bimg/340/01745.jpg",
            "http://img.sccnn.com/bimg/340/01693.jpg",
          ]
          var swiperList=reactive([]);
          var imgIndex = ref(0);
          var movePage = ref(0);
          var width = ref(0);
          var movePer = 0;
          watch(width,n=>{
            for(var i=-2;i<3;i++){
              swiperList.push({
                imgUrl: utils.wrap(imgList,i),
                index:i,
                tem_index:i,
                posX: i*width.value*movePer,
                rotate:1-Math.abs(i*0.1),
              })
            }
          })
          
          let options = reactive({
            speeh:0.2,
            width,
            moveing(el,{movePos}){
              swiperList.forEach((v,i)=>{
                v.posX = (movePos+v.tem_index*width.value)*movePer
                v.rotate = 1-Math.abs(v.tem_index+movePos/width.value)*0.1
              })
            },
            movePage(el, {movePos, page}){
              movePage.value=page;
              var swiperItms=swiperList.map(v=>v.index+page).sort((a,b)=>a-b)
              swiperList.forEach(v=>{
                v.tem_index=utils.wrap(swiperItms,v.index-page+1)
                v.imgUrl=utils.wrap(imgList,imgIndex.value+v.tem_index )
              })
            },
            moveEnd(el, {movePos, page}){
              movePage.value=page;
              imgIndex.value = utils.wrap(0, imgList.length, imgIndex.value+page)
              swiperList.forEach(v=>{
                v.tem_index=v.index=utils.wrap([-2,-1,0,1,2], v.index+1-page)
                this.moveing(el,{movePos, page})
              })
            }
          })
        return{
          options,
          swiperList,
          imgIndex,
          movePage,
          swiperEl(el){
            setTimeout(()=>{
              if(el&&el.clientWidth>0){
                movePer = (el.clientWidth*0.4-20)/2/(el.clientWidth*0.6)
                width.value= el.clientWidth*0.6
              }
            })
          },
        }
      }
    })
  </script>
```
:::

#### 下拉组件
:::demo
  ```html
    <template>
      <div style="padding:10px;color:#333;border:1px solid #ddd;" @click="isShow=!isShow">
        <Dpicker v-model:visible="isShow" :range="list">asdf</Dpicker>
      </div>
    </template>
    <script>
      import { defineComponent, computed, ref, onMounted, reactive, watch } from 'vue';
      export default defineComponent({
        name:"demo_picker",
        setup(){
          var isShow=ref(false);
          return{
            isShow,
            list:[1,2,3,4,5,6,7,8,9,10],
          }
        }
      })
    </script>
  ```
:::