/*
 * 订单页面的网络请求
 */

var _mm = require('util/mm.js');

var _payment = {
    // 请求支付信息的接口
    getPaymentInfo : function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    :{
            	orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //轮询查看支付信息 接口
    getPaymentStatus : function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    :{
            	orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _payment;