<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <v-content></v-content>
  </div>
</template>

<script>
import header from '@/components/header/header.vue';
import footerContent from '@/components/goods/goods.vue';

export default {
  components: {
    'v-header': header,
    'v-content': footerContent
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/minxi"
@import "common/stylus/base"
#app
  font-family:"微软雅黑"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height:40px
    // border-bottom: 1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      color: rgb(77, 85, 93)
      font-size: 14px
</style>
