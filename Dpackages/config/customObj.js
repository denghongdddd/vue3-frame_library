+function(){
    Object.prototype._value_=function(key,defaultValue=''){
        if(this.hasOwnProperty(key))return this[key];
        return defaultValue
    }
}()