+function(){
  setTimeout(()=>{
    Object.prototype.dh_value_=function(key,defaultValue=null){
      if(this.hasOwnProperty(key))return this[key]
      return defaultValue
    }
  })
}()

+function(){
  console.log("----------------------asdfasf----")
  Array.prototype.dFor=function(call){
    for(var i in this){
      var res=call(i,this[i],this)
      if(!res)return
    }
  }
}()
