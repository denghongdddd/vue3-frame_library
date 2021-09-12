import { defineAsyncComponent } from 'vue'
import navConfig from './nav.config'

const LoadingComponent = {
  template: `<div v-loading="true" style="min-height: 500px; width: 100%;"></div>`,
}
const ErrorComponent = {
  template: `
    <div style="text-align: center;padding: 100px 0;">Loading error. Please refresh the page and try again</div>`,
}
const getAsyncComponent = (func) => {
  return defineAsyncComponent({
    loader: func,
    delay: 0,
    timeout: 30000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
  })
}

const load = function (path) {
  return getAsyncComponent(() =>
    import(`./pages/${path}.vue`)
  )
}

const loadDocs = function (lang, path) {
  return getAsyncComponent(() =>
    import(`./docs/zh-CN${path}.md`)
  )
}

const registerRoute = (navConfig) => {
  let route = []
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang]
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/installation`,
      component: load('component'),
      children: [],
    })
    navs.forEach((nav) => {
      if (nav.href) return
      if (nav.groups) {
        nav.groups.forEach((group) => {
          group.list.forEach((nav) => {
            addRoute(nav, lang, index)
          })
        })
      } else if (nav.children) {
        nav.children.forEach((nav) => {
          addRoute(nav, lang, index)
        })
      } else {
        addRoute(nav, lang, index)
      }
    })
  })
  function addRoute(page, lang, index) {
    const component =
      page.path === '/changelog'
        ? load('changelog')
        : loadDocs(lang, page.path)
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang,
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component,
    }

    route[index].children.push(child)
  }
  return route
}

let route = registerRoute(navConfig)

route = route.concat([
  {
    path: `/zh-CN`, // 首页
    meta: { lang:'zh-CN' },
    name: 'homezh-CN',
    component: load('index'),
  },
  {
    path: '/',
    redirect: { path: `/zh-CN` },
  },
  {
    path: '/*',
    redirect: { path: `/zh-CN` },
  },
])

export default route
