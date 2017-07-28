<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="footer-wrapper" ref="footWrapper">
      <ul>
        <li class="footer-list food-list-hook" v-for="(item,index) in goods">
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
    <v-shopcart></v-shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  export default {
    components: {
      'v-shopcart': shopcart
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.$http.get('/api/goods').then(response => {
        this.goods = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
//        console.log(response.data);
      }, response => {
      });
    },
    methods: {
      selectMenu(index, event) {
//        alert(index);
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.footWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.footWrapper, {
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
//          console.log(this.scrollY);
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.footWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
//        console.log(this.listHeight);
      }
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
        &.current
          background: #fff
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
        &:last-child
          margin-bottom: 0
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
            line-height: 12px
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
