<template>
<div class="invit-box">
<!-- 数据统计部分 -->
<div class="data-statist-box">
	<div class="data-classfit dataIn"><span></span>已激活</div>
	<div class="data-classfit dataOut"><span></span>未激活</div>
	<div class="crilder">
    <svg width="100" height="100" viewbox="0 0 100 100">
        <circle cx="50" cy="50" r="43" stroke-width="10" stroke="#EEEEEE" fill="none"></circle>
        <circle cx="50" cy="50" r="43" stroke-width="10" stroke="#2A84F7" fill="none" transform="matrix(0,-1,1,0,0,100)" stroke-dasharray="0 270"></circle>
    </svg>
    <div class="yaoqing">已邀请</div>
    <div class="yaoCounten"><span>{{listData.count}}</span>人</div>
  </div>
	<div class="data-model-text" >其中已激活{{listData.Activity}}人，未激活{{listData.unActivity}}人</div>
</div>
<!--end-->
<div class="data-nav-box">
	<ul>
		<li :class="{data_actives:active_pate}" @click="activation_btn"><a href="javascript:;">已激活</a></li>
		<li :class="{data_actives:actice_nopate}" @click="activation_nobtn"><a href="javascript:;">未激活</a></li>
	</ul>
</div>

<router-view></router-view>

<div class="data-contants-list" v-show="active_pate">
	<ul>
    <div v-for="(item, index) in listData.jdata">
      <div class="dateTime-title" >{{ index }}</div>
        <li v-for="childItem in item">
          <span>{{ childItem.phone }}</span>
          <span>{{ childItem.name }}</span>
          <span>{{ childItem.area }}</span>
        </li>
    </div>
	</ul>
  <!--
  <div class="nothing-data">
     <img src="../../assets/nothin_icon.png" />
     <p>没有数据</p>
  </div>
  -->
</div>

<!--未激活-->
<div class="data-contants-list" v-show="actice_nopate">
  <ul>
    <div v-for="(item, index) in listData.wdata">
      <div class="dateTime-title" >{{ index }}</div>
        <li v-for="childItem in item">
          <span>{{ childItem.phone }}</span>
          <span>{{ childItem.name }}</span>
          <span>{{ childItem.area }}</span>
        </li>
    </div>
  </ul>
  <!--
  <div class="nothing-data" v-else>
     <img src="../../assets/k_dingdan_h.png" />
     <p>没有数据</p>
  </div>
  -->
</div>
<!---->

</div>
</template>
<script>

// import circliful from 'script-loader!../../../static/js/jquery.circliful.min.js';
export default {
 
  data () {
    return {
      active_pate: true,
      actice_nopate: false,
      listData: {}
    }
  },
  methods: {   
    activation_btn() {
      this.active_pate = true;
      this.actice_nopate = false;
    },
    activation_nobtn() {
      this.active_pate = false;
      this.actice_nopate = true;
    }
  },
  created () {
    let access_token = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/UserCenter/yqtj',{authorization: access_token}).then((response) => {
      if (response.data.code === 200) {
        console.log(response.data)
        if ( response.data.data.count != 0 ){
          let percent = response.data.data.Activity / response.data.data.count;
          let perimeter = Math.PI * 2 * 43;
          let circle = document.querySelectorAll("circle")[1];
          circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
        }
        this.listData = response.data.data
        //alert(response.data.data.jdata.length)
      }
    })
  }
}
</script>

<style>
.invit-box{
  height:100%;
  background: #eee;
}
.crilder{
  width:100px;
  height:100px;
  margin: auto;
  margin-top:10px;
  position: relative;
  margin-bottom:8px;
}
.yaoqing{
  width:100%;
  position: absolute;
  text-align: center;
  top:25px;
  font-size:13px;
}
.yaoCounten{
  width:100%;
  position: absolute;
  text-align: center;
  top:50px;
  font-size:12px;
}
.yaoCounten span{
  font-size:18px;
  color: #2A84F7;
}
.nothing-data img{
  width:150px;
  margin:auto;
  padding-top:20%;
}
.nothing-data p{
  text-align: center;
  padding-top:5%;
}
</style>