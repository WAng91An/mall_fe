webpackJsonp([0],[
/* 0 */,
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * 头部导航逻辑部分
 * 1.点击登陆到登陆页面
 * 2.点击注册到注册页面
 * 3.点击退出调用注销接口
 * 4.加载用户信息 欢迎您
 * 5.加载购物车数量
 */
__webpack_require__(3);
var _mm     = __webpack_require__(0);
var _user   = __webpack_require__(1);
var _cart   = __webpack_require__(4);

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
	        		userName.innerHTML 		=  res.username;
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * 购物车的网络请求
 */
var _mm     = __webpack_require__(0);

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectProduct : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选中全部商品
    selectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
var _mm     = __webpack_require__(0);

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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * nav-side js逻辑
 * 1.渲染导航内容，根据传进来的值，把相应的页面导航变成active
 * 2.把渲染后的html放入容器
 */
__webpack_require__(8);
var _mm     		  = __webpack_require__(0);
var templateIndex     = __webpack_require__(9);


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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n\t<a href=\"{{href}}\" class=\"link\" href=\"\">{{desc}}</a>\r\n</li>\r\n{{/navList}}\r\n\r\n\r\n";

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * 主页banner初始化
 */
__webpack_require__(43);
__webpack_require__(2);
__webpack_require__(5);
__webpack_require__(47);
var navSide         = __webpack_require__(7);
var templateBanner  = __webpack_require__(50);
var _mm             = __webpack_require__(0);

$(function() {
	// 渲染banner的html
	var bannerCon 		= document.getElementsByClassName('banner-con')[0];
    var bannerHtml  = _mm.renderHtml(templateBanner);
   	bannerCon.innerHTML = bannerHtml;
    // 初始化banner
    var banner = document.getElementsByClassName('banner')[0];
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});



/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * 轮播图入口
 */
__webpack_require__(48);
__webpack_require__(49);

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 49 */
/***/ (function(module, exports) {

window.console && console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),
	function(t, s) {
		if(!t) return s;
		var i = function() {
			this.el = s, this.items = s, this.sizes = [], this.max = [0, 0], this.current = 0, this.interval = s, this.opts = {
				speed: 500,
				delay: 3e3,
				complete: s,
				keys: !s,
				dots: s,
				fluid: s
			};
			var i = this;
			this.init = function(s, i) {
				return this.el = s, this.ul = s.children("ul"), this.max = [s.outerWidth(), s.outerHeight()], this.items = this.ul.children("li").each(this.calculate), this.opts = t.extend(this.opts, i), this.setup(), this
			}, this.calculate = function(s) {
				var e = t(this),
					n = e.outerWidth(),
					h = e.outerHeight();
				i.sizes[s] = [n, h], n > i.max[0] && (i.max[0] = n), h > i.max[1] && (i.max[1] = h)
			}, this.setup = function() {
				if(this.el.css({
						overflow: "hidden",
						width: i.max[0],
						height: this.items.first().outerHeight()
					}), this.ul.css({
						width: 100 * this.items.length + "%",
						position: "relative"
					}), this.items.css("width", 100 / this.items.length + "%"), this.opts.delay !== s && (this.start(), this.el.hover(this.stop, this.start)), this.opts.keys && t(document).keydown(this.keys), this.opts.dots && this.dots(), this.opts.fluid) {
					var e = function() {
						i.el.css("width", Math.min(Math.round(i.el.outerWidth() / i.el.parent().outerWidth() * 100), 100) + "%")
					};
					e(), t(window).resize(e)
				}
				this.opts.arrows && this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function() {
					t.isFunction(i[this.className]) && i[this.className]()
				}), t.event.swipe && this.el.on("swipeleft", i.prev).on("swiperight", i.next)
			}, this.move = function(s, e) {
				this.items.eq(s).length || (s = 0), 0 > s && (s = this.items.length - 1);
				var n = this.items.eq(s),
					h = {
						height: n.outerHeight()
					},
					o = e ? 5 : this.opts.speed;
				this.ul.is(":animated") || (i.el.find(".dot:eq(" + s + ")").addClass("active").siblings().removeClass("active"), this.el.animate(h, o) && this.ul.animate(t.extend({
					left: "-" + s + "00%"
				}, h), o, function() {
					i.current = s, t.isFunction(i.opts.complete) && !e && i.opts.complete(i.el)
				}))
			}, this.start = function() {
				i.interval = setInterval(function() {
					i.move(i.current + 1)
				}, i.opts.delay)
			}, this.stop = function() {
				return i.interval = clearInterval(i.interval), i
			}, this.keys = function(s) {
				var e = s.which,
					n = {
						37: i.prev,
						39: i.next,
						27: i.stop
					};
				t.isFunction(n[e]) && n[e]()
			}, this.next = function() {
				return i.stop().move(i.current + 1)
			}, this.prev = function() {
				return i.stop().move(i.current - 1)
			}, this.dots = function() {
				var s = '<ol class="dots">';
				t.each(this.items, function(t) {
					s += '<li class="dot' + (1 > t ? " active" : "") + '">' + (t + 1) + "</li>"
				}), s += "</ol>", this.el.addClass("has-dots").append(s).find(".dot").click(function() {
					i.move(t(this).index())
				})
			}
		};
		t.fn.unslider = function(s) {
			var e = this.length;
			return this.each(function(n) {
				var h = t(this),
					o = (new i).init(h, s);
				h.data("unslider" + (e > 1 ? "-" + (n + 1) : ""), o)
			})
		}
	}(window.jQuery, !1);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"banner\">\r\n    <ul>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\r\n                <img class=\"banner-img\" src=\"" + __webpack_require__(51) + "\" />\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100030\" target=\"_blank\">\r\n                <img class=\"banner-img\" src=\"" + __webpack_require__(52) + "\" />\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100016\" target=\"_blank\">\r\n                <img class=\"banner-img\" src=\"" + __webpack_require__(53) + "\" />\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100001\" target=\"_blank\">\r\n                <img class=\"banner-img\" src=\"" + __webpack_require__(54) + "\" />\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\r\n                <img class=\"banner-img\" src=\"" + __webpack_require__(55) + "\" />\r\n            </a>\r\n        </li>\r\n    </ul>\r\n    <div class=\"banner-arrow prev\">\r\n        <i class=\"fa fa-angle-left\"></i>\r\n    </div>\r\n    <div class=\"banner-arrow next\">\r\n        <i class=\"fa fa-angle-right\"></i>\r\n    </div>\r\n</div>";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner1.jpg";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner2.jpg";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner3.jpg";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner4.jpg";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner5.jpg";

/***/ })
],[41]);