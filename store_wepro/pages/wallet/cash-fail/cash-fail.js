var nation = require('../../../utils/nation.js');
Page({
    data:{

    },
    backindex:function(){
        nation.urlto('../../../pages/main/main')
    },
    againtx:function(){
        nation.urlto('../../../pages/wallet/cash-withdrawal/cash-withdrawal')
    }
})