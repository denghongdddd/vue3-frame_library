import axios from 'axios'

export const source = axios.CancelToken.source;

export default {
    install(Vue, opts = {}) {
        Vue.prototype.$Dhttp = axios.create({
            baseURL: '/', // url = base url + request url
            // withCredentials: true, // send cookies when cross-domain requests
            // cancelToken:source().token,取消请求 source().cancel()
            timeout: 5000 // request timeout
        })
        /**请求前拦截 */
        Vue.prototype.$Dhttp.interceptors.request.use(
            config=>{
                if(!opts.host||typeof opts.host=="string"){
                    config.baseURL = opts.host||'/'
                }else if(typeof opts.host=='function'){
                    config.baseURL = opts.host(config.host)
                }else{
                    console.error("请设置options.host: string | object")
                }

                config.headers = Object.assign(opts.headers||{},config.headers)

                if (typeof config.pathData === 'object') {
                    for (var key in config.pathData) {
                        config.url = config.url.replace(new RegExp(`/:${key}(\\/|$)`), "/"+encodeURIComponent(config.pathData[key])+"$1" )
                    }
                }
                if(config.formData){ //表单数据
                config.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8"
                var formData = new FormData()
                for(var i in config.formData){
                    formData.append(i,config.formData[i])
                }
                config.data=formData
                }
                
                return opts.request&&opts.request(config)||config;
            },
            error => {
                console.error("请求配置出错,",error)
                return Promise.reject(error)
            }
        )
        /**请求后拦截 */
        Vue.prototype.$Dhttp.interceptors.response.use(
            response=>opts.success&&opts.success(response),
            error=>{
                if(error.code=="ECONNABORTED")return { statu: false, msg: "请求超时!" }
                return { statu: false, msg: opts.success&&opts.fail(error)||'服务器错误!' };
            },
        )
    }
}