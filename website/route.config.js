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

const load = function (path) {
  return getAsyncComponent(() =>import(`./pages/${path}.vue`) )
}

const loadDocs = function ( path) {
  return getAsyncComponent(() =>import(`./docs${path}.md`) )
}

const registerRoute = () => {
  let route={
    path: `/zh-CN/component`,
    redirect: `/zh-CN/component/installation`,
    component: load('component'),
    children: [],
  }
  navConfig.forEach( nav=>{
    if(nav.href)return
    if(nav.groups){
      nav.groups.forEach(group=>{
        route.children=route.children.concat(group.list.map(navSup=> addRoute(navSup)))
      })
    }else if(nav.children){
      route.children=route.children.concat(nav.children.map(navSup=>addRoute(navSup)))
    }else route.children=route.children.concat(addRoute(nav))
  })
  function addRoute(page){
    const component = page.path=='/changelog'?load('changelog'):loadDocs(page.path)
    return {
      path: page.path.slice(1),
      meta:{
        title: page.title || page.name,
        description: page.description,
        lang: 'zh-CN',
      },
      name: 'component-zh-CN'+(page.title||page.name),
      component: component.default||component,
    }
  }
  return [route]
}
let route = registerRoute()

route = route.concat([
  {
    path: `/zh-CN`, // 首页
    meta: { lang:'zh-CN' },
    name: 'homezh-CN',
    component: load('index'),
  },
  {
    path: '/',
    redirect: { path: `/zh-CN/component/installation` },
  },
  {
    path: '/*',
    redirect: { path: `/zh-CN/component/installation` },
  },
])

export default route
