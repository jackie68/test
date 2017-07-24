var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var phonesa='',
    flskd=true,
    noloop=true; 
Page({
  data:{
    clearnum:true,
    clearpwd:true,
    phonenums:'',
    phonepwd:'',
    falsk:false,
    pwdsk:false,
    showpwd:"显示",
    typekind:"password",
   
  },
 
  inputnums:function(e){
    phonesa=e.detail.value;
  },
  //显示密码
  showpwd:function(){
    flskd=!flskd;
    if(flskd){
      this.setData({
         showpwd:"显示",
          typekind:"password",
          pwdsk:"true"
      })
    }else{
       this.setData({
         showpwd:"隐藏",
         typekind:"text",
         pwdsk:"true"
      })
    }
     
  },

  // 审核申请
  formSubmit: function (e) {
    //  console.log(e);
    //  console.log('form发生了submit事件，携带数据为：', e.detail.value);
     let  phonenumber = e.detail.value.phonenumber + '',
          password = e.detail.value.password + '';
        
    var message=[
          {'key':phonenumber,'tips':'原密码不能为空'},
          {'key':password,'tips':'新密码不能为空'},
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
        var isPhonenum=nation.check(2,''+phonenumber+'');
        if(!isPhonenum){
          util.toast('原密码格式不正确');
          return false;
        }
        // 判断密码格式
        var ispassword=nation.check(2,''+password+'');
        if(!ispassword){
          util.toast('新密码格式不正确');
           return false;
        }
      
    // 到这里数据校验已完成  
   // util.toast('','loading');
    app.req('post', "/store/Ucenter/editPass", {
      data: { 'token': app.getToken(), 'old_pass': phonenumber, 'new_pass': password },
      success: function (data) {
        wx.hideToast();
        if (data.code == 200) {
            util.toast('修改成功');
             setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },3000);
        } else {
         // console.log('1111');
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

