var app = getApp();

Page({
    data: {
        release: [ {
            name: "人找车",
            id: 0
        }, {
            name: "车找人",
            id: 1
        }, {
            name: "车找货",
            id: 2
        }, {
            name: "货找车",
            id: 3
        } ],
        foot: !1
    },
    onLoad: function(a) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.refresh();
    },
    refresh: function(a) {
        var n = this;
        t = new Date(), e = t.getMonth() + 1, o = t.getDate(), 1 <= e && e <= 9 && (e = "0" + e), 
        0 <= o && o <= 9 && (o = "0" + o), t.getFullYear(), t.getHours(), t.getMinutes(), 
        t.getSeconds();
        var t, e, o, s = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                userid: s,
                mytype:1,
                page: 1
            },
            success: function(a) {
                n.setData({
                    pc: a.data
                });
            }
        });
    },
    shunfabu: function(a) {
        console.log(a);
        var t = a.currentTarget.id;
        this.setData({
            foot: !1
        }), wx.navigateTo({
            url: "../shun/shunfabu/shunfabu?id=" + t
        });
    },
    footbtn: function(a) {
        var t = this;
        0 == t.data.foot ? t.setData({
            foot: !0
        }) : t.setData({
            foot: !1
        });
    },
    carinfo: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shun/shuninfo2/shuninfo2?id=" + t,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    call_phone: function(a) {
        console.log(a), wx.makePhoneCall({
            phoneNumber: a.currentTarget.dataset.tel
        });
    },
    shouye: function(a) {
        wx.switchTab({
            url: "../index/index",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    yellow: function(a) {
        wx.reLaunch({
            url: "../shun/shun",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    settled: function(a) {
        wx.navigateTo({
            url: "../shun/shunfabu/shunfabu",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});