<template>
<div class="preApp-views">
<section class="register-contant">

<div class="present-title-box">
	<strong>提现至微信账户</strong>
	<div class="persen-personal">
	   <img :src="wxmesage.wximg" ><span>{{wxmesage.wxname}}</span>
	</div>

</div>

<div class="register-box">
	<input type="text" :placeholder="'本次最多可提现金额：'+ wxmesage.income +'元'" v-model="money" />
</div>

<div class="register-buttom" @click="moneyBtn">提交</div>
</section>
</div>
</template>
<script>
export default {
  data () {
    return {
      money: '',
      wxmesage: {}
    }
  },
  methods: {
    
    moneyBtn: function (){
      let access_token = localStorage.getItem("access_token");
      this.$http.post(this.HOST + '/index/wallet/ApplyMoney',{money:this.money,may:'may',authorization: access_token}).then(response => {
        // get data
        console.log(response.data)
        if (response.data.code ===200){
          this.$router.push({ path: '/presentSuccess' })
        } else {
          alert(response.data.msg)
        }
      }, response =>{
        // error callback
      })
    }
  },
  created () {
    let token_val = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/wallet/ApplyMoney',{authorization: token_val}).then(response => {
      // get data
      if (response.data.code === 200){
        console.log(response.data)
        this.wxmesage = response.data.data;
        // console.log(response.data.data.wxname)
        if (response.data.data.openid == null || response.data.data.openid == 'null' || response.data.data.openid == ''){

        var callbacktype = 1;
        window.location.href = "http://xsx.jyeg.com/index/base/getWechatInfo?callback_type=" + callbacktype + "&jwt=" + token_val
        }
      } else {
        alert(response.data.msg)
      }
      
    }, response => {
      // erro callback
    })
  } 
}
</script> 

<style>

.preApp-views{
  height:100%;
  background: #fff;
}
</style>