var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var tem=[],paginate=10,page=1, pagesum = 0;//总页数;
Page({
  data:{
    lists:tem
  },
  onLoad:function(options){
    var that=this;
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
    }

})

function loadData(that) {
    var that = that;
    wx.showToast({
        title: '拼命加载中',
        icon: 'loading',
        duration: 2000
    })
    app.req("post", 'store/PreOutOrder/preOrderAll', {
        data: { 'token': app.getToken(), 'paginate': paginate, 'page': page },
        success: function (res) {
            wx.hideToast();
            if (res.code == 200) {
                var total_data=res.data.page.total_data;
                if(total_data<1){
                    util.toast('暂无数据');
                    return false;
                }else{
                var arr = res.data.list;
                for (var i in arr) {
                    tem.push(arr[i])
                }
                pagesum = res.data.page.total_page;
                that.setData({
                    lists:tem
                });
             }
            } else {
                util.toast(res.msg);
                return false;
            }
        }
    })
}
