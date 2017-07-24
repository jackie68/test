
var app = getApp(), that;
var util = require('../../utils/util.js');
import { StorageUtil } from '../../utils/storageUtil.js';


let page = {
  data: {
    text: "This is page data."
  },
  onLoad: function (options) {
    console.log('onLoad');
  },
  onShow: function () {
    console.log('onShow');
  },
  onReady: function () {
    console.log('onReady');
  },
  onHide: function () {
    console.log('onHide');
  },
  onUnload: function () {
    console.log('onUnload');
  },
  formSubmit: function (e) {
    console.log(e);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let name = e.detail.value.name + '';
    let pass = e.detail.value.pass + '';

    if (name.length <= 0) {
      wx.showToast({
        title: '请填写用户名',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    if (pass.length <= 0) {
      wx.showToast({
        title: '请填写密码',
        icon: 'success',
        duration: 2000
      });
      return;
    }

    // Start auth   
    app.req('post', "/store/Index/login", {
      data: { 'token': app.getToken(), 'name': name, 'pass': pass },
      success: function (data) {
        if (data.code == 200) {
          util.redirect('/pages/main/main');
        } else {
          
          util.toast(data.msg);
        }
      }
    });


  }
}

Page(page);