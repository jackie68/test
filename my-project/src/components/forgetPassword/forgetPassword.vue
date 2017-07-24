<template>
<div class="forgepw-views">
<!--导航引领-->
<div class="forget-nav">
	<div class="forget-in add-ridOf actives-in">
		<span><i>1</i></span><strong>输入手机号</strong>
	</div>
	<div class="forget-in">
		<span><i>2</i></span><strong>输入新密码</strong>
	</div>
	<div class="forget-in add-rigtOf">
		<span><i>3</i></span><strong>修改成功</strong>
	</div>
</div>
<!--end-->
<!--第一步骤-->
<div class="forgter-contans isshow">
	<div class="forgter-contan-center">
		<div class="register-box">
		<input type="number" v-model="phone" placeholder="请输入您的手机号" />
		</div>
		<div class="register-box">
			<input class="register-code" v-model="codeVal" type="text" placeholder="验证码" />
			<v-code v-on:send="getPhone" ref="countDownBtn"></v-code>
		</div>
		<div class="register-buttom" @click="next_step">下一步</div>
	</div>
	
</div>
<!-- 第二步骤 -->
<div class="forgter-contans" id="page2">
	<div class="forgter-contan-center">
		<div class="register-box">
			<input class="regoster-password" id="look_type" v-model="newPw"  type="password" placeholder="请输入您的新密码" />
			<div class="eye-btn" @click="read_btn"><img src="../../assets/close-password.png"></div>
		</div>
		<div class="register-buttom" @click="sure_modfity">确认修改</div>
	</div>
</div>
<!-- 第三步骤 -->
<div class="forgter-contans" id="page3">
	<div class="forgter-contan-center">
		 <div class="modift-icon"><img src="../../assets/right.png"></div>
		 <div class="forgter-text">恭喜您！修改成功</div>
		 <div class="go-page"><router-link to="/login">去登录<i></i></router-link></div>
	</div>
</div>
</div>
</template>

<script>
import code from '@/components/verificatCode/verificatCode'

export default {
  components: {
    'v-code': code
  },
  data () {
    return {
      phone: '',
      codeVal: '',
      newPw: ''
    }
  },
  mounted () {
    var winHeight = $(document).height();
	var scalH     = winHeight - 85;
	$('.forgter-contans').css({'height':scalH});
  },
  methods: {
    // 查看密码
    read_btn() {

      let inputType = document.getElementById('look_type');
      
      if ( inputType.type == 'password' ) {
        inputType.type = "text";
      } else {
        inputType.type = "password";
      }
    },
    getPhone () {
      // 按钮倒计时
      let flag = this.phone
      if (flag !== '') {
        this.$refs.countDownBtn.start = true
        this.$emit('send')
        this._sendMessage()
      } else {
        alert('手机号码不能为空')
      }
    },
    _sendMessage () {
      this.$http.post(this.HOST + '/index/base/sendsms',{phone:this.phone,authorization:''}).then(response => {
        if (response.data.code === 200) {
          //alert('发送成功')
        } else {
          //alert(response.data.msg)
        }
      }, response => {
        // 请求失败
      })
    },
    // 下一步
    next_step () {
      this.$http.post(this.HOST + '/index/base/forgetp',{phone:this.phone,'smscode':this.codeVal,authorization:'',step:'1'}).then(response => {
        // request success
        if (response.data.code === 200) {
          $('.forget-nav').find('div').eq(1).addClass('actives-in');
          $('#page2').addClass('isshow');
        } else {
          alert(response.data.msg)
        }
      }, response => {
        // request fail
      })
      
    },

    // 确定修改
    sure_modfity () {
      this.$http.post(this.HOST + '/index/base/forgetp',{password:this.newPw,step:'2',authorization:''}).then(response => {
        // request success
        if (response.data.code === 200) {
          $('.forget-nav').find('div').eq(2).addClass('actives-in');
	      $('#page3').addClass('isshow');
        } else {
          alert(response.data.msg)
        }
      }, response => {
        // request fail
      })
      
    }
  }
}
</script>

<style>

.forgepw-views{
  height:100%;
  background: #fff;
}
</style>
