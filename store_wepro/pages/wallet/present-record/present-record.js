var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');

Page({
    data:{
        temp:''
    },
    onLoad:function(e){
        var that = this;
         app.req('post', "store/Ucenter/withDrawLog", {
            data: { 'token': app.getToken() },
            success: function (data) {
                console.log(data.data)
                if (data.code == 200) {
                    var tem=data.data;
                    that.setData({
                        temp:tem
                    })
                } else {
                    util.toast(data.msg);
                    return false;
                }
            }
        });
    }
})