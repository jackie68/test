var app = getApp(), that;
var util = require('../../utils/util.js');
var nation = require('../../utils/nation.js');
Page({
    data: {
        withdraw: '',
        yue: '',
        sum: ''
    },
    onLoad: function () {
        var that = this;
        app.req('post', "/store/Ucenter/info", {
            data: { 'token': app.getToken() },
            success: function (data) {
                var datas=data.data;
                if (data.code == 200) {
                  that.setData({
                      withdraw:datas.total_withdraw,
                      yue:datas.balance,
                      sum:datas.total_earning
                  })
                } else {
                    util.toast(data.msg);
                    return false;
                }
            }
        });
    },
    record:function(){
        nation.urlto('../wallet/present-record/present-record');
    },
    sendq:function(){
         nation.urlto('../wallet/cash-withdrawal/cash-withdrawal');
    }
    
})