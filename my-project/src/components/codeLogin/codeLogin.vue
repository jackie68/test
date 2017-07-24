<template>
<div>
<!--背景图层-->
<div class="login-password-bg" ref="backgroudImg"><img src="../../assets/bj2.png"></div>
<div class="login-layer" ref="layerModls"></div>
<!--end-->

<!--内容区-->
<div class="login-contants">
	<img src="../../assets/logo.png">
	<p>专注共享人力，实现互利共赢</p>
</div>

<div class="login-contan-box">
	<div class="public-Input">
		<label><img src="../../assets/phone-number.png"></label>
		<div class="input-content">
			<input type="number" v-model="items.phone" ref="phone" />
		</div>
	</div>
	<div class="public-Input">
		<label><img src="../../assets/code.png"></label>
		<div class="input-content">
			<input class="code-input" type="text" v-model="items.vicityCode" ref="vicityCode" />
			<v-code v-on:send="getPhone" ref="countDownBtn"></v-code>
		</div>
	</div>
	
	<div :class="[login_sumitbtn, { activat_btn: isactivation }]" @click="loginSumitBtn">登录</div>
</div>

<div class="login-foote-selet">
	<div class="foot-or">
		<fieldset><legend>or</legend></fieldset>
	</div>
	<div class="login-code-box"><router-link to="/">账号密码登陆</router-link></div>
</div>
<!--end-->
</div>
</template>

<script>
import code from '@/components/verificatCode/verificatCode.vue'
export default {
  components: {
    'v-code': code
  },
  data () {
    return {
      items: {
       phone: '',
       vicityCode: ''
      },
      isactivation: false,
      login_sumitbtn: 'login-sumitbtn'
    }
  },
  mounted () {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.backgroudImg.style.height = h + 'px'
    this.$refs.layerModls.style.height = h + 'px'
  },
  watch: {
    items: {
      handler:function (val,oldval) {
        if (this.$refs.phone.value != '' && this.$refs.vicityCode.value != ''){
          this.isactivation = true
        } else {
          this.isactivation = false
        }
      },
      deep:true
    }
  },
  methods: {
    getPhone () {
      // 按钮倒计时
      let flag = this.$refs.phone.value
      if (flag !== '') {
        this.$refs.countDownBtn.start = true
        this.$emit('send')
        this._sendMessage(flag)
      } else {
        alert('手机号码不能为空')
      }
    },
    _sendMessage (flag) {
      this.$http.post(this.HOST + '/index/base/sendsms',{phone:flag,authorization: ''}).then(response => {
        if (response.data.code === 200) {
          // alert('发送成功')
        } else {
          alert(response.data.msg)
        }
      }, response => {
        // 请求失败
      })
    },
    loginSumitBtn () {
      let phone = this.$refs.phone.value;
      let vicityCode = this.$refs.vicityCode.value;
      this.$http.post(this.HOST + '/index/base/login?phone=' + phone + '&password=' + vicityCode + '&flag=2').then(response => {
        // 请求成功
        if (response.data.code === 200) {
          localStorage.setItem("access_token",response.data.data.access_token)
          this.$router.push({ path: '/' })
        } else {
          alert(response.data.msg)
        }
      }, response => {
        // 请求失败
      })
    }
  }
}
</script> 
