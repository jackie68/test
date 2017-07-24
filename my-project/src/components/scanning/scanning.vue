<template>
<div>
<section class="shop-head-box">
	<div class="bindin-message topPading"><img src="../../assets/binding.png">绑定店铺即可成为该店销售顾问</div>
	<div class="bindin-message"><img src="../../assets/location.png">店铺地址(省/市/区)精准定位</div>
	<div class="shop-bindig-nav">
	    <div class="bindin-active nav-line">
	    	<span></span><strong>信息填写</strong>
	    </div>
	    <div class="bindin-active nav-line active-rule">
	    	<span></span><strong>扫码激活</strong>
	    </div>
	    <div class="bindin-active">
	    	<span></span><strong>成功绑定</strong>
	    </div>	
	</div>	
</section>
<section class="shop-bindin-contants">
	<div class="transfer-camer" @click="scanQrcode">
		<img src="../../assets/camera2.png" >
	</div>
	<div class="transfer-text">对店铺任一无比滴产品进行扫码</div>
</section>
</div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    scanQrcode: function(){
        var _this = this;
        let access_token = localStorage.getItem("access_token");
        // var shopId = _this.$route.query.shopId;
        // alert(shopId)
        //console.log("url参数："+ )
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
                
                //alert(_this.$route.params.shopId);
                let arr = [];
                arr.push(result);
                // alert(_this.$route.query.shopId)
                axios.post('http://xsx.jyeg.com/index/shop/qrbinding', {
                  'shopid': _this.$route.query.shopId,
                  'qrlist': arr.join(','),
                  'flag':'bd',
                  'authorization': access_token
                })
                .then(function (response) {

                  if(response.data.code == 200){
                    //alert(response.data.msg)
                    _this.$router.push({ path: '/bindSuccess'})
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
    let current_url = encodeURIComponent(location.href.split('#')[0])
    this.$http.post(this.HOST + '/index/base/GetWechatSignature',{'current_url':current_url}).then(response => {
      if (response.data.code === 200) {
        console.log(response.data)
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
		    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		})
      }
    }, response => {

    });
  }
}
</script>
<style>
body{
  background: #eee;
}
.topPading{
  padding-top:2%;
}
</style>
