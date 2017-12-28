/*
 * 模态框逻辑
 * 1. 通过模板渲染，并把省份 从工具类掉进来
 * 2. 遍历省份生成option节点，加到select之中
 * 3. 更改省份之后就把 省份名字传过去，加载城市
 * 4. 渲染模板时，如果是更新则渲染的时候回填
 * 4. 点击提交，调用接口，异常模态框，回调重新加载收件人列表
 */

var _mm               		  = require('util/mm');
var _address            	  = require('service/address-service');
var _cities                   = require('util/cities/index.js');
var templateAddressModal      = require('./address-modal.string');

var addressModal = {
	show : function(option){
		//option绑定
		/*
		 * option = {
		 * 	isUpdate ： true/false，
		 * data		 ： res，  如果是更新地址，把查询到的地址传过来
		 * onSuccess： function(){
		 * 	回调函数，重新加载地址列表
		 * }
		 * }
		 */
		this.option      = option;
		this.option.data = option.data || {};
		this.modalWrap   = document.getElementsByClassName('modal-wrap')[0];
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	bindEvent :function(){
		var _this = this;
		var provinceSelect = document.getElementById('receiver-province');
		var addressBtn 	   = document.getElementsByClassName('address-btn')[0];
		var close		   = document.getElementsByClassName('close');
		var modalContainer = document.getElementsByClassName('modal-container')[0];
		//更改省份，二级联动
		provinceSelect.onchange = function(){
			var selectedProvince = provinceSelect.value;
			_this.loadCities(selectedProvince);
		}
		//提交收获地址
		addressBtn.onclick = function(){
			var receiverInfo = _this.getReceiverInfo();
			var isUpdate     = _this.option.isUpdate;
			//创建新地址并且验证通过
			if(!isUpdate && receiverInfo.status){
				_address.save(receiverInfo.data,function(res){
					_mm.successTips("地址添加成功");
					_this.hide();
					//回调函数，进行重新加载新增加的地址
					typeof _this.option.onSuccess === 'function'
						&& _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			//更新收件人并且验证通过
			else if(isUpdate && receiverInfo.status){
				_address.update(receiverInfo.data,function(res){
					_mm.successTips("地址修改成功");
					_this.hide();
					//回调函数，进行重新加载新增加的地址
					typeof _this.option.onSuccess === 'function'
						&& _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			//验证不通过
			else{
				_mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
			}
		}
		
		//保证点击内容区的时候不关闭弹窗
		modalContainer.onclick = function(e){
			e.stopPropagation();	//阻止冒泡
		}
		//关闭弹窗，点击叉 或者 灰色部分, close 叉号，和modal框都有close类
		for(var i = 0,length = close.length ; i< length;i++){
			close[i].onclick = function(){
			_this.hide();
			}
		}
		
	},
	//渲染modal
	loadModal :function(){
		var addressModalHtml     = _mm.renderHtml(templateAddressModal,{
			isUpdate : this.option.isUpdate,
			data     : this.option.data 
		});
		this.modalWrap.innerHTML = addressModalHtml;
		//加载省份
		this.loadProvince();
		
	},
	//加载省份信息，或回填信息省份
	loadProvince : function(){
		var provinces 			 = _cities.getProvinces() || [];
		var provinceSelect		 = document.getElementById('receiver-province');
		provinceSelect.innerHTML = this.getSelectOption(provinces);
		//如果是更新状态调用模态框，并且省份存在的情况下,省份回填
		if(this.option.isUpdate && this.option.data.receiverProvince){
			provinceSelect.value = this.option.data.receiverProvince;
			//加载城市
			this.loadCities(this.option.data.receiverProvince);
		}
		
	},
	//加载城市信息
	loadCities : function(provinceName){
		var cities		 	= _cities.getCities(provinceName) || [];
		var citySelect	    = document.getElementById('receiver-city');
		citySelect.innerHTML= this.getSelectOption(cities);
		//城市回填
		if(this.option.isUpdate && this.option.data.receiverCity){
			citySelect.value = this.option.data.receiverCity;
		}
	},
	//获取表单里面收件人信息的方法，并表单验证
	getReceiverInfo : function(){
		var receiverName 		= document.getElementById('receiver-name').value;
		var receiverProvince	= document.getElementById('receiver-province').value;
		var receiverCity    	= document.getElementById('receiver-city').value;
		var receiverPhone   	= document.getElementById('receiver-phone').value;
		var receiverAddress 	= document.getElementById('receiver-address').value;
		var receiverZip 		= document.getElementById('receiver-zip').value;
		
		var receiverInfo = {};
		var result		 ={
			status : false
		};
		receiverInfo.receiverName 	  = $.trim(receiverName);
		receiverInfo.receiverProvince = $.trim(receiverProvince);
		receiverInfo.receiverCity 	  = $.trim(receiverCity);
		receiverInfo.receiverPhone    = $.trim(receiverPhone);
		receiverInfo.receiverAddress  = $.trim(receiverAddress);
		receiverInfo.receiverZip      = $.trim(receiverZip);
		
		if(this.option.isUpdate){
			receiverInfo.id = document.getElementById('receiver-id').value;
		}
		//表单验证
		if(!receiverInfo.receiverName){
			result.errMsg = '请输入收件人姓名';
		}else if(!receiverInfo.receiverProvince){
			result.errMsg = '请选择收件人所在省份';
		}else if(!receiverInfo.receiverCity){
			result.errMsg = '请输入收件人所在城市';
		}else if(!receiverInfo.receiverPhone){
			result.errMsg = '请输入收件人手机号';
		}else if(!receiverInfo.receiverAddress){
			result.errMsg = '请输入收件人详细地址';
		}	
		//验证都通过
		else{
			result.status = true;
			result.data   = receiverInfo;
		}
		return result;
	},
	//后去select框的选项，输入是一一个数组，输出是一个html
	getSelectOption : function(optionArray){
		var html = '<option value="">请选择</option>';
		for(var i=0,length = optionArray.length;i < length ; i++){
			html += '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>'
		}
		return html;
		
	},
	//关闭模态框,放模态框的html 设为空
	hide : function(){
		this.modalWrap.innerHTML = '';
	}
};
module.exports = addressModal;