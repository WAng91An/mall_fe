/*
 * nav-side js逻辑
 * 1.渲染导航内容，根据传进来的值，把相应的页面导航变成active
 * 2.把渲染后的html放入容器
 */
require('./index.css');
var _mm     		  = require('util/mm');
var templateIndex     = require('./index.string');


// 侧边导航
var navSide = {
	option : {
		name : '',
		navList	: [
			{name : 'user-center', desc : '个人中心',  href : './user-center.html'},
			{name : 'order-list',  desc : '我的订单',  href : './order-list.html'},
			{name : 'user-pass-update', desc : '修改密码',  href : './user-pass-update.html'},
			{name : 'about',       desc : '关于WMall', href : './about.html'}
		]
	},
    init : function(option){
    	//合并选项
    	$.extend(this.option, option);
      	this.renderNav();
    },
    	//渲染导航内容
    renderNav : function(){
    	var navSideUl = document.getElementsByClassName('nav-side')[0];
    	//计算active数据
    	for (var i = 0 ,iLength = this.option.navList.length ; i< iLength; i++) {
    		if(this.option.navList[i].name === this.option.name){
    			this.option.navList[i].isActive = true;
    		}
    	};
    	// 渲染list数据
    	var navHtml = _mm.renderHtml(templateIndex,{
    		navList : this.option.navList
    	});
    	//把HTML放入容器
    	navSideUl.innerHTML = navHtml;
    }
};

module.exports = navSide;