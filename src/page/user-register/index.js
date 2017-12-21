/*
 * 注册逻辑 
 */



/*
 * 登陆逻辑
 * 1.点击登陆按钮，信息验证
 * 2.验证信息包括格式，为空，存不存在
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
		//验证username 是不是合法，存不存在
		var usernameInp = document.getElementById('username');
		usernameInp.onblur  = function(){
			var usernameVal = $.trim(this.value);
			//用户名为空不做验证
			if(!usernameVal){
				return;
			}
			//异步验证用户名是不是存在
			_user.checkUsername(usernameVal,function(){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			})
		}
		//注册登陆按钮
		var submitBtn 	= document.getElementById('submit');
		var passwordInp = document.getElementsByClassName('user-content')[1];
		var userContent = document.getElementsByClassName('user-content');
		submitBtn.onclick = function(){
			_this.submit();			
		}
		//按下回车，提交表单,以后改进可以用委托
		for(var i=0;i<userContent.length;i++){
			userContent[i].onkeyup = function(e){
			if(e.keyCode === 13){
				_this.submit();
				}
			}
		}
	},
	submit	  : function(){
		var usernameVal 		= document.getElementById('username').value;
		var passwordVal 		= document.getElementById('password').value;
		var passwordConfirmVal  = document.getElementById('password-confirm').value;
		var phoneVal 			= document.getElementById('phone').value;
		var emailVal 			= document.getElementById('email').value;
		var questionVal 		= document.getElementById('question').value;
		var answerVal 			= document.getElementById('answer').value;
		var formData	= {
                username 		: $.trim(usernameVal),
                password 		: $.trim(passwordVal),
                passwordConfirm : $.trim(passwordConfirmVal),
                phone	 		: $.trim(phoneVal),
                email	 		: $.trim(emailVal),
                question 		: $.trim(questionVal),
                answer	 		: $.trim(answerVal)
         };
        // 表单验证结果
        validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
        	//提交
        	_user.register(formData,function(res){
        		window.location.href = './result.html?type=register';
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
		if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
		if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
            return result;
		}
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
            return result;
		}
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题不能为空';
            return result;
		}
		if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示答案不能为空';
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
