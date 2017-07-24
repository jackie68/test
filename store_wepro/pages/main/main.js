var app = getApp(), that;
var util = require('../../utils/util.js');
var nation = require('../../utils/nation.js');
var img = app.imgsrc, arr = [];
Page({
  data: {
    shop_name: '',
    total_sales: '',//总销售额
    total_income: '',//总收入
    balance: '',//余额
    lists: arr,
    group_type: 0,
    flag: true
  },

  onShow: function () {
    var that = this;
    console.log("主界面："+that);
    app.initCheck();
    // 生命周期函数--监听页面初次渲染完成
    app.req('post', "store/Ucenter/info", {
      data: { 'token': app.getToken() },
      success: function (data) {
        if (data.code == 200) {
          var datas = data.data;
          var grouptype = datas.group_type;

          if (grouptype == 5 || grouptype == 6) {
            // 店员店主
            arr = [
              {
                'imgsrc': img + 'Group1.png',
                'text': '销售扫描',
                'href': '/pages/regeist/scan/scan'
              },
              {
                'imgsrc': img + 'Group2.png',
                'text': '奖金提现',
                'href': '/pages/wallet/wallet'
              },
              {
                'imgsrc': img + 'Group3.png',
                'text': '销售统计',
                'href': '/pages/sales-statistics/sales-statistics'
              },
              {
                'imgsrc': img + 'Group4.png',
                'text': '个人中心',
                'href': '/pages/regeist/message_main/message_main'
              }
            ]
          } else if (grouptype == 7) {
            arr = [
              {
                'imgsrc': img + 'Group5.png',
                'text': '销售下单',
                'href': '/pages/order/book/book',
              }, {
                'imgsrc': img + 'Group7.png',
                'text': '订单列表',
                'href': '/pages/order/lists/lists'
              }
            ]
          } else if (grouptype == 8) {
            arr = [
              {
                'imgsrc': img + 'Group6.png',
                'text': '审核',
                'href': '/pages/order/audit/audit'
              }
            ]
          }
          let shop_name = datas.store_name,
            total_sales = datas.total_turnover,
            total_income = datas.total_earning,
            balance = datas.balance;

          that.setData({
            shop_name: shop_name,
            total_sales: total_sales,
            total_income: total_income,
            balance: balance,
            group_type: grouptype,
            lists: arr
          })

        } else {
          util.toast(data.msg);
        }
      }
    });
  },
  onLoad: function () {
    
  },
  

  quit: function (e) {
    this.setData({
      flag: false
    })

  },
  confirm: function () {
    this.setData({
      flag: true
    })

    app.toLogin();
  },
  cancel: function () {
    this.setData({
      flag: true
    });

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})