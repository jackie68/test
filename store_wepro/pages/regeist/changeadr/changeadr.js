var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var addres='';
Page({
  data:{
    flag:true,
    clear:true,
    ads:"",
    focusd:false
  },
  onLoad:function(e){
    var that=this;
     app.req('post', "store/Ucenter/info", {
      data: { 'token': app.getToken()},
      success: function (data) {
        console.log(data)
        if (data.code == 200) {
          addres=data.data.address;
          that.setData({
            ads:data.data.address
          })
        } else {
          util.toast(data.msg);
        }
      }
    });
  },
  putin:function(e){
    var that=this;
    that.setData({
      clear:false
    })
  },
  puton:function(e){
   addres=e.detail.value;
  },
  inputclear:function(e){
    addres='';
     this.setData({
      ads:" ",
      focusd:true
    })
  },
  save:function(e){
    console.log(addres)
   var hel=emptys(addres,'地址不能为空');
   if(hel){
      this.setData({
        flag:false
      });
   }else{
     return false;
   }
  

  },
  confirm:function(){
    // 确定
    this.setData({
      flag:true
    })
    app.req('post', "/store/Ucenter/editAddress", {
    data: { 'token': app.getToken(), 'new_address': addres},
    success: function (data) {
      if (data.code == 200) {
        // success
         util.toast('已保存');
         setTimeout(function () {
          nation.urlto('../message_main/message_main');
         }, 1000);
      } else {
        util.toast(data.msg);
      }
    }
  });
  },
  cancel:function(){
    // 取消
    this.setData({
      flag:true
    })
  }  
})

// 判空
function emptys(objval,objtips){
  objval=''+objval+'';
     if (objval.length <= 0 || nation.trim(objval) =="") {
      wx.showToast({
        title: objtips,
        icon: 'success',
        duration: 2000
      });
      return false;
    }else{
      return 1;
    }
}
