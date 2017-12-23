/*
 * 用户中心逻辑
 * 1. 初始化左侧菜单
 * 2.加载用户信息
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
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
        	var panelBody		 = document.getElementsByClassName('panel-body')[0];
            userHtml			 = _mm.renderHtml(templateIndex, res);
            panelBody.innerHTML  = userHtml;
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
window.onload = function(){
	 page.init();
}
