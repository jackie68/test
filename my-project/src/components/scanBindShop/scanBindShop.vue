<template>
<div class="binshop-view">
    <section class="scann-model-box">
	   <div class="scann-shop-title">请先选择您已绑定的店铺：</div>	
	   <div class="scann-shopBox">
	   	   <img src="../../assets/shop.png">
	   	   <!--选择店铺-->
	   	 
	   	   <div class="shopName-box">
	   	     <select v-model="selectId">
             <option>请选择店铺</option>
             <option v-for="item in shopList" v-bind:value="item.shopid">{{item.shopname}}</option>
	   	     </select>
	   	   </div>
	   	   
	   	   <!--end-->
	   	</div>
	</section>
	<section class="shop-bindin-contants">
		<div class="transfer-camer" @click="scanQrcode">
			<img src="../../assets/camera2.png">
		</div>
		<div class="transfer-text">打开摄像头即可扫描产品入库</div>
	</section>

	<footer class="parter-footer-model">
		<div class="footer-inde-nav">
		  <router-link to="/">
			<img src="../../assets/home2.png"><span>首页</span>
		  </router-link>
		</div>
		<div class="parter-carmter"><img src="../../assets/camera1.png"></div>
		<div class="footer-inde-nav">
		  <router-link to="./setting">
			<img src="../../assets/set-icon1.png"><span>设置</span>
		  </router-link>
		</div>
	</footer>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      selectId: null,
      shopList: {}
    }
  },
  methods: {
    scanQrcode: function(){
        let access_token = localStorage.getItem("access_token");
        let selectId = this.selectId;
        //alert(this.selectId)
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr;
                if (result.indexOf(',') != -1) {
                    result = result.split(',');
                    result = result[1];
                }
                // 把返回的二维码绑定

                let arr = [];
                arr.push(result)
                
                // var params = new URLSearchParams()
                // params.append('shopid', selectId)
                // params.append('qrlist', arr.join(','))
                // params.append('authorization', access_token)

                axios.post('http://xsx.jyeg.com/index/shop/qrbinding', {'shopid':selectId,'qrlist':arr.join(','),'authorization':access_token})
                .then(function (response) {
                  
                  if(response.data.code == 200){
                    
                    alert(response.data.msg)
                  } else {
                    
                    alert(response.data.msg)
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
        });
    }
  },
  created () {
    let access_token = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/shop/selectshop',{authorization: access_token}).then(response => {
      // get data
      
      if (response.data.code === 200) {
        
        this.shopList = response.data.data

      } else {
        alert(response.data.msg)
      }
    }, response => {
      // error callback
    });

    let current_url = encodeURIComponent(location.href.split('#')[0])
    //console.log(current_url)
    this.$http.post(this.HOST + '/index/base/GetWechatSignature',{'current_url':current_url}).then(response => {
      if (response.data.code === 200) {
        console.log(response.data)
        wx.config({
            debug: false, 
            appId: response.data.data.appId+"",  
            timestamp: response.data.data.timestamp+"", 
            nonceStr: response.data.data.nonceStr+"", 
            signature: response.data.data.signature+"",
            jsApiList: [
            'scanQRCode',
            ] 
        });

      }
    }, response => {

    });
  }
}
</script>
<style>
.binshop-view{
  height:100%;
  background: #eee;
}
.shopName-box select {
    font-family: "微软雅黑";
    font-size:14px;
}
</style>