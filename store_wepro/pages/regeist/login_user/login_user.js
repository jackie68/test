var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
import { StorageUtil } from '../../../utils/storageUtil.js';
Page({
  data:{

  },
  url_toreg:function(){
    // nation.urlto('../../../pages/regeist/administrator/administrator');
    wx.navigateTo({
      url: '../../../pages/regeist/administrator/administrator',
    })
  }
 ,
 url_toforget:function(){
   wx.navigateTo({
     url: '../../../pages/regeist/forget_pwd/forget_pwd',
   })
    // nation.urlto('../../../pages/regeist/forget_pwd/forget_pwd');
 },
 formSubmit: function (e) {
    console.log(e);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let name = e.detail.value.name + '';
    let pass = e.detail.value.pass + '';
    console.log(name);
    console.log(pass);
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
})