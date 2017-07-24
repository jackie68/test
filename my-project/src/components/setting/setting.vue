<template>
<div>
   <div class="parter-index-box">
		<ul>
		<!--
			<li>
				<router-link to="./modifyPassword">
					<label><img src="../../assets/change-password.png">修改密码</label>
					<span>旧密码修改<i></i></span>
				</router-link>
			</li>
			-->
			<li>
				<router-link to="./forgetPassword">
					<label><img src="../../assets/forget-passw.png">重置密码</label>
					<span>忘记密码<i></i></span>
				</router-link>
			</li>
		</ul>
	</div>
	<div class="parter-index-box">
		<ul>
			<li @click="settinBtn">
				<a href="javascript:;">
					<label><img src="../../assets/delete.png">清除缓存</label>
					<span>清除缓存信息<i></i></span>
				</a>
			</li>
		</ul>
	</div>
	<div class="clearance"></div>
	<footer class="parter-footer-model">
		<div class="footer-inde-nav">
		  <router-link to="/">
			<a href="javascript:;"><img src="../../assets/home1.png"><span>首页</span></a>
		  </router-link>
		</div>
		<div class="parter-carmter">
	      <router-link to="./scanBindShop">
	       <img src="../../assets/camera1.png">
	      </router-link>
	    </div>
		<div class="footer-inde-nav">
			<a href="javascript:;"><img src="../../assets/set-icon2.png"><span>设置</span></a>
		</div>
	</footer>
	<!--清除缓存弹窗-->
	<div class="public-prod" v-show="isshow"></div>
	<div class="setting-box" v-show="isshow">
		<h1>将清除缓存信息以及账号密码信息再次登录时需重新输入账号密码</h1>
		<div class="pelimin remove" @click="remove_sucess">清除</div>
		<div class="pelimin" @click="cansel_btn">取消</div>
	</div>
	<!---->
</div>
</template>

<script>
export default {
  data () {
    return {
      isshow: false
    }
  },
  methods: {
    settinBtn () {
      this.isshow = true
    },
    // 取消
    cansel_btn () {
      this.isshow = false
    },
    // 清除
    remove_sucess () {
      this.isshow = false;
      localStorage.clear();
    }
  }
}
</script>
<style>
body{
  background: #eee;
}
.public-prod{
	position: fixed;
	width: 100%;
	height: 100%;
	top:0;
	left:0;
	background: rgba(255,255,255,0);
}
.setting-box{
	width: 62%;
	background: #fff;
	left: 50%;
	position: fixed;
	box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.50);
	border-radius: 5px;
	transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    padding: 0 2%;
    color: #4F5F66;
}
.setting-box h1{
	padding: 15px 0;
	text-align: center;
}
.pelimin{
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-top: 1px solid #EEEEEE;
}
.remove{
	color: #E80000
}
</style>
