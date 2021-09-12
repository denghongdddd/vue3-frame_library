<script>
import {
  defineComponent,
  h,
  computed,
  watch,
  getCurrentInstance,
  onMounted,
} from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ElScrollbar, ElMessageBox, ElConfigProvider } from 'element-plus'
import zhLocale from 'element-plus/packages/locale/lang/zh-cn'


export default defineComponent({
  name: 'App',

  setup() {
    const route = useRoute()

    const lang = computed(() => route.path.split('/')[1] || 'zh-CN')

    const isComponent = computed(() => /^component-/.test(route.name || ''))

    return {
      lang,
      isComponent,
    }
  },

  render() {
    const notComponent = !this.isComponent

    const content = [
      h(
        'div',
        {
          class: 'main-cnt',
        },
        [h(RouterView)]
      ),
    ]

    const contentWrapper = notComponent
      ? h(ElScrollbar, null, { default: () => content })
      : content

    return h(
      ElConfigProvider,
      {
        locale: zhLocale,
      },
      {
        default: () => {
          return h(
            'div',
            {
              id: 'app',
              class: {
                'is-component': this.isComponent,
              },
            },
            [ contentWrapper]
          )
        },
      }
    )
  },
})
</script>
