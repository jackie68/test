//index.js
var app = getApp(),that;
var util = require('../../utils/util.js');
import {StorageUtil} from '../../utils/storageUtil.js';


Page({
  data: {
    code: '',
  },
  onLoad: function () {
    console.log(StorageUtil);
    let storage = new StorageUtil();
    //storage.clear();
    that = this;
  },
  // Scan the product barcode
  scanCode: function (e) {
    console.log(e);
    wx.scanCode({
      success: (res) => {
        let code = res.result;
        console.log(code);

        //output xml
        that.setData({
          code:code
        });
      }
    });
  },
  // Form submit event
  formSubmit: function (e) {
      console.log(e);
      console.log('form发生了submit事件，携带数据为：', e.detail.value);

      wx.showModal({
        title: '提示',
        content: JSON.stringify(e.detail.value),
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
  }
});
