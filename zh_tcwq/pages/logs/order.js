var app = getApp();

Page({
    data: {
        luntext: [ "进行中", "待付款", "已完成", "纠纷/维权" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft2: 35,
        mydata:[]
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("url");
        null == t.activeIndex ? e.setData({
            activeIndex: 0,
            url: a
        }) : e.setData({
            activeIndex: t.activeIndex,
            url: a
        }), e.refresh();
    },
    phone:function (t){
      var e = t.currentTarget.dataset.id;
      wx.makePhoneCall({
        phoneNumber: e
      });
     },
    refresh: function(t) {
        var c = this;
        var e, a, r, i = (e = new Date(), a = e.getMonth() + 1, r = e.getDate(), 1 <= a && a <= 9 && (a = "0" + a), 
        0 <= r && r <= 9 && (r = "0" + r), e.getFullYear() + "-" + a + "-" + r + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()).slice(0, 10);
        function d(t, e) {
            var a = new Date(t), r = new Date(a.getFullYear(), a.getMonth(), a.getDate() + e);
            a.getFullYear(), a.getMonth(), a.getDate();
            return r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate();
        }
        var u = c.data.activeIndex, o = wx.getStorageSync("users").id;
        app.util.request({
          url: "entry/wxapp/getmytyperenwu",
            cachetime: "0",
            data: {
                userid: o, //o
                mytype:1, //1
            },
            success: function(t) {
        
                //获取后台返回的数据
                c.setData({
                  mydata: t.data.data,
                })
            }
        });
    },
    tabClick: function(t) {
        var c = this, i = t.currentTarget.id, e = wx.getStorageSync("users").id;
       
        app.util.request({
          url: "entry/wxapp/getmytyperenwu",
            cachetime: "0",
            data: {
                userid: e,
                mytype: parseInt(i)+1,
            },
            success: function(t) {
              //获取后台返回的数据
              c.setData({
                mydata: t.data.data,
              })
            }
        }), c.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    complete: function(t) {
        var e = this;
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/CompleteOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), e.refresh();
            }
        });
    },
    toorder: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/TuOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), e.refresh();
            }
        });
    },
    delorder: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/DelOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: "是否删除订单，删除后不可恢复",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {
                        t.confirm && e.refresh();
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    pay: function(t) {
        var e = this, a = wx.getStorageSync("openid"), r = t.currentTarget.dataset.id, o = t.currentTarget.dataset.storeid;
        console.log(o);
        var n = t.currentTarget.dataset.money;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: a,
                money: n,
                order_id: r
            },
            success: function(t) {
                console.log(t), wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        console.log("这里是支付成功"), console.log(t), app.util.request({
                            url: "entry/wxapp/PayOrder",
                            cachetime: "0",
                            data: {
                                order_id: r
                            },
                            success: function(t) {
                                console.log("改变订单状态"), console.log(t), e.refresh();
                            }
                        }), app.util.request({
                            url: "entry/wxapp/sms2",
                            cachetime: "0",
                            data: {
                                store_id: o
                            },
                            success: function(t) {
                                console.log(t);
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "支付失败",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    order_info: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.store_id;
        wx.navigateTo({
            url: "order_info?id=" + e + "&store_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});