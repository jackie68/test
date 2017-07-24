var app = getApp(), that;
var util = require('../../../utils/util.js');
var nation = require('../../../utils/nation.js');
var tem = [], paginate = 10, page = 1, goodid, numsd, g_id;
var selIdArr = [];
var selNumArr = [];
Page({
  data: {
    lists: tem,
    flag: true
  },
  onLoad: function (e) {
    console.log('e=', e);

    console.log("goodId:"+e.goodid);
    console.log("numsd:"+e.numsd);
    if (e.goodid && e.numsd) {
      goodid = parseInt(e.goodid);
      numsd = parseInt(e.numsd);
      addSelect(goodid, numsd);

    }

    var that = this;
    loadData(that);
  },
  
  toadd: function () {
    //console.log("11111");
    //nation.urlto('../gooddetaillist/gooddetaillist')
    wx.navigateTo({
      url: '../gooddetaillist/gooddetaillist',
    })
  },
  del: function (e) {
    that = this;
    g_id = e.currentTarget.dataset.id;
    console.log("g_id:"+g_id);
    that.setData({
      flag: false
    })
  },
  cancel: function () {
    that = this;
    that.setData({
      flag: true
    })
  },
  confirm: function () {
    that = this;
    delSelect(g_id);
    loadData(that);
    that.setData({
      flag: true
    })
  },
  submitc: function (e) {
    that = this;
    var lastd = selCommit();
    sub(that);
  },
  

})

function addSelect(id, num) {

  var index = selIdArr.indexOf(id);
  if (index == -1) {
    selIdArr.push(id);
    selNumArr.push(num);
  } else {
    selNumArr[index] += num;
  }
}

function delSelect(id) {
  var id = parseInt(id);
   //console.log("删除商品:"+id);
  var index = selIdArr.indexOf(id);
 
  if (index != -1) {
    selIdArr.splice(index, 1);
    selNumArr.splice(index, 1);
  }

  //console.log("所有商品"+selIdArr);

}

function selCommit() {
  var commitArr = [];
  for (var i in selIdArr) {
    commitArr.push(selIdArr[i] + '-' + selNumArr[i]);
  }
  //console.log("添加商品："+commitArr);
  return commitArr;
}

function loadData(that) {
  var id_num = selCommit();
  if (id_num.length < 0) {
    return;
  }

  app.req('post', 'store/PreOutOrder/previewOrder', {
    data: {
      'token': app.getToken(),
      'page': page,
      'paginate': paginate,
      'id_num': id_num.join(',')
    },
    success: function (res) {
      tem = res.data;
      //console.log("有数据内容："+tem);
      that.setData({
        lists: tem
      })
      //console.log("添加成功:"+tem);
    }
  })
}

function sub(that) {

  var id_num = selCommit();
  if (id_num.length == 0) {
    util.toast('没订单信息');
    return;
  }

  app.req('post', 'store/PreOutOrder/createPreOrder', {
    data: {
      'token': app.getToken(),
      'id_num': id_num.join(',')
    },
    success: function (res) {
      selIdArr.splice(0,selIdArr.length);
      selNumArr.splice(0,selNumArr.length);
      if (res.code == 200) {
        util.toast('提交成功');
        setTimeout(function () {
          nation.urlto('../success/success');
        }, 1000);

      } else {
        util.toast(res.msg);
        setTimeout(function () {
          nation.urlto('../fail/fail');
        }, 2000)
        return false;
      }
    }
  })

}