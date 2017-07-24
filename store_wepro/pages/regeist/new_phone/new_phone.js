var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var phonesa='',
    flskd=true,
    noloop=true,
    hash='',
    old_phone='',
    status=false;
    
Page({
  data:{
    clearnum:true,
    clearpwd:true,
    falsk:false,
    getcode:"获取验证码",
    classname:'h_shsy'
  },
  onLoad:function(e){
        hash=e.hash;
        old_phone=e.oldphone;
  },
  // 手机号码清除
  numfocus:function(e){
    console.log(e);
    this.setData({
      clearnum:false
    })
  },
  clearnums:function(e){
     this.setData({
      phonenums:"",
      falsk:true
    })
  },
  inputnums:function(e){
    phonesa=e.detail.value;
  },

  // 获取验证码
  getcode:function(e){
  // Start auth
var isPhone=nation.check(1,''+phonesa+'');
      if(!isPhone){
        util.toast('手机号码不正确');
      }else{
        if(noloop){
          noloop=false;//防止重复触发
          var that=this;  
            var time=60;
            var timer=setInterval(function(){
              time--;
              if(time<0){
                clearInterval(timer);
                that.setData({
                getcode:'重新获取'
              });
              noloop=true;
              }else{
                that.setData({
                  getcode:time+'s'
                })
              }            
            },1000);
              app.req('post', "/store/Index/sendSms", {
                  data: { 'token': app.getToken(), 'phone': phonesa},
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
  // 审核申请
  formSubmit: function (e) {
    //  console.log(e);
    //  console.log('form发生了submit事件，携带数据为：', e.detail.value);
     let  phonenumber = e.detail.value.phonenumber + '',
          mescode = e.detail.value.mescode + '',
          password = e.detail.value.password + '';
        
    var message=[
          {'key':phonenumber,'tips':'手机号不能为空'},
          {'key':mescode,'tips':'验证码不能为空'},
         
    ]
    var arr=[];
        for(var lens=message.length-1,i=lens;i>=0;i--){
          if(emptys(message[i].key,message[i].tips)){
            arr.push(i);
          }
        }
        if(arr.length==message.length){
         //非空
        // 验证其他信息是否合法
        // 判断手机号
        var isPhonenum=nation.check(1,''+phonenumber+'');
        if(!isPhonenum){
          util.toast('手机格式不正确');
          return false;
        }
        // 到这里数据校验已完成
    app.req('post', "/store/Ucenter/editPhoneStep2", {
      data: { 'token': app.getToken(), 'new_phone': phonenumber,'verify_code':mescode,'old_phone':old_phone,'hash':hash},
      success: function (data) {
        if (data.code == 200) {
            util.toast('更换成功');
            setTimeout(function(){
             nation.urlto('../../regeist/message_main/message_main');
            },2500)
        } else {
          util.toast(data.msg);
        }
      }
    });
      }else{
          // 有一个或多个为空
          return false;
        }
  }
})

// 判空
function emptys(objval,objtips,stau){
   objval=''+objval+'';
     if (objval.length <= 0 || nation.trim(objval) =="") {
       if(stau==1){

       }else{
          wx.showToast({
          title: objtips,
          icon: 'success',
          duration: 2000
        });
       }  
     return false;
    }else{
      return 1;
    }
}

function changeStatus(that,arrs){
   var that=that,
       arr=arrs,
       lens=arr.length;
       for(var i=0;i<lens;i++){
         if(!emptys(arr[i],'',1)){
            console.log(1)
         }else{
           console.log(2)
         }
       }
}