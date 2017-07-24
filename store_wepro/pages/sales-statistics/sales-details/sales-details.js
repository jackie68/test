var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var paginate =10,//数量
    page = 1,//当前页
    pagesum = 0,//总页数
    arr = [];

Page({
    data: {
        temp: ''
    },
    onLoad: function (e) {
        var that = this;
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
    app.req("post", 'store/Ucenter/saleLog', {
        data: { 'token': app.getToken(), 'paginate': paginate, 'page': page },
        success: function (res) {
            wx.hideToast();
            if (res.code == 200) {
                var total_data=res.data.page.total_data;
                if(total_data<1){
                    util.toast('暂无数据');
                    return false;
                }else{
                var tem = res.data.list;
                for (var i in tem) {
                    arr.push(tem[i])
                }
                pagesum = res.data.page.total_page;
                that.setData({
                    temp: arr
                });
             }
            } else {
                util.toast(res.msg);

                return false;
            }
        }
    })
}