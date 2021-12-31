import { defineAsyncComponent } from 'vue'
import navConfig from './nav.config'
import { createRouter, createWebHashHistory } from 'vue-router'

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

let routes = registerRoute().concat([
  {
    path: `/`, // 首页
    meta: { lang:'zh-CN' },
    name: 'homezh-CN',
    // component: load('index'),
    redirect:{path:'/zh-CN/component/installation'},
  },
  {
    path: '/*',
    redirect: { path: `/zh-CN/component/installation` },
  },
])
const router=createRouter({
  history: createWebHashHistory(),
  routes,
})

router.isReady().then(() => {
  // let lang = location.hash.split('/')[1]
  // let langConfig = compLang.filter( config => config.lang === lang)[0][
  //   'demo-block'
  // ]

  //   app.config.globalProperties.$copySvgIcon = (iconName) => {
  //     clipboardCopy(
  //       `<el-icon>
  //   <${hyphenate(iconName)} />
  // </el-icon>
  //       `
  //     )
  //       .then(() => {
  //         app.config.globalProperties.$message({
  //           showClose: true,
  //           message: langConfig['copy-success'],
  //           type: 'success',
  //         })
  //       })
  //       .catch(() => {
  //         app.config.globalProperties.$message({
  //           showClose: true,
  //           message: langConfig['copy-error'],
  //           type: 'error',
  //         })
  //       })
  //   }
  router.afterEach(async route => {
    await nextTick()
    document.title = '自定义组件框架'
    ga('send', 'event', 'PageView', route.name)
  })
})

export default router
