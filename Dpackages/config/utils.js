/**类型判断 */
export const dataType=function(target,...str){
	return str.indexOf( Object.prototype.toString.call(target).slice(8,-1).toLocaleLowerCase() )>=0
}
/** 身份证验证 */
export const IDCode=function (data) {
	// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
	// 加权因子
	var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	// 校验码
	var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

	var code = data + "";
	var last = data[17]; //最后一位

	var seventeen = code.substring(0, 17);

	// ISO 7064:1983.MOD 11-2
	// 判断最后一位校验码是否正确
	var arr = seventeen.split("");
	var len = arr.length;
	var num = 0;
	for (var i = 0; i < len; i++) {
	  num = num + arr[i] * weight_factor[i];
	}

	// 获取余数
	var resisue = num % 11;
	var last_no = check_code[resisue];

	// 格式的正则
	// 正则思路
	/*
	第一位不可能是0
	第二位到第六位可以是0-9
	第七位到第十位是年份，所以七八位为19或者20
	十一位和十二位是月份，这两位是01-12之间的数值
	十三位和十四位是日期，是从01-31之间的数值
	十五，十六，十七都是数字0-9
	十八位可能是数字0-9，也可能是X
	*/
	var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

	// 判断格式是否正确
	var format = idcard_patter.test(data);

	// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
	if (last === last_no && format) {
	  console.log("身份证验证正确");
	} else {
	  return false
	}
	return true;
}
/**
 * @param {string} ***.com?url
 * @returns {Object}
 */
export function getQueryObject(url) {
	url = url == null ? window.location.href : url
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, (rs, $1, $2) => {
	  const name = decodeURIComponent($1)
	  let val = decodeURIComponent($2)
	  val = String(val)
	  obj[name] = val
	  return rs
	})
	return obj
}
/**去掉首位空格 */
export function trim() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**字符串转 base64 */
export const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
export function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += _keyStr.charAt(c1 >> 2);
            out += _keyStr.charAt((c1 & 0x3) << 4);
            out += "==";
            break
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += _keyStr.charAt(c1 >> 2);
            out += _keyStr.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += _keyStr.charAt((c2 & 0xF) << 2);
            out += "=";
            break
        }
        c3 = str.charCodeAt(i++);
        out += _keyStr.charAt(c1 >> 2);
        out += _keyStr.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += _keyStr.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += _keyStr.charAt(c3 & 0x3F)
    }
    return out
}
/**base64 转字符串 */
export function base64decode(base){
	var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        base = base.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < base.length) {
            enc1 = _keyStr.indexOf(base.charAt(i++));
            enc2 = _keyStr.indexOf(base.charAt(i++));
            enc3 = _keyStr.indexOf(base.charAt(i++));
            enc4 = _keyStr.indexOf(base.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
	return output;
}
/**base64 转二进制 */
export function base64Binary(base64) {
	const map = { "0": 52, "1": 53, "2": 54, "3": 55, "4": 56, "5": 57, "6": 58, "7": 59, "8": 60, "9": 61, "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25, "a": 26, "b": 27, "c": 28, "d": 29, "e": 30, "f": 31, "g": 32, "h": 33, "i": 34, "j": 35, "k": 36, "l": 37, "m": 38, "n": 39, "o": 40, "p": 41, "q": 42, "r": 43, "s": 44, "t": 45, "u": 46, "v": 47, "w": 48, "x": 49, "y": 50, "z": 51, "+": 62, "/": 63 }
    let len = base64.length * .75 // 转换为int8array所需长度
	base64 = base64.replace(/=*$/, '') // 去掉=号（占位的）

	const int8 = new Int8Array(len) //设置int8array视图
	let arr1, arr2, arr3, arr4, p = 0
	for (let i = 0; i < base64.length; i += 4) {
		arr1 = map[base64[i]] // 每次循环 都将base644个字节转换为3个int8array直接
		arr2 = map[base64[i + 1]]
		arr3 = map[base64[i + 2]]
		arr4 = map[base64[i + 3]]
		// 假设数据arr 数据 00101011 00101111 00110011 00110001
		int8[p++] = arr1 << 2 | arr2 >> 4
		// 上面的操作 arr1向左边移动2位 变为10101100
		// arr2 向右移动4位：00000010
		// | 为'与'操作: 10101110
		int8[p++] = arr2 << 4 | arr3 >> 2
		int8[p++] = arr3 << 6 | arr4

		}
	return int8
}
export const _utf8_decode = function (utftext) {
	var string = "";
	var i = 0;
	var c = 0;
	var c2 = 0;
	while ( i < utftext.length ) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}

/**深度复制对象 */
export function cloneDeep(obj, defaultValue = obj){
	if(dataType(obj,"array")){
		return obj.reduce((result, val)=>[...result,cloneDeep(val,val)],[])
	}else if(dataType(obj, 'object')){
		return Object.keys(obj).reduce( (result, key)=>({...result, [key]:cloneDeep(obj[key],obj[key])}), {} )
	}
	return defaultValue;
}
/**cookies 设置 */
export const cookies={
	set(name, value, times) {
		var exp = new Date();
		exp.setTime(exp.getTime() + times);
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;expires=" + exp.toUTCString();
	},
	get(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
			return decodeURIComponent(arr[2]);
			return null;
		}
	},
	del(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.Get(name);
		if (cval != null) {
			document.cookie = name + "=" + encodeURIComponent(cval) + ";path=/;expires=" + exp.toUTCString();
		}
	}
}
/**判断是否为空 */
export function isEmpty(val) {
	if (
		!val && val !== 0 ||
		dataType(val, "array") && !val.length ||
		dataType(val, "object") && !Object.keys(val).length
	) return true

	return false
}

/**订阅者 */
export function provise(){
	let subscriber={}
	this.on=(name,callback)=>{
		if(name&&callback instanceof Function){
			if(subscriber[name] instanceof Function){
				console.error(`${name} 事件已经被定义为一次性回调！`)
				return ()=>{ }
			}else{
				let callbackList = subscriber[name]||[]
				if((subscriber[name]||[]).indexOf(callback)<0){
					callbackList.push(callback)
					subscriber[name]=callbackList
				}
				return ()=>{
					this.off(name,callback)
				}
			}
		}else {
			console.error(`${callback} 回调函数不合规！`)
			return ()=>{ }
		}
	}
	this.one=(name,callback)=>{
		if(name&&callback instanceof Function){
			if(subscriber[name] instanceof Array){
				console.error(`${name} 事件已经被定义！`)
			}else{
				subscriber[name]=callback
			}
		}
	}
	this.onSync=(name, callback, time)=>{
		if(name&&callback instanceof Function){
			let callbackList = subscriber[name]||[]
			if((subscriber[name]||[]).indexOf(callback)<0){
				callbackList.push(proceed(callback, time))
				subscriber[name]=callbackList
			}
			return ()=>{ this.off(name, callback) }
		}else {
			console.error(`${callback} 回调函数不合规！`)
			return ()=>{ }
		}
	}
	
	this.emit=(name,...arr)=>{
		if(name&&subscriber[name]){
			if(subscriber[name] instanceof Function){
				subscriber[name]?.(...arr)
				this.off(name)
			}else if(subscriber[name] instanceof Array){
				var callbackList=[].concat(subscriber[name])
				callbackList.forEach(async v=>{
					if(subscriber[name].indexOf(v)>=0){
						if(await v(...arr)){
							this.off(name,v)
						}
					}
				})
			}
		}
	}
	
	this.off=(name,callback)=>{
		if(name&&subscriber[name]){
			if(typeof callback === "function"){
				var index=subscriber[name].indexOf(callback);
				if(index>=0)subscriber[name].splice(index,1);
				if(subscriber[name].length==0) delete subscriber[name];
			}else{
				delete subscriber[name]
			}
		}
	}
}
/**
 * 同步方法
 */
function proceed(callback,time=100){
	let runing=false;
	let only=true;
	
	let newV=null;
	let backup=null;
	let exec=async function(...args){
		if(newV===null){
			newV=args
		}else{
			backup=args
		}

		only=true
		if(!runing){
			runing=true;
			only=false;
			typeof callback==='function'&&await callback(...newV);
			setTimeout(()=>{
				newV=backup;
				backup=null;

				runing=false
				if(only){
					exec(...newV)
				}else{
					newV=null;
				}
			}, time)
		}
	}
	return exec;
}

/**延时方法 */
export function delay(fun, durating=0){
	var runing=false;
	var only = true;
	var _time=null;
	var event={};
	this.before=async function(...args){
		if(!runing){
			runing=true;
			typeof fun=="function"&&await fun.bind(this)(...args)
			clearTimeout(_time)
			typeof event["wait"]=="function"&&event["wait"]()
			_time=setTimeout(()=>{
				typeof event["end"]=="function"&&event["end"]()
				runing=false
			}, durating)
		}
	}
	this.after=function(...args){
		if(!runing){
			runing=true;
			clearTimeout(_time);
			typeof event["wait"]=="function"&&event["wait"]()
			_time=setTimeout(async ()=>{
				typeof event["end"]=="function"&&event["end"]()
				typeof fun=="function"&&await fun.bind(this)(...args)
				runing=false
			}, durating)
		}
	}
	this.now=async function(...args){
		// if(!runing){
			clearTimeout(_time);
			typeof event["wait"]=="function"&&event["wait"]()
			runing=true;
			typeof fun=="function"&&await fun.bind(this)(...args);
			typeof event["end"]=="function"&&event["end"]()
			runing=false
		// }
	}
	let newValue=null;
	let backup=null;
	this.proceed=function(...args){
		if(newValue===null){
			newValue=args
		}else{
			backup=args
		}
		
		only=true;
		if(!runing){
			runing=true;
			only=false;
			clearTimeout(_time)
			typeof event["wait"]=="function"&&event["wait"]()
			_time=setTimeout(async ()=>{
				typeof fun=="function"&&await fun.bind(this)(...newValue)

				runing=false;
				typeof event["end"]=="function"&&event["end"]()

				newValue=backup;
				backup=null;

				if(only){
					this.proceed(...newValue)
				}else{
					newValue=null;
				}
			}, durating)
		}
	}
	this.addEventListener = function(name, listener){
		event=event||{}
		if(typeof listener=="function"){
			event[name]=listener
		}
	}
	this.removeEventListener = function(name){
		if(name){
			delete event[name]
		}else{
			event=null
		}
	}
	this.destroyed=function(){
		event=null;
		clearTimeout(_time)
	}
}
