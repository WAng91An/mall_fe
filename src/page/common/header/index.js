/**
 * 1. keyword 存在，则回填输入框
 * 2. 点击Go后做搜索提交
 * 3. 输入回车后，做搜索提交
 * 4. 提交的时候有keyword,正常跳转到list页面
 * 5. 如果keyword为空，直接回到首页面
 */
require('./index.css');
var _mm     = require('util/mm');

//通用页面头部
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var searchInput = document.getElementById('search-input');
		var keyword = _mm.getUrlParam('keyword');
		//keyword 存在，则回填输入框
		if(keyword){
			searchInput.value = keyword;
		}
	},
	bindEvent : function(){
		var _this = this;
		var searchInput = document.getElementById('search-input');
		var searchBtn = document.getElementById('search-btn');
		//电击Go后做搜索提交
		searchBtn.onclick = function(){
			_this.searchSubmit();
		}
		//输入回车后，做搜索提交
		searchInput.onkeyup = function(e){
			if(e.keyCode === 13 ){
				_this.searchSubmit();
			}
			
		}
	},
	// 搜索提交
	searchSubmit : function(){
		var searchInput = document.getElementById('search-input');
		var keyword = $.trim(searchInput.value);
		//如果提交的时候有keyword,正常跳转到list页面
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如果keyword为空，直接回到首页
		else{
			_mm.goHome();
		}
	}
};

header.init();