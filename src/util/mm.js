/**
 * 通用工具
 */
var Hogan = require('hogan');
var conf = {
	serverHost : ''
};

var _mm = {
	//网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type  		: param.method || 'get',
			url   		: param.url    || '',
			dataType	: param.type   || 'json',
			data        : param.data   || '',
			success     : function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				//无登陆状态，需要强制登陆
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1  === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
				
			},
			error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
			
		});
	},
	//获取服务器的地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	getUrlParam : function(name){
		//baidu.com/product/list?keyword=1&page=2(获取1)
		var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result 	= window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染html模板
	renderHtml 	: function(htmlTemplate, data){
		var template = Hogan.compile(htmlTemplate),
			result   = template.render(data);
		return result;
	},
	//成功提示
	successTips : function(msg){
		alert( msg || '操作成功！');
	},
	//错误提示
	errorTips : function(msg){
		alert( msg || '出现错误');
	},
	//表单验证，支持非空，手机，邮箱
	validate  : function(value, type){
		var value = $.trim(value);
		// 非空验证
        if('require' === type){
            return !!value;//确保返回的是布尔值
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
	},
	//统一 登陆处理
	doLogin 	: function(){
		window.location.href = './user-login.html?redirect =' + encodeURIComponent(window.location.href);
	},
	goHome		: function(){
		window.location.href = './index.html';
	},
	// 添加某个对象class类
	addClass : function addClass(obj, cls){
	  var obj_class = obj.className,//获取 class 内容.
	  blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
	  added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
	  obj.className = added;//替换原来的 class.
	},
	// 移除某个对象class类
	removeClass : function removeClass(obj, cls){
	  var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
	  obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
	  removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
	  removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
	  obj.className = removed;//替换原来的 class.
	},
	//判断某个对象有没有class类
	hasClass : function hasClass(obj, cls){
	  var obj_class = obj.className,//获取 class 内容.
	  obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
	  x = 0;
	  for(x in obj_class_lst) {
	    if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
	      return true;
	    }
	  }
	  return false;
	}
}
module.exports = _mm;