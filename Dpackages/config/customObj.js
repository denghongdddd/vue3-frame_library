+function(){
    setTimeout(()=>{
        Object.prototype.dh_value_=function(key,defaultValue=null){
            if(this.hasOwnProperty(key))return this[key];
            return defaultValue
        }
    })
}()