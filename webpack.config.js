
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
const ASSET_PATH 		= process.env.ASSET_PATH || '/dist/';
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};




// webpack config
var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        'cart'              : ['./src/page/cart/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'   	: ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result'          	: ['./src/page/result/index.js'],
        'order-confirm'     : ['./src/page/order-confirm/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-detail'      : ['./src/page/order-detail/index.js'],
        'payment'           : ['./src/page/payment/index.js'],
        'about'           	: ['./src/page/about/index.js']
        
    },
    output: {
        path:  __dirname +'/dist/',
        publicPath : ASSET_PATH,
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
     module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
        { 
        	test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, use: 'url-loader?limit=100&name=resource/[name].[ext]' 
        },
        { test: /\.string$/, use: 'html-loader'},
    ]
  },
  resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
   },
  devServer: {
		  proxy: {
	  	"/cart"	 	: "http://localhost:8080",
	  	"/user"   	: "http://localhost:8080",
	  	"/product"	: "http://localhost:8080",
	  	"/order"  	: "http://localhost:8080",
	  	"/shipping" : "http://localhost:8080"
	}
 },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '支付页面')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于WMall')),
    ]
};


if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;