/*
 * 分页逻辑
 * 根据需要加载分页信息的页面传过来的如下对象，进行合并，然后渲染页面
	 this.option = {
					hasPreviousPage : res.hasPreviousPage,	//是否有上一页
			        prePage         : res.prePage,			//上一页是几
			        hasNextPage     : res.hasNextPage,		//是否有下一页
			        nextPage        : res.nextPage,			//下一页是几
			        pageNum         : res.pageNum,			//页的序号
			        pages           : res.pages，			//页的个数
			        container : paginationCon,              //这是一个HTMLcolloection 集合，用来放分页信息的容器
			        onSelectPage : function(pageNum){		//传进来当前选择是哪一页，把data.listParam‘重新赋值，然后再次调接口
			            _this.data.listParam.pageNum = pageNum;
			            _this.loadList();
            	}
	 * }
 */
require('./index.css');
var _mm                 = require('util/mm.js');
var templatePagination  = require('./index.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,//分页组件的容器
        pageNum         : 1,
        pageRange       : 3, // |上一页|4 =5= 6|下一页|
        onSelectPage    : null
    };
    // 事件的处理
    document.addEventListener('click',function(e){
    	if(e.target.className == "pg-item"){
    		if(_mm.hasClass(e.target,'active') || _mm.hasClass(e.target,'disabled')){
    			return;
    		}
    		typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage(e.target.getAttribute("data-value")) : null;
    	}
    })
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项，创建一个空对象，先把defaultOption放进去，再把userOption放进去
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的对象
    if(!(this.option.container instanceof Object)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.innerHTML = this.getPaginationHtml();
};
/* this.option = 
{
	hasPreviousPage : res.hasPreviousPage,	//是否有上一页
	prePage         : res.prePage,			//上一页是几
	hasNextPage     : res.hasNextPage,		//是否有下一页
	nextPage        : res.nextPage,			//下一页是几
	pageNum         : res.pageNum,			//页的序号
	pages           : res.pages，			//页的个数
	container : paginationCon,              //这是一个HTMLcolloection 集合，用来放分页信息的容器
	onSelectPage : function(pageNum){		//传进来当前选择是哪一页，把data.listParam‘重新赋值，然后再次调接口
	_this.data.listParam.pageNum = pageNum;
	_this.loadList();
}
 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
 */
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],//一个数组元素代表一个组件，比如 |上一页| ，每个数组元素是一个对象，里面的属性有name，value，disabled(能不能点击)
        start       = option.pageNum - option.pageRange > 0 //开始的值 如上面 的 2
            ? option.pageNum - option.pageRange : 1,
        end         = option.pageNum + option.pageRange < option.pages //结束的值 如上面的 8
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum) //遍历中相等的话，说明这是当前的
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination,{
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    console.log(html)
    return html;
};

module.exports = Pagination;