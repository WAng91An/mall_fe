
require('./index.css');
var _mm     = require('util/mm');
var _user   = require('service/user-service');
var _cart   = require('service/cart-service');

// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
    	var jsLogin 	= document.getElementsByClassName('js-login')[0];
    	var jsRegister  = document.getElementsByClassName('js-register')[0];
    	var jsLogout	= document.getElementsByClassName('js-logout')[0];
        // 登录点击事件
        jsLogin.onclick = function(){
        	_mm.doLogin();
        }
        // 注册点击事件
        jsRegister.onclick = function(){
        	 window.location.href = './user-register.html';
        }
        // 退出点击事件
        jsLogout.onclick = function(){
        	_user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        }
    },
    // 加载用户信息
        loadUserInfo : function(){
        _user.checkLogin(
        	function(res){
	        	var notLogin = document.getElementsByClassName('not-login')[0];
	        	var login    = document.getElementsByClassName('login')[0];
	        	var userName = document.getElementsByClassName('username')[0];
	        		notLogin.style.display  = 'none';
	        		// to do 
	        		login.style.display		= 'inline-block';
	        		userName.innerHTML 		= res.username;
       	 }, 
        function(errMsg){
            // do nothing
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
    	var cartCount = document.getElementsByClassName('cart-count')[0];
        _cart.getCartCount(function(res){
        	cartCount.innerHTML = res || 0;
        }, function(errMsg){
        	cartCount.innerHTML =  0;
        });
    }
}

module.exports = nav.init();