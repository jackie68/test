<template>
<div class="notification fixed" transition="slide">
  <div class="content">
      {{tipmsg.msg}}
  </div>
</div>
</template>

<script>
export default {
  props: {
    tipmsg: {
      type: Object
    }
  }

}
</script>
<style>

.notification {
	width: 50%;
	line-height: 2;
	z-index: 3;
	position: fixed;
	top: 50%;
	left: 50%;
	border-radius: 5px;
	transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
	background: rgba(0,0,0,0.65);
}
.notification .content{
	padding: .75rem 2rem;
	text-align: center;
	color:#fff;
}
</style>