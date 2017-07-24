<template>
<div class="shopbin-view">
  <section class="shop-head-box">
		<div class="bindin-message topPading"><img src="../../assets/binding.png">绑定店铺即可成为该店销售顾问</div>
		<div class="bindin-message"><img src="../../assets/location.png">店铺地址(省/市/区)精准定位</div>

		<div class="shop-bindig-nav">
		    <div class="bindin-active nav-line active-rule">
		    	<span></span><strong>信息填写</strong>
		    </div>
		    <div class="bindin-active nav-line">
		    	<span></span><strong>扫码激活</strong>
		    </div>
		    <div class="bindin-active">
		    	<span></span><strong>成功绑定</strong>
		    </div>	
		</div>	
	</section>


	<section class="shop-bindin-contants">
		<div class="shop-contant-center">
			<div class="shop-bind-box"><label>店铺名称</label>
			   <select id="selet_Id" v-model="selectId">
			     <option>请选择店铺</option>
	   	         <option v-for="item in shopName" v-bind:value="item.pharmacy_id">{{item.company_name}}</option>
	   	       </select>
			</div>
			<div class="shop-bind-box"><label>店长姓名</label><input type="text" v-model="shopowner" /></div>
			<div class="shop-bind-box"><label>店铺联系电话</label><input type="number" v-model="phone" /></div>
			<!--
			<div class="shop-addresed-box">店铺详细地址</div>
			<div class="address-box">
				<div class="public-address"><input type="text" v-model="province" />省</div>
				<div class="public-address"><input type="text" v-model="city" />市</div>
				<div class="public-address"><input type="text" v-model="district" />区</div>
			</div>
			<div class="details-address"><input type="text" placeholder="需手动输入xx街道xx号xx栋" v-model="address" /></div>
			-->
			<div class="register-buttom" @click="regitBtn">提交</div>
		</div>
	</section>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      shopname: '',
      shopowner: '',
	  phone: '',
	  selectId: '',
	  shopName: []
    }
  },

  methods: {
    regitBtn () {
      let access_token = localStorage.getItem("access_token");
      if (this.selectId == '' ){
        alert('店铺不能为空');
        return false;
      }else{
        var selet_Id = document.getElementById("selet_Id");
        var _index = selet_Id.selectedIndex;
        var selet_text = document.getElementById("selet_Id")[_index].innerHTML;
      }

      this.$http.post(this.HOST + '/index/shop/ShopBinding',{'shopname':selet_text,'pharmacy_id':this.selectId,'shopowner':this.shopowner,'phone':this.phone,'authorization': access_token}).then(response => {
        // success data
        if (response.data.code === 200){
           let shopid = response.data.data.shopid
           window.location.href = "http://vxsx.jyeg.com/scanning?shopId="+ shopid +""
           //this.$router.push({path: '/scanning', query: {shopId: shopid}});
           //this.$router.push({ path: '/scanning?shopId=' + response.data.data.shopid})
        } else {
          alert(response.data.msg)
        }

      }, response => {

      })
      
    }
  },
  created () {

    var _this = this;
    let current_url = encodeURIComponent(location.href.split('#')[0]);
    let access_token = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/base/GetWechatSignature',{'current_url':current_url}).then(response => {
      if (response.data.code === 200) {
        //console.log("数据"+response.data)
        wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: response.data.data.appId, // 必填，公众号的唯一标识
		    timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳
		    nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串
		    signature: response.data.data.signature,// 必填，签名，见附录1
		    jsApiList: [
		       'checkJsApi',
		       'scanQRCode',
		       'hideAllNonBaseMenuItem',
		       'getLocation'
		    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		})
      }
    }, response => {

    });  
    
    wx.ready(function(){
        wx.getLocation({
		    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		    success: function (res) {
		        var latitude = res.latitude;
		        var longitude = res.longitude ;
		        // 118.941695080965,28.970746602740
		        // var params = new URLSearchParams();
		           // params.append('lng', longitude);
		           // params.append('lat', latitude);
		           // params.append('authorization', access_token);
		        axios.post('http://xsx.jyeg.com/index/shop/getNearbyPharmacy',{'lng':longitude,'lat':latitude,'authorization':access_token})
				.then(function (response) {
				    if (response.data.code == 200){
				       _this.shopName = response.data.data
				    }
				})
				.catch(function (error) {
				    console.log(error);
				}); 
	          
		    }
		});
    });
  }

  
}
</script>
<style>

.shopbin-view{
	height:100%;
	background: #fff;
}
.shop-bind-box select {
    width: 70%;
    height: 46px;
    line-height: 23px;
    -webkit-appearance: none;
    background: #fff;
    outline: none;
    float: left;
    border: none;
    padding:0 15px;
    font-family: "微软雅黑";
    font-size:14px;
}
.topPading{
  padding-top:2%;
}
</style>
