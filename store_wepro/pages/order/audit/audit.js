var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var tems = [], paginate = 10, page = 1, pagesum = 0, status = -1;//总页数;
Page({
  data: {
    indes: 1,
    tem: tems
  },
  onLoad: function (e) {
    // console.log(e);
    var ids = e.ids;
    if (ids == 1) {
      wx.switchTab({
        url: '../audit/audit'
      });
    }
    that = this;
    loadData(that);
  },
  onReachBottom: function () {
    var that = this;
    if (page >= pagesum) {
      util.toast('没有更多数据了');
      return false;
    } else {
      page++;
      loadData(that);
    }
  },
  trusn: function (e) {
    // console.log(e);
    var current = e.currentTarget.dataset.index;
    status = e.currentTarget.dataset.status;
    page = 1;
    pagesum = 0;
    tems = [];
    var that = this;
    loadData(that);
    that.setData({
      indes: current
    })
  },
  todetali: function (e) {
    // console.log(e);
    var orderid = e.currentTarget.id;
    
    console.log(orderid);
    wx.navigateTo({
      url: '../listdetail/listdetail?orderid=' + orderid,
    })
    // wx.redirectTo({
    //   url: '../listdetail/listdetail?orderid=' + orderid,
    // })
   
    
  }
})


function loadData(that) {
  var that = that;
  wx.showToast({
    title: '拼命加载中',
    icon: 'loading',
    duration: 2000
  })
  app.req("post", 'store/Finance/authAll', {
    data: { 'token': app.getToken(), 'paginate': paginate, 'page': page, 'status': status, },
    success: function (res) {
      wx.hideToast();
      if (res.code == 200) {
        var total_data = res.data.page.total_data;
        if (total_data < 1) {
          util.toast('暂无数据');
          tems = [];
          that.setData({
            tem: tems
          });
          return false;

        } else {
          var arr = res.data.list;
          for (var i in arr) {
            tems.push(arr[i])
          }
          pagesum = res.data.page.total_page;
          that.setData({
            tem: tems
          });
        }
      } else {
        util.toast(res.msg);
        return false;
      }
    }
  })
}
