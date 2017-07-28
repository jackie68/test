<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">￥4</div>
        <div class="desc">另需配送费￥4元</div>
      </div>
      <div class="content-right">
        <div class="play not-enough">￥20起送</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon"
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          vertical-align: top
          top: -10px
          width: 56px
          height: 56px
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          background: #141d27
          border-radius: 50%
          .logo
            width: 100%
            height: 100%
            background: #2b343c
            border-radius: 50%
            text-align: center
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
        .price
          display: inline-block
          font-size: 16px
          font-weight: 700
          padding-right: 12px
          margin-top: 12px
          line-height: 24px
          border-right: 1px solid rgba(255,255,255,0.4)
        .desc
          display: inline-block
          font-size: 10px
          line-height: 24px
          font-weight: 700
          padding: 0 12px
      .content-right
        flex: 0 0 105px
        width: 105px
        .play
          text-align: center
          font-size: 12px
          font-weight: 700
          height: 48px
          line-height: 48px
          &.not-enough
            background: #2b333b
</style>
