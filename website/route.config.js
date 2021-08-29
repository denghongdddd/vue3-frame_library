import { defineAsyncComponent } from 'vue'
import navConfig from './nav.config'

const LoadingComponent = {
  template: `<div v-loading="true" style="min-height: 500px; width: 100%;"></div>`,
}
const ErrorComponent = {
  template: `
    <div style="text-align: center;padding: 100px 0;">Loading error. Please refresh the page and try again</div>`,
}
const getAsyncComponent = func => {
  return defineAsyncComponent({
    loader: func,
    delay: 0,
    timeout: 30000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
  })
}

const load = function(path) {
  return getAsyncComponent(() => import( `./pages/${path}.vue`))
}

const registerRoute = navConfig => {
  let route = [{
    path: `/`,
    redirect: `/installation`,
    component: load('component'),
    children: [],
  }]
  navConfig.forEach(nav => {
    if (nav.href) return
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  
  function addRoute(page) {
    const component = getAsyncComponent(() => import( `./docs${page.path}.md`))
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang:"zh-CN"
      },
      name: 'component-zh-CN' + (page.title || page.name),
      component: component.default || component,
    }

    route[0].children.push(child)
  }
  return route
}

let route = registerRoute(navConfig)

route = route.concat([{
  path: '/*',
  redirect: { path: `/zh-CN` },
}])

export default route
