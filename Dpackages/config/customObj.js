+function(){
  setTimeout(()=>{
    Array.prototype.dFor=function(call){
      for(var i in this){
        var res=call(i,this[i],this)
        if(!res)return
      }
    }
  })
}()
