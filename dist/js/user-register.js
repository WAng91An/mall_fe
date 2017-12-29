webpackJsonp([5],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 
 * 用户登录网络请求
 */
var _mm     = __webpack_require__(0);

var _user = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 用户注册
    register : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 重置密码
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(65);


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 注册逻辑 
 */



/*
 * 登陆逻辑
 * 1.点击登陆按钮，信息验证
 * 2.验证信息包括格式，为空，存不存在
 */
__webpack_require__(66);
__webpack_require__(10);
var _mm         = __webpack_require__(0);
var _user       = __webpack_require__(1);
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


/***/ }),

/***/ 66:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[64]);