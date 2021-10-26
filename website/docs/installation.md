<!-- > 由于 Vue3 不再支持 IE11，故而 ElementPlus 也不支持 IE11 及之前版本。 -->

<!-- ```shell
$ npm install element-plus --save
``` -->

<!-- ```html
<head>
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <script src="//unpkg.com/vue@next"></script>
  <script src="//unpkg.com/element-plus"></script>
</head>
``` -->

<!-- :::tip
我们建议使用 **CDN** 引入 `ElementPlus` 的用户在链接地址上锁定版本，以免将来 `ElementPlus` 升级时受到非兼容性更新的影响。锁定版本的方法请查看
[unpkg.com](https://unpkg.com)。
::: -->

<!-- :::demo vue2,vue3切换

```html
<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
  }
</script> -->
<!--
<setup>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      return {}
    }
  })
</setup>
-->
<!-- ```

::: -->

<!-- 引用资源 examples => website 文件夹位置
<img src="~examples/assets/images/Axure-Components.svg" alt=""> -->

## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm install git+https://codeup.aliyun.com/616d4e5f326ff4ef76a9842f/denghongdddd/vue3-frame_library.git --save
```