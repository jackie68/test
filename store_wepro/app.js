//app.js
let that;
let util = require('utils/util.js');
import { StorageUtil } from 'utils/storageUtil.js';
let storage = new StorageUtil();

let APP_DEBUG = 1; // 1调试域名，0正式域名

App({
  imgsrc: 'http://juyuanimg.oss-cn-shenzhen.aliyuncs.com/wx/',
  onLaunch: function () {
    console.log('app onLaunch');
    that = this;
  },
  onShow: function () {
    console.log('app onShow');
    that.initCheck();
  },
  getUserInfo: function (cb) {
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  globalData: {
    userInfo: null,
  },
  // Global request domain
  getReqDomain: function () {
    if (APP_DEBUG == 1) {
      return 'http://gyl.jyeg.net:8888/';
    } else {
      return 'https://app.jyeg.com/';
    }
  },
  // Request function
  req: function (method, url, arg) {
    let domian = that.getReqDomain(), data = {}, dataType = 'json',
      header = { 'content-type': 'application/x-www-form-urlencoded' };

    if (arg.data) {
      data = Object.assign(data, arg.data);
    }
    if (arg.header) {
      header = arg.header;
    }
    if (arg.dataType) {
      dataType = arg.dataType;
    }

    let request = {
      method: method.toUpperCase(),
      url: domian + url,
      data: data,
      dataType: dataType,
      header: header,
      success: function (resp) {
        console.log(resp.data);

        let data = resp.data;
        if (data.code == 40004 || data.code == 40005) {
          that.toLogin();
          return;
        }

        if (data.code == 40014) {
          //token still valid,just need to login
          that.toLogin(0);
          return;
        }

        if (data.code == 40023) {
          //no permisson
          util.toast(resp.msg);
          return;
        }

        typeof arg.success == "function" && arg.success(data);
      },
      fail: function () {
        util.toast('请求失败,请稍后再试');
        typeof arg.fail == "function" && arg.fail();
      },
      complete: function () {
        typeof arg.complete == "function" && arg.complete();
      }
    };
    wx.request(request);
  },
  // Req & Set token 
  reqSetToken: function (arg) {
    console.log('req token');
    let timeStamp = util.getCurrentTimestamp();
    that.req('post', 'index/token/get', {
      'data': {
        'appid': 'appid',
        'secret': 'secret',
        'platform': 'wechat_pro',
        'time': timeStamp
      },
      'success': function (resp) {
        if (resp.code == 200) {
          let token = resp.data.token;
          let expireTimestamp = resp.data.expire_timestamp;

          storage.setter('token', token);
          storage.setter('expireTimestamp', expireTimestamp);

          typeof arg.success == "function" && arg.success();
        } else {
          util.toast(resp.msg);
          typeof arg.fail == "function" && arg.fail();
        }
      }
    });
  },
  // Get token
  getToken: function () {
    return storage.getter('token');
  },
  // To login
  toLogin: function (refreshToken = 1) {
    if (refreshToken == 1) {
      storage.remove('token');
      storage.remove('expireTimestamp');

      that.reqSetToken({
        'success': function () {
          util.redirect('/pages/regeist/login_user/login_user');
        }
      });
    } else {
      util.redirect('/pages/regeist/login_user/login_user');
    }
  },
  initCheck: function () {
    let curTime = util.getCurrentTimestamp();
    let token = that.getToken();
    let expireTimestamp = storage.getter('expireTimestamp');

    if (!token || token == '' || !expireTimestamp || expireTimestamp == '' || curTime > expireTimestamp) {
      that.toLogin();
    }
  }
});