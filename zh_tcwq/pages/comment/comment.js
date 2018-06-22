var app = getApp(), screenWidth = 0, screenHeight = 0, screenWidth1 = 0, screenHeight1 = 0, screenWidth2 = 0, screenHeight2 = 0;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dtid: "",
        pid: 0,
        userid: "",
        disabled: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
        console.log(t)
        var that = this;
        that.data.dtid = t.dtid;
        that.data.pid = t.pid;
        that.data.userid = wx.getStorageSync('users').id
    },
    cancel:function(){
        wx.navigateBack({
            delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        });
    },
    //发布
    submitact: function (t) {
        var that = this
        that.setData({
            disabled: true
        })
        if (!t.detail.value.content || t.detail.value.content == '' || t.detail.value.content == null) {
            wx.showModal({
                title: "提示",
                content: "内容为空",
                success: function (e) { },
                fail: function (e) { },
                complete: function (e) { }
            })
        } else if (!that.data.userid) {
            wx.showModal({
                title: "提示",
                content: "用户信息错误",
                success: function (e) { },
                fail: function (e) { },
                complete: function (e) { }
            })
        } else {
            app.util.request({
                url: "entry/wxapp/pinglun",
                data: {
                    userid: that.data.userid,  //评论人
                    content: t.detail.value.content,  //评论内容
                    dongtaiid: that.data.dtid, //动态id
                    parent_pinglun_id: that.data.pid  //父级评论id
                },
                success: function (res) {
                    if (res.data.success) {
                        wx.showToast({
                            title: "发布成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function (e) { },
                            fail: function (e) { },
                            complete: function (e) { }
                        }), setTimeout(function () {
                            wx.navigateBack({
                              delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                            });
                        }, 2e3);
                    }
                }
            })
        }
    },




})