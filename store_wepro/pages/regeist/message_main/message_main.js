var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var openid = '';
var namenick = '';
Page({
  data: {
    name: '',
    idcard: '',
    wxname: '',
    phonenum: '',
    address: '',
    appId: 'wx49d80212554c7677',
    appSecret: 'ba36cbc4b4bbc4d52b374df8801d9e06'
  },
  onLoad: function () {
    var that = this;
    // 生命周期函数--监听页面初次渲染完成
    app.req('post', "store/Ucenter/info", {
      data: { 'token': app.getToken() },
      success: function (data) {
        if (data.code == 200) {
          var datas = data.data;
          let name = datas.true_name,
            idcard = datas.id_card,
            wxname = datas.wechat_no,
            phonenum = datas.mobile_phone,
            address = datas.address
            ;
          that.setData({
            name: name,
            wxname: wxname,
            idcard: idcard,
            phonenum: phonenum,
            address: address
          })

        }
        else {
          console.log('ss')
          util.toast(data.msg);
        }
      }
    });
  },
  rebind: function (e) {
    var that = this;

    var appid = this.data.appId,
      secret = this.data.appSecret;
    wx.login({
      success: function (res) {
        var logincode = res.code;
        // console.log(logincode);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + logincode,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

            openid = res.data.openid;
            //console.log(openid);

          }
        });
        wx.getUserInfo({
          success: function (res) {
            namenick = res.userInfo.nickName;
            that.setData({
              wxname: namenick
            });

            //重新绑定微信用户
            app.req('post', "/store/Ucenter/reBindWechat", {
              data: { 'token': app.getToken(), 'openid': openid, 'wechat_no': namenick }, success: function (res) {
                if (res.code == 200) {
                  util.toast('绑定成功');

                } else {
                  util.toast(res.msg);
                }
                //console.log(res);

              }
            })
          },
          fail: function () {
            that.setData({
              wx_name: false
            })
            // fail
          },
          complete: function () {
            // complete
          }
        });
      },
      fail: function () {
        // fail
        util.toast('登录状态异常');
      }
    });

  },
  checkmes: function () {
    nation.urlto('../../../pages/regeist/message_user/message_user');
  },
  changenum: function () {
    nation.urlto('../../../pages/regeist/change_phone/change_phone');
  },
  changeadr: function () {
    nation.urlto('../../../pages/regeist/changeadr/changeadr');
  },
  changepwd: function () {
    nation.urlto('../../../pages/regeist/change_pwd/change_pwd');
  }

})