/*
 * 修改个人中心 逻辑
 * 
 * 1. 把此用户的信息渲染进来
 * 2. 用模板引擎渲染进来，并且用input代替
 * 3. 必须用冒泡点击提交，因为页面是用js渲染进来的，获取不到节点
 * 4. 提交的时候要验证格式是否正确
 * 5. 调到个人中心页面
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm');
var _user           = require('service/user-service');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作，因为先加载js 后才后的节点，必须通过冒泡
        document.addEventListener('click',function(e){
        	var phoneVal 	= document.getElementById('phone').value;
        	var emailVal 	= document.getElementById('email').value;
        	var questionVal = document.getElementById('question').value;
        	var answerVal   = document.getElementById('answer').value;
        	if(e.target.innerHTML == "提交"){
	        	var userInfo = {
	                phone       : $.trim(phoneVal),
	                email       : $.trim(emailVal),
	                question    : $.trim(questionVal),
	                answer      : $.trim(answerVal)
	            },
		        validateResult = _this.validateForm(userInfo);
	            if(validateResult.status){
	                // 更改用户信息
	                _user.updateUserInfo(userInfo, function(res, msg){
	                    _mm.successTips(msg);
	                    window.location.href = './user-center.html';
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
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
        	var panelBody = document.getElementsByClassName('panel-body')[0];
            userHtml = _mm.renderHtml(templateIndex, res);
            panelBody.innerHTML = userHtml;
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
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
