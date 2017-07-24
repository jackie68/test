$(function(){

  /*属性选择*/
  $('.check-radio').each(function(){
  	var _this = $(this);
      var _this_btn = _this.find('label');
      var return_box = $('.returns'); //获取退货退款类
  	_this_btn.click(function(){
  		$(this).addClass('check-true').siblings().removeClass('check-true');
      return_box.hide(); //当前类显示
      return_box.eq(_this_btn.index($(this))).show(); //当前类显示
  	});
  });
/*下拉框美化*/
  $.each(
    $('.CommonSelect'), function(index, val) { 
     common.Select($(val)); 
   });
  /*上传图片弹弹窗*/
  $('.robin-up').click(function() {
    var hideobj=$('#hidebg');
          hideobj.css('display', 'block');
          hideobj.height($('body').height());
          $('#phot1').css('display', 'block');
});
$('.close-btn').click(function() {
     $('#phot1').css('display', 'none');
     $('#hidebg').css('display', 'none');
     $('.add-popup').css('display', 'none'); //添加地址弹窗关闭
});

/*删除商品弹窗*/
$('.shop-boxed li').each(function() {
      var close_btn = $(this).find('.close-spot');
      close_btn.click(function() {
         var hideobj1=$('#hidebg');
                hideobj1.css('display', 'block');
                hideobj1.height($('body').height());
                $('.shop-prompt').css('display', 'block');
      });
});
$('.prom-close').click(function() {
      $('.shop-prompt').css('display', 'none');
      $('#hidebg').css('display', 'none');
});

/*添加地址弹窗*/
$('.add-bosh-adress').click(function() {
      var hideobj2=$('#hidebg');
                hideobj2.css('display', 'block');
                hideobj2.height($('body').height());
                $('.add-popup').css('display', 'block');
});
/*
    地址选择
*/
$('.address-add li').click(function() {
    $(this).addClass('defult-selt').siblings().removeClass('defult-selt');
});


/*安全设置属性展示*/
$('.robin-public').each(function() {
    var _this = $(this),
         _thisbtn = _this.find('span'),
         span_value = _this.find('span').html(),
         satf_value = _this.find('.ron-saftlbox').html(),
         pupli_code = _this.find('.publichide'),
         cancel_btn = _this.find('.cancel-tbn'),
         unbounded = _this.find('.unbounded'),
         _input = _this.find('input');
  _thisbtn.click(function() {
       pupli_code.slideToggle(600);
       unbounded.css('display', 'none');
  });
  cancel_btn.click(function() {
       pupli_code.slideUp(600);
       unbounded.css('display', 'block');
  });
/*加颜色框*/

 _input.click(function() {
    $(this).parents('.autor-bosh').addClass('inpu_blue');
 });
/*安全设置end*/
});

/*我的优惠券*/ 
var tab_libtn = $('.coupons-list li'),
      tab_div  =$('.robin-uselist');

tab_libtn.click(function() {
    $(this).addClass('use-bg').siblings().removeClass('use-bg');
    tab_div.hide();
    tab_div.eq(tab_libtn.index($(this))).show();
});
/*修改新地址*/
$('.editor-address').each(function() {
      var edit_btn = $(this).find('.edit-btn'),
             editor_show = $(this).find('.editor-show');
       edit_btn.click(function() {
           editor_show.slideToggle(800);
       });     
});

/*注册页面切换*/
var resiget_btn = $('.resige-lits li'),
      resige_div = $('.resige-boshed');
      resiget_btn.click(function() {
          $(this).addClass('ipho-bg').siblings().removeClass('ipho-bg');
          resige_div.hide();
          resige_div.eq(resiget_btn.index($(this))).show();
      });
/*购物车下拉*/
$('.show-list-icon').each(function() {
     var p_btn = $(this).find('p'),
           p_showing = $(this).find('.opend-show');
    var btn_i = 0;
        p_btn.click(function() {
          btn_i ++;
          if (btn_i%2 == 0) {
               $(this).removeClass('opendlike');
          }else{
               $(this).addClass('opendlike');
          }
          p_showing.slideToggle();
        });
});
/*优惠券*/
$('.check-boxd li').click(function() {
    $(this).toggleClass('set-pags');
    return false;
});
/*end*/
/*购物发票信息*/
$('.invot-selte').find('label').click(function() {
      $(this).addClass('inveto-bg').siblings().removeClass('inveto-bg');
});
$('.need-order').click(function() {
     $(this).find('.elect-infmat').addClass('need-order');
});
$('.inv-disp').click(function() {
     $('.elect-infmat').removeClass('need-order');
});
$('.pu_tonbtn').click(function() {
     $(this).next('.fanpiao').addClass('need-order')
});
$('.int-post').click(function() {
     $('.fanpiao').removeClass('need-order')
});
/**/
/*首页轮播*/
var slider = $('#silder-banner'), pic_a = slider.find('a'), pic = slider.find('img'), btn = slider.find('i'),
          t = null, sli_i = 0,
          picS = pic_a.size(), winW = $(window).width();
      t = setInterval(fn,3000);
      function fn(){
        pic_a.eq(sli_i).fadeOut();
        btn.eq(sli_i).removeClass('sli-bg');
        sli_i++;
        if(sli_i >= picS){sli_i = 0;}
        pic_a.eq(sli_i).fadeIn();
        btn.eq(sli_i).addClass('sli-bg');
      }
      slider.hover(function() {
        clearInterval(t);
        btn.click(function() {
          var i = btn.index($(this));
          if(sli_i == i){return;}
          pic_a.eq(sli_i).fadeOut();
          btn.eq(sli_i).removeClass('sli-bg');
          sli_i = i;
          pic_a.eq(sli_i).fadeIn();
          btn.eq(sli_i).addClass('sli-bg');
        });
      }, function() {
        t = setInterval(fn,3000);
      });
  /*
   图片失真处理
  */
var win_w=$(window).width(); 
var img_w=1920; 
$('#silder-banner').find('img').css('left', win_w/2-img_w/2); 
$(window).resize(function() { 
setTimeout(function () { 
var win_w=$(window).width(); 
var img_w=1920; 
$('#silder-banner').find('img').css('left', win_w/2-img_w/2); 
},600); 
});

/*
  支付页面处理
*/

$('.bank-boslist').find('li').click(function() {
     $(this).addClass('ban-ios').siblings().removeClass('ban-ios');
     $('.blosg').slideDown(600);
});

/*商品总数统计*/
$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if(scrollTop + windowHeight == scrollHeight){
        $('.total-menoys').addClass('post-bottom');
    }else{
         $('.total-menoys').removeClass('post-bottom');
    }
});
/*end*/
/*

  ========
    订单列表属性设置
  ========
*/
$('.trasport-boxed').each(function() {
    var leson_height = $(this).find('.leson-padding').height();
    var coun_s = $(this).find('.count-size');
    var data_h = $(this).find('.buttons').height();
    var div_lis = $(this).find('.coun-btns');
    var pan = $(this).find('.buttons')
    coun_s.css('height', leson_height);
    div_lis.css('height', leson_height);
    coun_s.css('line-height', leson_height+'px');
    pan.css('margin-top', (-1)*(data_h/2)+'px');
});


/*===========*/

/*=====购物车商品的计算===*/
$('.add-btn').click(function() {
      var t = $(this).parent().find('input[class*=text_box]');
      t.val(parseInt(t.val())+1);
      tast();

});
$('.redu-btn').click(function(event) {
     var t = $(this).parent().find('input[class*=text_box]');
      t.val(parseInt(t.val())-1);
      if (parseInt(t.val())<=1) {
         t.val(1);
      };
       setTotal();
});

/**/


/*===end====*/
});