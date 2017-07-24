<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="item in goods">
          <span class="text border-1px">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="footer-wrapper">
      <ul>
        <li class="footer-list" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="footer-item border-1px" v-for="food in item.foods">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.$http.get('/api/goods').then(response => {
        this.goods = response.data.data;
        console.log(response.data);
      }, response => {
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxi"
  @import "../../common/stylus/base"
  .goods
    display: flex
    width: 100%
    overflow: hidden
    position: absolute
    top: 174px
    bottom: 46px
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        width: 56px
        height:54px
        padding: 0 12px
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          line-height: 14px
          border-1px(rgba(7,17,27,0.1))
    .footer-wrapper
      flex: 1
      .title
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147,153,159)
        border-left: 2px solid #d9dde1
        padding-left: 14px
        background: #f3f5f7
      .footer-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        .icon
          flex: 0 0 57px
        .content
          flex: 1;
          margin-left: 10px
          .name
            font-size: 14px
            line-height: 14px
            color: rgb(7,17,27)
            margin: 2px 0 8px 0
          .desc,.extra
            font-size: 10px
            line-height: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              font-size: 14px
              margin-right: 8px
              color: #f01414
            .old
              font-size: 10px
              color: #93999f


</style>
