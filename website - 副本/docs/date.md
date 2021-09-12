## date 时间类
------------------

|方法名	|说明	|参数	|
|-------|-------|-------|
|format	| 返回自定义格式日期 | fmt: 格式内容<br/>defaultValue: 无值时的默认值 |
| year | 返回年 | number:修改年份,不传参数返回年份 |
| month | 返回月 | number:修改月,不传参数返回月 |
| date | 返回日期 | number:修改日期,不传参数返回日期 |
| hour | 返回小时 | number:修改小时,不传参数返回小时 |
| minute | 返回分 | number:修改分,不传参数返回分 |
| seconds | 返回秒 | number:修改秒,不传参数返回秒 |
| set | 修改时间 | type: 类型`year|y`、`month|M`、`date|d`、`hour|h`、`minute|m`、`second|s`、`millisecond|S` <br/> num: 修改的值 |
| starOfMonth | 设置时间为当月显示的第一个星期 | num: 开始星期 `默认:1` `范围：1~7` |
| endOf | 设置为时间的结尾 | type: 类型 `year|y`、`month|M`、`date|d` |
| copy | 返回一新的日期对象 |  |
#### 例如:
<span style="color:#888;font-size:9px;">new Date().set("M", -1).set("d",3).format("yyyy年MM月dd日 hh:mm:ss.S")</span>
<span style="color:#ffa604;margin-left:5px;">//减1个月,加3天</span><br/>
<span style="color:#888;"> {{new Date().set("M", -1).set("d",3).format("yyyy年MM月dd日 hh:mm:ss.S")}}</span>


-----------------
## 延迟类
:::demo 创建延迟3秒的对象
  ```html
    <template>
      <table class="default">
        <tr> <td>立刻运行</td><td><button @click="add.now('----test------')">累计</button></td><td rowspan="5">{{num}}</td> </tr>
        <tr> <td>运行后延迟</td><td><button @click="add.before('----test------')">累计</button></td> </tr>
        <tr> <td>运行前延迟</td><td><button @click="add.after('----test------')">累计</button></td> </tr>
        <tr> <td>运行前延迟,延迟中有调用过,结束后回再次运行一次</td><td><button @click="add.proceed('----test------')">累计</button></td> </tr>
        <tr> <td>监听延迟</td><td>{{listenerStatu}}</td> </tr>
      </table>
    </template>
    <script>
    const { delay } = require("black-knight/config/utils.js")
      export default{
        data(){
          return{
            num:0,
            add: new delay(async (e)=>{
              console.log(e)
              this.num++
            },3000),
            listenerStatu:"未开始",
          }
        },
        mounted(){
          this.add.addEventListener("begin",()=>{
            this.listenerStatu="延迟中..."
          })
          this.add.addEventListener("end",()=>{
            this.listenerStatu="延迟结束"
          })
        },
        methods:{

        },
        
      }
    </script>
  ```
:::

<br/>

## 排序
##### 归并排序
```js
function mergoSort(arr){
    if(arr.length>1){
        var len=Math.floor(arr.length/2)
        var left=mergoSort(arr.slice(0,len))
        var right=mergoSort(arr.slice(len))
        var result=[]
        while(left.length>0&&right.length>0){
            if(left[0]<=right[0]){
                result.push(left.shift())
            }else{
                result.push(right.shift())
            }
        }
        return result.concat(left).concat(right)
    }
    return arr
}
```
##### 插入排序
```js
function insertionSort(arr){
  for(var i=arr.length-2;i>=0;i--){
      var current=arr[i]
      arr.slice(i).some((v,k,_arr)=>{
          arr[i+k]=current>_arr[k+1]?arr[i+k+1]:current
          return current<=_arr[k+1]
      })
  }
  return arr
}
```