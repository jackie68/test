<template>
  <div class="wallet-views">
    <header class="partner-head my-wallet-box">
		<div class="total-income">总收益(元)</div>
		<div class="parter-total-money">{{walledData.total}}</div>
		<!--
		<div class="wallet-profit">其中本月收益{{walledData}}元</div>
		-->
		<div class="wallet-cash-btn"><router-link to="./preApplication">申请提现</router-link></div>
	</header>

	<div class="parter-money-message">
		<div class="publics-money wallet-minWidth walert-line">当前余额(元)<span>{{walledData.income}}</span></div>
		<div class="publics-money wallet-minWidth walert-line">已提现(元)<span>{{walledData.outlay}}</span></div>
		<div class="publics-money wallet-minWidth">提现中(元)<span>{{walledData.take}}</span></div>
	</div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      walledData: {}
    }
  },
  created () {
    let access_token = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/wallet/mywallet',{authorization: access_token}).then(response => {
      // get data
      if (response.data.code === 200) {
        // console.log(response.data)
        this.walledData = response.data.data
      }
    }, response => {
      // error callback
    })
  }
}
</script> 

<style>

.wallet-views{
  height:100%;
  background: #eee;
}
</style>

