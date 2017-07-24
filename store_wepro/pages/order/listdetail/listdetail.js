var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var orderid;
Page({
  data: {
    name: '',
    goodsname: '',
    sum: '',
    time: '',
    nums: '',
    status:'',
    hid:true

  },
  onLoad: function (e) {
    that = this;
    orderid = e.orderid;
    app.req('post', 'store/Finance/orderInfo', {
      data: {
        'token': app.getToken(),
        'order_id':orderid
      },
      success: function (res) {
        if(res.code==200){
        var resd = res.data;
        let name = resd.account_name,
          goodsname = resd.goods_name,
          sum = resd.order_amount,
          time = resd.add_time,
          nums = resd.goods_num,
          status=resd.status;
          console.log(status)
        that.setData({
          name: name,
          goodsname: goodsname,
          sum: sum,
          time: time,
          nums: nums,
          status:status,
           hid:false
        })
      }
    }
    })
  },
  sheh:function(e){
    var sta=e.currentTarget.dataset.sta;
     app.req('post', 'store/Finance/authStatus', {
      data: {
        'token': app.getToken(),
        'order_id':orderid,
        'status':sta
      },
      success: function (res) {

       //console.log("1111");
       if(res.code==200){
          util.toast('操作成功');
          setTimeout(function(){
          
            //nation.urlto("../audit/audit?ids=1");
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
           
          },2000)
       }else{
        util.toast('出错了');
        return false;
       }
     
      }
    })
  }

})