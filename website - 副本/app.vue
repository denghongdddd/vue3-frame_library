<template>
  <div id="app" :class="{ 'is-component': isComponent }">
      <router-view />
  </div>
</template>

<script>
import { use } from 'element-plus/es/locale'
import zhLocale from 'element-plus/es/locale/lang/zh-cn'

/**加载中文版 */
use(zhLocale)

export default {
  name: 'App',
  computed: {
    isComponent() {
      return /^component-/.test(this.$route.name || '')
    },
  },
  mounted(){
    use(zhLocale)
  }
}
</script>
