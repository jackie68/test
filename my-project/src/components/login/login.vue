<template>
<div>
<!--背景图层-->
<div class="login-password-bg" ref="backgroudImg"><img src="../../assets//bj1.png"></div>
<div class="login-layer" ref="layerModls"></div>
<!--end-->

<!--内容区-->
<div class="login-contants">
	<img src="../../assets/logo.png">
	<p>专注共享人力，实现互利共赢</p>
</div>

<div class="login-contan-box">
	<div class="public-Input">
		<label><img src="../../assets/account.png"></label>
		<div class="input-content">
			<input type="number" v-model="items.userName" ref="userName" />
		</div>
	</div>
	<div class="public-Input">
		<label><img src="../../assets/password.png"></label>
		<div class="input-content">
			<input type="password" v-model="items.userpw" ref="userpw" />
		</div>
	</div>
	<div class="remember-password">
		<label :class="{ remeber_icon: isActive }" @click="remeber_btn"></label>记住密码
		<router-link to="./forgetPassword">忘记密码</router-link>
	</div>
	<div :class="[login_sumitbtn, { activat_btn: isactivation }]" @click="login">登录</div>
</div>

<div class="login-foote-selet">
	<div class="foot-or">
		<fieldset><legend>or</legend></fieldset>
	</div>
	<div class="login-code-box"><router-link to="./codeLogin">验证码登陆</router-link></div>
</div>
<!--end-->
</div>
</template>

<script>
import md from '@/commed/js/md5.js';

export default {
  data () {
    return {
      items: {
        userName: '',
        userpw: '',
      },
      remPW_val: '',
      isActive: false,
      isactivation: false,
      remember_pw: false,
      login_sumitbtn: 'login-sumitbtn',
      isshow: false,
      tipmsg: {}
    }
  },
  mounted () {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.backgroudImg.style.height = h + 'px'
    this.$refs.layerModls.style.height = h + 'px';
    // 记住密码的处理
    if ( localStorage.getItem("remember_pw") == 'true' ){
      this.isActive = true;
      this.items.userpw = localStorage.getItem("password")
    } else {
      this.isActive = false
    }
  },
  watch: {
    items: {
      handler:function (val,oldval) {
        if (this.$refs.userName.value != '' && this.$refs.userpw.value != ''){
          this.isactivation = true
        } else {
          this.isactivation = false
        }
      },
      deep:true
    }
  },
  methods: {
    // 记住密码
    remeber_btn () {
      if (this.isActive) {
        this.isActive = false;
        localStorage.remember_pw = false;
        localStorage.removeItem("password")
      } else {
        this.isActive = true;
        localStorage.remember_pw = true;
        localStorage.password = this.$refs.userpw.value
      }
    },
    // 提交登录数据
    login: function () {
      let userName = this.$refs.userName.value;
      let userpw = this.$refs.userpw.value;
      this.$http.post(this.HOST + '/index/base/login',{phone: userName,password: userpw,flag:'1'}).then((response) => {
        if (response.data.code === 200) {
          localStorage.setItem("access_token",response.data.data.access_token);
          this.$router.push({ path: '/' })
        } else {
          alert(response.data.msg)
        }
      }, response => {
        // error callback
      })
    }
  },
  

}
</script>
<style>
.remember-password label.remeber_icon {
  background: url(../../assets/right.png) top center no-repeat;
  background-size: 100% 100%;
}
</style> 

