<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">粥品香坊（回龙观）</span>
        </div>
        <div class="description">蜂鸟专送</div>
        <div class="support">
          <span class="icon"></span>
          <span class="text">在线支付满28减5</span>
        </div>
      </div>
      <div class="support-count">
        <span class="count" @click="notice">5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span></span>
      <span class="bulletin-text">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background"><img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"/></div>
    <div v-show="show" class="detail">
      <div class="detail-wrapper">
        <div class="detail-main">
          <h1>粥品香坊（回龙观）</h1>
          <div class="star-wrapper">
            <v-star :size="48" :score="3"></v-star>
          </div>
          <div class="detail-title">
            <div class="line"></div>
            <div class="title">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li>
              <span></span>
              <span>在线支付满28减5</span>
            </li>
            <li>
              <span></span>
              <span>VC无限橙果汁全场8折</span>
            </li>
            <li>
              <span></span>
              <span>单人精彩套餐</span>
            </li>
            <li>
              <span></span>
              <span>该商家支持发票,请下单写好发票抬头</span>
            </li>
            <li>
              <span></span>
              <span>已加入“外卖保”计划,食品安全保障</span>
            </li>
          </ul>
          <div class="detail-title">
            <div class="line"></div>
            <div class="title">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeBtn"><i class="icon-close"></i></div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue';
  export default {
    data() {
      return {
        show: false
      };
    },
    methods: {
      notice: function() {
        this.show = true;
      },
      closeBtn: function() {
        this.show = false;
      }
    },
    components: {
      'v-star': star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon"
  @import "../../common/stylus/minxi"
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7,17,27,0.5)
    .content-wrapper
      position: relative
      padding 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        & img
          width: 64px
          height: 64px
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size 14px
        .title
          margin: 2px 0 8px 0
          .brand
            vertical-align: top
            display: inline-block
            bg-image('brand')
            width: 30px
            height: 18px
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .support
          .text
             font-size 10px
             line-height 12px
      .support-count
        position: absolute
        background: rgba(0,0,0,0.2)
        right: 12px
        bottom: 14px
        height: 24px
        line-height: 24px
        border-radius: 12px
        text-align:center
        padding: 0 8px
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          font-size: 10px
          margin-left: 2px
          line-height: 25px
    .bulletin-wrapper
      position: relative
      padding: 0 22px 0 12px
      height: 28px
      line-height: 28px
      background: rgba(7,17,27,0.2)
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px;
        top: 8px
    .background
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      z-index: -1
      -webkit-filter: blur(10px)
      & img
         width: 100%
         height: 100%
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7,17,27,0.8)
      overflow: auto
      z-index: 100
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          display: inline-block
          width: 100%
          margin-top: 64px
          padding-bottom: 64px
          & h1
              font-size: 16px;
              line-height: 16px
              font-weight: 700
              text-align: center
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .detail-title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .title
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
          .bulletin
            width: 80%
            margin: 0 auto
            & p
              font-size: 12px
              line-height: 24px
              padding: 0 12px
  .detail-close
        position: relative
        font-size: 32px;
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
</style>
