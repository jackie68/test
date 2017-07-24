var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var flskd = true,
  phonesa = '',
  noloop = true,
  tempFilePathsup = '',
  tempFilePathsdown = '',
  imgpath = [],
  imgpaths = [],
  upimg = '',
  downimg = '',
  openid = '';
Page({
  data: {
    clearnum: true,
    clearpwd: true,
    phonenums: '',
    phonepwd: '',
    falsk: false,
    pwdsk: false,
    showpwd: "显示",
    typekind: "password",
    getcode: "获取验证码",
    uploadimgup: false,
    uploadimgupshow: true,
    upimgshow: '',
    uploadimgdown: false,
    uploadimgdownshow: true,
    downimgshow: '',
    nickname: '',
    wx_name: true,
    appId: 'wx49d80212554c7677',
    appSecret: 'ba36cbc4b4bbc4d52b374df8801d9e06'
  },
  onLoad: function () {
    var appid = this.data.appId,
      secret = this.data.appSecret;
    var that = this;
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
        wx.getUserInfo({
          success: function (res) {
            var namenick = res.userInfo.nickName;
            that.setData({
              nickname: namenick
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
        })
      },
      fail: function () {
        // fail
        util.toast('登录状态异常');
      }
    });

  },
  // 手机号码清除
  numfocus: function (e) {
    console.log(e);

    this.setData({
      clearnum: false
    })
  },
  clearnums: function (e) {
    this.setData({
      phonenums: "",
      falsk: true
    })
  },
  // 密码清除
  pwdfocus: function () {
    this.setData({
      clearpwd: false
    })
  },
  clearpwd: function (e) {
    this.setData({
      phonepwd: "",
      pwdsk: true
    })
  },

  inputnums: function (e) {
    phonesa = e.detail.value;
    //console.log("1111");
  },
  //显示密码
  showpwd: function () {
    flskd = !flskd;
    if (flskd) {
      this.setData({
        showpwd: "显示",
        typekind: "password",
        pwdsk: "true"
      })
    } else {
      this.setData({
        showpwd: "隐藏",
        typekind: "text",
        pwdsk: "true"
      })
    }

  },
  // 获取验证码
  getcode: function (e) {
    // Start auth
    var isPhone = nation.check(1, '' + phonesa + '');
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
              getcode: '重新获取'
            });
            noloop = true;
          } else {
            that.setData({
              getcode: time + 's'
            })
          }
        }, 1000);
        app.req('post', "/store/Index/sendSms", {
          data: { 'token': app.getToken(), 'phone': phonesa },
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
  // 上传身份证正面
  upload_up: function () {
    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePathsup = res.tempFilePaths[0];

        wx.uploadFile({
          url: app.getReqDomain() + 'store/Index/upload',
          filePath: tempFilePathsup,
          name: 'img',
          formData: {
            'token': app.getToken()
          },
          success: function (res) {
            var resp = JSON.parse(res.data);
            if (resp.code == 200) {
              upimg = resp.data.path;

              that.setData({
                uploadimgup: true,
                uploadimgupshow: false,
                upimgshow: tempFilePathsup
              })

            } else {
              util.toast(resp.msg);
              return false;
            }
          },
          fail: function (err) {
            console.log('upimg');
            return false;
          }
        });



      }
    })
  },
  // 上传身份证反面
  upload_down: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePathsdown = res.tempFilePaths[0];

        wx.uploadFile({
          url: app.getReqDomain() + 'store/Index/upload',
          filePath: tempFilePathsdown,
          name: 'img',
          formData: {
            'token': app.getToken()
          },
          success: function (res) {
            var resp = JSON.parse(res.data);
            if (resp.code == 200) {
              downimg = resp.data.path;

              that.setData({
                uploadimgdown: true,
                uploadimgdownshow: false,
                downimgshow: tempFilePathsdown
              })
            } else {
              util.toast(resp.msg);
              return false;
            }
          },
          fail: function (res) {
            util.toast(res.msg);
            return false;
          }
        });


      }
    })
  },
  // 审核申请
  formSubmit: function (e) {
    //  console.log(e);
    //  console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let phonenumber = e.detail.value.phonenumber + '',
      mescode = e.detail.value.mescode + '',
      password = e.detail.value.password + '',
      wxno = e.detail.value.wxno + '',
      address = e.detail.value.address + '',
      trueName = e.detail.value.trueName + '',
      idCard = e.detail.value.idCard + '';
    var message = [
      { 'key': phonenumber, 'tips': '手机号不能为空' },
      { 'key': mescode, 'tips': '验证码不能为空' },
      { 'key': password, 'tips': '密码不能为空' },
      { 'key': wxno, 'tips': '微信号不能为空' },
      { 'key': address, 'tips': '详细地址不能为空' },
      { 'key': trueName, 'tips': '真实姓名不能为空' },
      { 'key': idCard, 'tips': '身份证号不能为空' },
    ]
    var arr = [];
    for (var lens = message.length - 1, i = lens; i >= 0; i--) {
      if (emptys(message[i].key, message[i].tips)) {
        arr.push(i);
      }
    }
    if (arr.length == message.length) {
      //非空
      // 验证其他信息是否合法
      // 判断手机号
      var isPhonenum = nation.check(1, '' + phonenumber + '');
      if (!isPhonenum) {
        util.toast('手机格式不正确');
        return false;
      }
      // 判断密码格式
      var ispassword = nation.check(2, '' + password + '');
      if (!ispassword) {
        util.toast('密码格式不正确');
        return false;
      }
      // 判断身份证格式
      var isidCard = nation.check(3, '' + idCard + '');
      if (!isidCard) {
        util.toast('身份证格式不正确');
        return false;
      }
      if (tempFilePathsup == '') {
        util.toast('请上传身份证正面');
        return false;
      }
      if (tempFilePathsdown == '') {
        util.toast('请上传身份证背面');
        return false;
      }
      if (upimg == '') {
        util.toast('图片上传预览中');
        return false;
      }
      if (downimg == '') {
        util.toast('图片上传预览中');
        return false;
      }

      // 到这里数据校验已完成
      // 审核申请接口


      app.req('post', "/store/Index/reg", {
        data: { 'token': app.getToken(), 'name': phonenumber, 'pass': password, 'verify_code': mescode, 'address': address, 'true_name': trueName, 'id_card': idCard, 'wechat_no': wxno, 'id_card_positive': upimg, 'id_card_opposite': downimg, openid: openid },
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


    } else {
      // 有一个或多个为空
      return false;
    }
  }
})

// 判空
function emptys(objval, objtips) {
  objval = '' + objval + '';
  if (objval.length <= 0 || nation.trim(objval) == "") {
    wx.showToast({
      title: objtips,
      icon: 'success',
      duration: 2000
    });
    return false;
  } else {
    return 1;
  }
}

