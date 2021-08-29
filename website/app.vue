<template>
  <div id="app" :class="{ 'is-component': isComponent }">
      <router-view />
  </div>
</template>

<script>
import { use } from '@package/locale'
import zhLocale from '@package/locale/lang/zh-cn'

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
