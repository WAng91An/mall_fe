webpackJsonp([7],{

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

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(62);


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {


/*
 * 登陆逻辑
 * 1.点击登陆按钮，信息验证
 */
__webpack_require__(63);
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


/***/ }),

/***/ 63:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[61]);