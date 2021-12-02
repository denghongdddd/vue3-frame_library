+function(){
  setTimeout(()=>{
    Array.prototype.dFor=function(call){
      for(var i in this){
        var res=call(i,this[i],this)
        if(!res)return
      }
    }
    Object.prototype.dDel=function(){
      var list=[].concat(...arguments)
      var keys=Object.keys(this)
      for(var i of keys){
        if(!list.some(v=>v==i)){
          delete this[i]
        }
      }
      return (val={})=>{
        Object.assign(this,val)
      }
    }
  })
}()
