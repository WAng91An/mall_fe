/*
 * 用户密码修改
 * 
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm');
var _user           = require('service/user-service');
// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作，因为先加载js 后才后的节点，必须通过冒泡
        document.addEventListener('click',function(e){
        	var passwordVal 		= document.getElementById('password').value;
        	var passwordNewVal 		= document.getElementById('password-new').value;
        	var passwordConfirmVal  = document.getElementById('password-confirm').value;
        	if(e.target.innerHTML == "提交"){
	        	var userInfo = {
	                password       	   : $.trim(passwordVal),
	                passwordNew        : $.trim(passwordNewVal),
	                passwordConfirm    : $.trim(passwordConfirmVal),
	            },
		        validateResult = _this.validateForm(userInfo);
	            if(validateResult.status){
	                // 更改密码
	                _user.updatePassword({
	                	passwordOld : userInfo.password,
	                	passwordNew : userInfo.passwordNew
	                }, function(res, msg){
	                    _mm.successTips(msg);
	                }, function(errMsg){
	                    _mm.errorTips(errMsg);
	                });
	            }
	            else{
	                _mm.errorTips(validateResult.msg);
	            }
        	}
        },true);
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是不是空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码不得少于6位 ';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(formData.passwordNew != formData.passwordConfirm){
            result.msg = '两次输入的密码不一样';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
window.onload = function(){
	page.init();
}
