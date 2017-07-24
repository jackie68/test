<template>
<div>
<section class="register-contant">
	<div class="register-box">
		<input type="text" placeholder="请输入您的姓名" v-model="username" />
	</div>
	<div class="register-box">
		<input id="demo1" type="text" placeholder="所属地区" readonly="" value="" name="input_area" />
	</div>
	<div class="register-box">
		<input type="number" placeholder="请输入您的手机号" v-model="phone" />
	</div>
	<div class="register-box">
		<input class="register-code" type="text" placeholder="验证码" v-model="verifyCode" />
		<v-code v-on:send="getPhone" ref="countDownBtn"></v-code>
	</div>
	<div class="register-box">
		<input class="regoster-password" id="look_type" type="password" placeholder="请输入您的密码" v-model="userpw"  />
    
		<div class="eye-btn" @click="read_btn"><img src="../../assets/close-password.png"></div>
    
	</div>

	<div class="register-buttom" @click="register">注册</div>
  <!--
	<div class="regist-agree">
		<span></span>我已经阅读并同意《合伙人注册协议及隐私条约》
	</div>
  -->
</section>
<!--注册成功弹窗-->
<div class="elastic" v-show="isshow"></div>
<section class="register-succes" v-show="isshow">
  <div class="success-iocn"><img src="../../assets/right.png"></div>
  <div class="gratulations">恭喜您，注册成功</div>
  <div class="sucess-qrCode"><img src="../../assets/QR-code.jpg"></div>
  <div class="succes-contant">
    <p>长按二维码进行关注</p>
        <p>即可登录合伙人系统</p>
  </div>
</section>
<!--end-->
</div>
</template>

<script>
import code from '@/components/verificatCode/verificatCode'
import larea from 'script-loader!../../../static/js/LArea.js';
export default {
  components: {
    'v-code': code
  },
  data () {
    return {
      disabled: false,
      username: '',
      userpw: '',
      phone: '',
      verifyCode: '',
      isshow: false
    }
  },
  mounted () {
    
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
      this.$http.post(this.HOST + '/index/base/sendsms',{phone:this.phone,flag:'julian',authorization: ''}).then(response => {
        if (response.data.code === 200) {
          // alert('发送成功')
        } else {
          alert(response.data.msg)
        }
      }, response => {
        // 请求失败
      })
    },
    register () {
      let location_Name = $('#demo1').val();
      location_Name = location_Name.split(' ');
      let province  = location_Name[0];
      let  city     = location_Name[1];
      let  area     = location_Name[2];
      let belval;
      let listData = {};
      if (typeof(this.$route.query.userid) != 'undefined'){
        
        listData.phone = this.phone;
        listData.username = this.username;
        listData.password = this.userpw;
        listData.smscode = this.verifyCode;
        listData.province = province;
        listData.city = city;
        listData.district = area;
        listData.belong = this.$route.query.userid;

      } else {
       
        listData.phone = this.phone;
        listData.username = this.username;
        listData.password = this.userpw;
        listData.smscode = this.verifyCode;
        listData.province = province;
        listData.city = city;
        listData.district = area;
        // listData.belong = 2
      }
      this.$http.post(this.HOST + '/index/base/register', listData).then(response => {
        if (response.data.code === 200) {
          // this.$router.push({ path: '/login' })
          this.isshow = true;
        } else {
          alert(response.data.msg)
        }
      }, response => {

      })
    }
  },
  created () {
    var LAreaData = [];
    this.$http.post(this.HOST + '/index/base/getarea',{authorization: ''}).then(response => {
      // get data
      if ( response.data.code === 200 ) {

        for (var i = 0; i < response.data.data.length; i++) {
                
                var LAreaData1 = response.data.data[i];

                LAreaData.push(LAreaData1);
        };

      // 调用地址数据
      var area1 = new LArea();
          area1.init({
              'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
              'keys': {
                  id: 'areaId',
                  name: 'areaName'
              }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
              'type': 1, //数据源类型
              'data': LAreaData //数据源
          });
     //
      };
    }, response => {
      // error callback
    })
    
    
  }
}
</script> 

<style>
</style>
