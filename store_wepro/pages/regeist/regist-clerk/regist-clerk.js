var app = getApp();
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');

let phoneNumber = '',
  noloop = true,
  openid = '';

Page({
  data: {
    passwordType: "password",
    showpwd: "显示",
    typeId: "1",  //通过showType判断显示或隐藏的密码类型
    coderValue: "获取验证码",
    focusBool: "false",
    distributor: "选择经销商",
    distribuArray: {},
    provinceIndex: 0,
    distritId: 0,
    appId: 'wx49d80212554c7677',
    appSecret: 'ba36cbc4b4bbc4d52b374df8801d9e06'
  },
  onLoad: function (event) {
    //console.log("1111");
    //获取店铺信息
    var that = this;
    app.req('post', "/store/Index/allStoreOwner", {
      data: { 'token': app.getToken() },
      success: function (res) {
        console.log(res);
        if (res.code == 200) {
          that.setData({
            'distribuArray': res.data,
            'distritId': res.data.store_id[0]
          })

        } else {
          //util.toast(data.msg);
        }
      }
    });

    //获取openid值
    var appid = this.data.appId,
      secret = this.data.appSecret;

    wx.login({
      success: function (res) {
        var logincode = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + logincode,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // console.log(res);
            openid = res.data.openid;
          }
        });
      },
      fail: function () {
        // fail
        util.toast('登录状态异常');
      }
    });


  },

  //获取手机号码
  getCodeBtn: function (event) {
    var isPhone = nation.check(1, '' + phoneNumber + '');
    if (!isPhone) {
      util.toast('手机号码不正确');
    } else {
      if (noloop) {
        noloop = false;//防止重复触发
        var that = this;
        var time = 60;
        var timer = setInterval(function () {
          time--;
          if (time < 0) {
            clearInterval(timer);
            that.setData({
              coderValue: '重新获取'
            });
            noloop = true;
          } else {
            that.setData({
              coderValue: time + 's'
            })
          }
        }, 1000);
        app.req('post', "/store/Index/sendSms", {
          data: { 'token': app.getToken(), 'phone': phoneNumber },
          success: function (data) {
            if (data.code == 200) {
              util.toast('发送成功');
            } else {
              util.toast(data.msg);
            }
          }
        });
      }

    }
  },

  //密码显示或隐藏处理
  getCode: function (event) {
    //console.log("111");
    var typeId = event.currentTarget.dataset.typeid;
    console.log(typeId);
    if (typeId == 1) {
      this.setData({
        passwordType: "text",
        showpwd: "隐藏",
        typeId: "2",
        focusBool: "true"
      })
    } else {
      this.setData({
        passwordType: "password",
        typeId: "1",
        showpwd: "显示",
        focusBool: "true"
      })
    }

  },

  //选择店铺
  bindPickerChange: function (event) {
    var dealer_id = this.data.distribuArray.store_id[event.detail.value];
    this.setData({
      'provinceIndex': event.detail.value,
      'distritId': dealer_id
    });
  },

  //提交信息
  formSubmit: function (event) {

    const phoneNumber = event.detail.value.phoneNumber,
      codeValue = event.detail.value.codeValue,
      passwordValue = event.detail.value.passwordValue,
      distributorId = event.detail.value.distributorId,
    //   shopName = event.detail.value.shopName,
      addressValue = event.detail.value.addressValue,
      nameValue = event.detail.value.nameValue,
      cardIdNumber = event.detail.value.cardIdNumber;
      
    const isphones = nation.check(1, '' + phoneNumber + '');
    const ispassword = nation.check(2, '' + passwordValue + '');
    const iscartId = nation.check(3, '' + cardIdNumber + '');
    if (phoneNumber == '') {
      util.toast('手机号不能为空');
      return false;
    } else if (!isphones) {
      util.toast('手机格式不正确');
      return false;
    } else if (codeValue == '') {
      util.toast('验证码不能为空');
      return false;
    } else if (passwordValue == '') {
      util.toast('密码不能为空');
      return false;
    } else if (!ispassword) {
      util.toast('密码格式不正确');
      return false;
    } else if (addressValue == '') {
      util.toast('详细地址不能为空');
      return false;
    } else if (nameValue == '') {
      util.toast('真实姓名不能为空');
      return false;
    } else if (cardIdNumber == '') {
      util.toast('身份证号不能为空');
      return false;
    } else if (!iscartId) {
      util.toast('身份证格式不正确');
      return false;
    } else {
      app.req('post', "/store/Index/reg", {
        data: { 'token': app.getToken(), 'name': phoneNumber, 'pass': passwordValue, 'verify_code': codeValue, 'address': addressValue, 'true_name': nameValue, 'id_card': cardIdNumber,'store_id': distributorId, 'openid': openid, 'reg_type': '2' },
        success: function (data) {
          if (data.code == 200) {
            util.toast('注册成功');
            setTimeout(function () {
              wx.redirectTo({
                url: '../../regeist/login_user/login_user'
              })
            }, 2000)

          } else {
            util.toast(data.msg);
          }
        }
      });
    }
  },

  bindPhone: function (event) {
    phoneNumber = event.detail.value
  },



})


