/*
 * 主页banner初始化
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');

$(function() {
	// 渲染banner的html
	var bannerCon 		= document.getElementsByClassName('banner-con')[0];
    var bannerHtml      = _mm.renderHtml(templateBanner);
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

