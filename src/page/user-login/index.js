
/*
 * 登陆逻辑
 * 1.点击登陆按钮，信息验证
 * 2.按下回车，提交表单
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm         = require('util/mm');
var _user       = require('service/user-service');
//表单里面的错误提示
var formError = {
	show : function(errMsg){
		var errorItem  		= document.getElementsByClassName('error-item')[0];
		var errMsgShow	    = errorItem.getElementsByClassName('err-msg')[0];
		errorItem.style.display = 'block';
		errMsgShow.innerHTML 	= errMsg;
	},
	hide : function(){
		var errorItem  		= document.getElementsByClassName('error-item')[0];
		var errMsgShow	    = errorItem.getElementsByClassName('err-msg')[0];
		errorItem.style.display = 'none';
		errMsgShow.innerHTML 	= '';
	}
}

var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击登陆按钮
		var submitBtn 	= document.getElementById('submit');
		var passwordInp = document.getElementsByClassName('user-content')[1];
		submitBtn.onclick = function(){
			_this.submit();			
		}
		//按下回车，提交表单
		passwordInp.onkeyup = function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		}
	},
	//点击提交的方法，是否合法，合法就跳转
	submit	  : function(){
		var usernameVal = document.getElementById('username').value;
		var passwordVal = document.getElementById('password').value;
		var formData	= {
                username : $.trim(usernameVal),
                password : $.trim(passwordVal)
          };
          console.log( formData.password)
          console.log( formData.username)
        // 表单验证结果
        validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
        	//提交
        	_user.login(formData,function(res){
        		window.location.href = _mm.getUrlParam('redirect') || './index.html';
        	},function(errMsg){
        		formError.show(errMsg);
        	});
        }
        // 验证失败
        else{
        	formError.show(validateResult.msg);
        }
		
	},
	//表单的验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg    : ''
		}
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
            return result;
		}
		if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
		// 通过验证，返回正确提示
		result.status   = true;
        result.msg      = '验证通过';
        return result;
		
	}
};
window.onload  = function(){
	page.init();
}
