var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var arr = [], page = 0, paginate = 10, goodlist = [],numsd,goodid;

Page({
  data: {
    temp: arr,
    greenTab: 0,
    goods: goodlist,
    flag: true,
    godn: '',
    gopr: '',
    ks:''
  },
  onLoad: function (options) {
    var that = this;
    app.req('post', 'store/PreOutOrder/cateAll', {
      data: {
        'token': app.getToken(),
        'cate_id': 0
      },
      success: function (res) {
        if (res.code == 200) {
          arr = res.data;
          var cate_ids = res.data[0].id;
          that.setData({
            temp: arr
          });
          loadData(that, cate_ids)
        }
      }
    })
  },
  trun: function (e) {
    // console.log(e);
    var ids = e.currentTarget.dataset.green,
      id = e.currentTarget.id;
    var that = this;

    that.setData({
      greenTab: ids
    })
    loadData(that, id);
  },
  mcal: function (e) {
    console.log(e);
   
    var that = this;
    goodid = e.currentTarget.dataset.id;
    var insk = e.currentTarget.dataset.indexs,
      goodsnames = goodlist[insk].goods_name,
      goods_price = goodlist[insk].goods_price;


    that.setData({
      flag: false,
      godn:goodsnames,
      gopr: goods_price,
      ks:''
    })
  },
  nums:function(e){
    numsd=e.detail.value;
  },
  confirm: function () {

    var regs=nation.check(5,numsd);
    var that=this;
   
   if(numsd<=0 || !regs ){
         util.toast("请输入正确的数量");
          return false;
   }else{
     var id_num=goodid + '-' + numsd;
    //  console.log(id_num);
     nation.urlto('../book/book?goodid='+goodid+'&numsd='+numsd);
     numsd=''; //完成清空modal中input框数据
    //return false;
    //  app.req('post','store/PreOutOrder/createPreOrder',{
    //    data:{
    //       'token': app.getToken(),
    //       'id_num':id_num
    //    },
    //    success:function(res){
    //     if(res.code==200){
    //       util.toast('下单成功');
    //          that.setData({
    //             flag: true
    //         })
    //     }else{
    //         util.toast(res.msg);
    //         return false;
    //     }
    //    }
    //  })
   }
  },
  cancel: function () {
    
    this.setData({
      flag: true
    })
  }

})

function loadData(that, cate_ids) {
   wx.showToast({
    title: '拼命加载中',
    icon: 'loading',
    duration: 2000
  })
  app.req('post', 'store/PreOutOrder/goodsAll', {
    data: {
      'token': app.getToken(),
      'cate_id': cate_ids
    },
    success: function (res) {
       wx.hideToast();
      if (res.code == 200) {
        goodlist = res.data;
        if(goodlist<=0){
           util.toast('没有数据了');
            that.setData({
              goods: ''
            });
            return false;
        }else{
        that.setData({
          goods: goodlist
        });
        }
      }
    }
  })
}