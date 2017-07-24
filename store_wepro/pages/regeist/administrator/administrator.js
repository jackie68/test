Page({

    data: {

    },

    binShopowner: function (event) {

        wx.navigateTo({
            url: '../../../pages/regeist/regist-store/regist-store',
        })

    },
    binClerk: function (event) {
        wx.navigateTo({
            url: '../../../pages/regeist/regist-clerk/regist-clerk',
        })
    }

})