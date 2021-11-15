+function customDate(){
  Date.prototype.format=function(fmt='yyyy-MM-dd hh:mm:ss.S', defaultValue='--/--'){
    if(this.toDateString()=='Invalid Date')return defaultValue
    var o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小时
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      'S': this.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(/(y+)/g, val=>(this.getFullYear() + '').substr(4 - val.length))
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(new RegExp('(' + k + ')','g'), val=>(val.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
  }
  Date.prototype.year = function(num){
    var value=parseInt(num)
    if(typeof value=='number'&&!isNaN(value)){
      this.setFullYear(value)
      return this
    }else{
      return this.getFullYear()
    }
  }
  Date.prototype.month = function(num){
    var value=parseInt(num)
    if(typeof value=='number'&&!isNaN(value)){
      this.setMonth(value)
      return this
    }else{
      return this.getMonth()
    }
  }
  Date.prototype.date = function(num){
    var value=parseInt(num)
    if(typeof value=='number'&&!isNaN(value)){
      this.setDate(value)
      return this
    }else{
      return this.getDate()
    }
  }
  Date.prototype.hour = function(num){
    var value=parseInt(num)
    console.log(value)
    if(typeof value=='number'&&!isNaN(value)){
      this.setHours(value)
      return this
    }else{
      return this.getHours()
    }
  }
  Date.prototype.minute = function(num){
    var value=parseInt(num)
    if(typeof value=='number'&&!isNaN(value)){
      this.setMinutes(value)
      return this
    }else{
      return this.getMinutes()
    }
  }
  Date.prototype.seconds = function(num){
    var value=parseInt(num)
    if(typeof value=='number'&&!isNaN(value)){
      this.setSeconds(value)
      return this
    }else{
      return this.getSeconds()
    }
  }
  Date.prototype.set = function(type,num){
    var value=parseInt(num)
    if(typeof value=='number'&&!isNaN(value)){
      if(/^year$|^y$/.test(type)){
        this.setFullYear(this.getFullYear() + value)
      }else if(/^month$|^M$/.test(type)){
        this.setMonth( this.getMonth()+ value )
      }else if(/^d$|^date$/.test(type)){
        this.setDate( this.getDate()+value )
      }else if(/^hour$|^h$/.test(type)){
        this.setHours( this.getHours()+value )
      }else if(/^minute$|^m$/.test(type)){
        this.setMinutes( this.getMinutes()+value )
      }else if(/^second$|^s$/.test(type)){
        this.setSeconds( this.getSeconds()+value )
      }else if(/^millisecond$|^S$/.test(type)){
        this.setMilliseconds( this.getMilliseconds()+value )
      }
    }
    return this
  }
  Date.prototype.startOfWeek = function(num=1){
    var value=parseInt(num)%7||7
    if(typeof value=='number'&&!isNaN(value)){
      this.date(1).set('d',num==this.getDay()?0:-('12345671234567'.replace(new RegExp(`(\\d*)(${num}\\d*${this.getDay()||7})(\\d*)`),'$2').length-1) )
    }
    return this
  }
  Date.prototype.endOf = function(type){
    if(/^year$|^y$/.test(type)){
      this.date(1).month(0).set('y',1).date(0).hour(23).minute(59).seconds(59)
    }else if(/^month$|^M$/.test(type)){
      this.date(1).set('M',1).date(0).hour(23).minute(59).seconds(59)
    }else if(/^d$|^date$/.test(type)){
      this.hour(23).minute(59).seconds(59)
    }
    return this
  }
}()
