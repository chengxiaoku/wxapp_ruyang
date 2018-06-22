var app = getApp();

Page({
    data: {money:0},
    onLoad: function(n) {
        this.Refresh();
    },
    refresh1: function() {
        this.Refresh();
    },
    Refresh: function(n) {
        var i = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = wx.getStorageSync("users").id;
        app.util.request({
          url: "entry/wxapp/GetMoney",
            cachetime: "0",
            data: {
                userid: t
            },
            success: function(n) {
              console.log(n.data.data);
              var a = n.data.data;
              i.setData({ money: a})
            }
        });
    },
    detailed2: function(n) {
        wx.navigateTo({
            url: "detailed?state=2",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    detailed3: function(n) {
        wx.navigateTo({
            url: "detailed?state=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    cash: function(n) {
        wx.navigateTo({
            url: "cash?state=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});