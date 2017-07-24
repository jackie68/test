var app = getApp(), that;
var util = require('../../../utils/util.js');
Page({
  data:{
    uploadmess:"身份证照片已上传",
    truename:"",
    idcard:""
  },
  onLoad:function(e){
    var that=this;
    app.req('post', "store/Ucenter/info", {
    data: { 'token': app.getToken()},
    success: function (data) {
      if (data.code == 200) {
        var datas=data.data,
            truename=datas.true_name,
            isupload=datas.id_opposite,
            idcard=datas.id_card;

            if(isupload){
              isupload="身份证照片已上传";
            }else{
              isupload="身份证照片未上传";
            }
            that.setData({
              truename:truename,
              idcard:idcard,
              uploadmess:isupload
            })
        
      } else {
        util.toast(data.msg);
      }
    }
  });
  }
 
})