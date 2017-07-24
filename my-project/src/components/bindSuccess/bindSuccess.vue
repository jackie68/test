<template>
<div class="binShop-box">
   <section class="shop-head-box">
		<div class="bindin-message topPading"><img src="../../assets/binding.png">绑定店铺即可成为该店销售顾问</div>
		<div class="bindin-message"><img src="../../assets/location.png">店铺地址(省/市/区)精准定位</div>
		<div class="shop-bindig-nav">
		    <div class="bindin-active nav-line">
		    	<span></span><strong>信息填写</strong>
		    </div>
		    <div class="bindin-active nav-line">
		    	<span></span><strong>扫码激活</strong>
		    </div>
		    <div class="bindin-active active-rule">
		    	<span></span><strong>成功绑定</strong>
		    </div>
		</div>
	</section>

	<section class="shop-bindin-contants">
		<div class="bind-succesful"><img src="../../assets/right.png"></div>
		<div class="successful-message">店铺绑定成功！</div>
	</section>

	<div class="bind-footer-box">
		<div class="express-Lane">
			<fieldset>
				<legend>快速通道</legend>
			</fieldset>
		</div>
		<div class="bind-footer-nav">
			<ul>
				<li><router-link to="/">去首页<i></i></router-link></li>
				<li><router-link to="/scanBindShop">扫码产品<i></i></router-link></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {}
</script>
<style>
.binShop-box{
  height:100%;
	background: #eee;
}
.topPading{
  padding-top:2%;
}
</style>
