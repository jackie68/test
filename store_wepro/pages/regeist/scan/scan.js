var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
Page({
  data:{
    //String1
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    //String2
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    //String3
     wx.scanCode({
      success: (res) => {
        console.log(res);
        var resd=res.result;
        app.req('post','/store/Ucenter/dispatchCommission',{
          data:{'token':app.getToken(),'goods_qrcode':resd},
          success:function(msg){
           // console.log("4444")
            if(msg.code==200){
              nation.urlto('../../../pages/sales-statistics/sales-details/sales-details');
            }else{
               util.toast(msg.msg);
               return false;
            }
          }
        })
      }
    })
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    //String4
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    //String5
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    //String6
  },
})
// Page({
//   data:{
  
//   },
//   onLoad:function(e){
//     var that=this;

//     console.log("11111");
//     console.log("5555");

//     wx.scanCode({
//       success: (res) => {
//         console.log(res);
//         console.log("2222");

//         var resd=res.result;
//         app.req('post','/store/Ucenter/dispatchCommission',{
//           data:{'token':app.getToken(),'goods_qrcode':resd},
//           success:function(msg){
//             if(msg.code==200){
//               nation.urlto('../../../pages/sales-statistics/sales-details/sales-details');
//             }else{
//                util.toast(msg.msg);
//                return false;
//             }
//           }
//         })
//       }
//     })
//   },
//   camera:function(){
//     wx.scanCode({
//       success: (res) => {
//         console.log(res);
//         console.log("1111");
//       }
//     })
//   }
 
// })