<template>
<div class="statist-views">
<header class="partner-head">
	<div class="total-income">总收益(元)</div>
	<v-income :haderDate="haderDate"></v-income>
</header>
<div class="statist-list-box">
	<ul v-if="satistList.length>0">
		<li v-for="site in satistList">
			<div class="shop-statit-title"><img src="../../assets/shop.png"><span>{{site.shopname}}</span></div>
			<div class="staitact-modle-box">
				<div class="staitIn"><img src="../../assets/time.png">录入：{{site.c_time}}  </div>
				<p>收益：{{site.d_time}}</p>
			</div>
			<div class="stati-Profit">共收益<span>{{site.money}}</span>元</div>
		</li>
	</ul>
	<div class="nothing-data" v-else>
     <img src="../../assets/nothin_icon.png" />
     <p>没有数据</p>
  </div>
</div>
</div>
</template>

<script>
import Income from '@/components/totalIncome/totalIncome'

export default {
  components: {
    'v-income': Income
  },
  data () {
    return {
      satistList: {},
      haderDate: {}
    }
  },
  created () {
    let access_token = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/indexm',{authorization: access_token}).then(response => {
      // get data
      if (response.data.code === 200) {
        // console.log(response.data)
        this.haderDate = response.data.data
      }
    }, response => {
       // error callback
    });
    this.$http.post(this.HOST + '/index/UserCenter/SyTj',{authorization: access_token}).then(response => {
      // get data
      if(response.data.code === 200){
        //console.log(response.data)
        this.satistList = response.data.data.data
        //console.log(response.data.data)
      } else {
        //console.log(response.data.data)
        this.satistList = [];
      }
      

    }, response => {
      // error callback

    })
  }
}
</script>

<style>
.statist-views{
    height:100%;
    background: #eee;
}
.nothing-data img{
  width:110px;
  margin:auto;
  padding-top:20%;
}
.nothing-data p{
  text-align: center;
  padding-top:5%;
}
</style>
