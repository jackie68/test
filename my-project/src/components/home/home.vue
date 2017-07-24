<template>
<div class="home-views">
  <header class="partner-head">
    <div class="total-income">总收益(元)</div>
    <v-income :haderDate="haderDate"></v-income>
  </header>
  <div class="parter-money-message">
    <div class="publics-money available-money">可提余额(元)<span>{{haderDate.income}}</span></div>
    <div class="publics-money">已提余额(元)<span>{{haderDate.outlay}}</span></div>
  </div>
  <div class="parter-index-box">
    <ul>
      <li v-if="haderDate.viewinvite == 1">
        <router-link to="./invitatStatics">
          <label><img src="../../assets/invite.png">邀请统计</label>
          <span>邀请记录<i></i></span>
        </router-link>
      </li>
      <li>
        <router-link to="./statistics">
          <label><img src="../../assets/money.png">收益统计</label>
          <span>收益记录<i></i></span>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="parter-index-box">
    <ul>
      <li>
        <router-link to="./mywallet">
          <label><img src="../../assets/my-proket.png">我的钱包</label>
          <span>本账户余额与收益<i></i></span>
        </router-link>
      </li>
      <li>
        <router-link to="./preApplication">
          <label><img src="../../assets/tixian.png">提现申请</label>
          <span>提现记录<i></i></span>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="parter-index-box">
    <ul>
      <li @click="shop_bindings">
          <label><img src="../../assets/store.png">店铺绑定</label>
          <span>店铺详情<i></i></span>
      </li>
    </ul>
  </div>
  <div class="parter-index-box">
    <ul>
      <li v-if="haderDate.viewinvite == 1" @click="inviteJoin_btn">
          <label><img src="../../assets/invite-friend.png">邀请好友</label>
          <span>邀请好友<i></i></span>
      </li>
    </ul>
  </div>
  <div class="clearance"></div>
  <footer class="parter-footer-model">
    <div class="footer-inde-nav">
      <a href="javascript:;"><img src="../../assets/home2.png"><span>首页</span></a>
    </div>
    <div class="parter-carmter">
       <img @click="scan_btn" src="../../assets/camera1.png">
    </div>
    <div class="footer-inde-nav">
      <router-link to="./setting">
        <img src="../../assets/set-icon1.png"><span>设置</span>
      </router-link>  
    </div>
  </footer>
</div>

</template>

<script>
import base64url from "base64url"
import Income from '@/components/totalIncome/totalIncome'
export default {
  components: {
    'v-income': Income
  },
  data () {
    return {
      haderDate: {}
    }
  },

  methods: {
    inviteJoin_btn () {
      let access_token = localStorage.getItem("access_token");
      let Intercept = access_token.split('.')[1];
      let timexp = JSON.parse(base64url.decode(Intercept));
      let userId = timexp.userid
      //this.$router.push({ path: '/inviteJoin' })
      window.location.href = "http://vxsx.jyeg.com/inviteJoin?userid=" + userId + ""
    },

    shop_bindings () {
      let _url = location.href.split('#')[0];
      window.location.href = _url + "shopBindings"
    },

    scan_btn () {
      let _url = location.href.split('#')[0];
      window.location.href = _url + "scanBindShop"
    }
  },
  created () {
    let access_token = localStorage.getItem("access_token");
    this.$http.post(this.HOST + '/index/indexm', {authorization: access_token}).then(response => {
      // get data
      if (response.data.code === 200) {
        // console.log(response.data)

        this.haderDate = response.data.data
      }
    }, response => {
      // error callback
    })
  }
}
</script> 

<style>
.home-views{
  height:100%;
  background: #eee;
}
</style>
