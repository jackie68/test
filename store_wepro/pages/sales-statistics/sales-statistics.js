var app = getApp(), that;
var util = require('../../utils/util.js');
var nation = require('../../utils/nation.js');
var temp = [];
Page({
    data: {
        today_count: '',
        today_total_turnover: '',
        today_total_earning: '',
        yesterday_count: '',
        yesterday_total_turnover: '',
        yesterday_total_earning: '',
        seven_count: '',
        seven_total_turnover: '',
        seven_total_earning: '',
        month_count: '',
        month_total_turnover: '',
        month_total_earning: '',
        last_month_count: '',
        last_month_total_turnover: '',
        last_month_total_earning: '',
        year_count: '',
        year_total_turnover: '',
        year_total_earning: ''
    },
    onLoad: function () {
        var that = this;
        app.req('post', '/store/Ucenter/saleCensus', {
            data: { 'token': app.getToken() },
            success: function (data) {
                if (data.code == 200) {
                    console.log(data.data.last_month);
                    var today = data.data.today,
                        yes = data.data.yesterday,
                        sev = data.data.seven,
                        mon = data.data.month,
                        lasmon = data.data.last_month,
                        year = data.data.year;
                    that.setData({
                        today_count: today.count,
                        today_total_turnover: today.total_turnover,
                        today_total_earning: today.total_earning,
                        yesterday_count: yes.count,
                        yesterday_total_turnover: yes.total_turnover,
                        yesterday_total_earning: yes.total_earning,
                        seven_count: sev.count,
                        seven_total_turnover: sev.total_turnover,
                        seven_total_earning: sev.total_earning,
                        month_count: mon.count,
                        month_total_turnover: mon.total_turnover,
                        month_total_earning: mon.total_earning,
                        last_month_count: lasmon.count,
                        last_month_total_turnover: lasmon.total_turnover,
                        last_month_total_earning: lasmon.total_earning,
                        year_count: year.count,
                        year_total_turnover: year.total_turnover,
                        year_total_earning: year.total_earning,
                    })
                } else {
                    util.toast(data.msg);
                }
            }
        })
    },
    todetail:function(){
        nation.urlto("../sales-statistics/sales-details/sales-details")
    }
})
