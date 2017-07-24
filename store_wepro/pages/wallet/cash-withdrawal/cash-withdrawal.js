var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var phonenum = '',
    wxname = '',
    balance = '',
    noloop = true,
    moneys = '',
    code = '',
    time = 0;
Page({
    data: {
        getcode: "获取验证码",
        flag: true,
        phonenum: '',
        wxname: '',
        balance: '',
        yues: ''

    },
    onLoad: function () {
        var that = this;
        app.req('post', "/store/Ucenter/info", {
            data: { 'token': app.getToken() },
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    phonenum = data.data.mobile_phone,
                        wxname = data.data.wechat_no,
                        balance = data.data.balance;
                    that.setData({
                        phonenum: phonenum,
                        wxname: wxname,
                        balance: balance
                    })
                } else {
                    util.toast(data.msg);
                    return false;
                }
            }
        });
    },
    moneys: function (e) {
        console.log(e);
        moneys = e.detail.value;
    },
    subsq: function () {
        var checkmon = nation.check(4, moneys);
        if (checkmon) {


            if (parseInt(moneys) > parseInt(balance) || parseInt(balance) == 0 || parseInt(balance) < 50) {
                util.toast('余额不足');
                return false;
            }else if(parseInt(moneys)<50){
                 util.toast('提现金额不能少于50元');
                return false;
            }
             else {
                //金额正确
                var that = this;
              
    
            noloop = false;//防止重复触发
            var that = this;
             time = 60;
            app.req('post', "/store/Index/sendSms", {
                data: { 'token': app.getToken(), 'phone': phonenum },
                success: function (data) {
                    if (data.code == 200) {
              that.setData({
                    flag: false,
                    yues: moneys
                })
                        // util.toast('发送成功');
             var timer = setInterval(function () {
                time--;
                if (time < 0) {
                    clearInterval(timer);
                    that.setData({
                        getcode: '重新获取'
                    });
                    noloop = true;
                } else {
                    that.setData({
                        getcode: time + 's'
                    })
                }
            }, 1000);
                    } else {
                        util.toast(data.msg);
                    }
                }
            });
        
            }
        } else {
            //金额不正确
            util.toast('请输入正确的金额数');
            return false;
        }

    },
    // 获取验证码
    getcode: function (e) {
        // Start auth     
        if (noloop) {
            noloop = false;//防止重复触发
            var that = this;
             time = 60;
         
            app.req('post', "/store/Index/sendSms", {
                data: { 'token': app.getToken(), 'phone': phonenum },
                success: function (data) {
                    if (data.code == 200) {
                        // util.toast('发送成功');
             var timer = setInterval(function () {
                time--;
                if (time < 0) {
                    clearInterval(timer);
                    that.setData({
                        getcode: '重新获取'
                    });
                    noloop = true;
                } else {
                    that.setData({
                        getcode: time + 's'
                    })
                }
            }, 1000);
                    } else {
                        util.toast(data.msg);
                    }
                }
            });
        }


    },
    bfsk: function (e) {
        code = e.detail.value;
    },
    confirm: function () {
        // 确定

        app.req('post', "store/Ucenter/applyWithDraw", {
            data: { 'token': app.getToken(), 'op_money': moneys, 'verify_code': code, 'phone': phonenum },
            success: function (data) {
                if (data.code == 200) {
                    // success
                      wx.redirectTo({
                            url: '../../wallet/cash-success/cash-success'
                        })
                       this.setData({
                        flag: true
                    })
                  
                } else {
                    
                    if(data.code==40013){
                      util.toast(data.msg);
                      return false;
                    }else{
                     wx.redirectTo({
                            url: '../../wallet/cash-fail/cash-fail'
                        })
                     this.setData({
                        flag: true
                    })
                    }
                  
                   
                }
            }
        });
     
    },
    cancel: function () {
        // 取消
        time = 0;
        this.setData({
            flag: true
        })
    }
})