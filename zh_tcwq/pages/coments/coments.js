var app = getApp(), screenWidth = 0, screenHeight = 0, screenWidth1 = 0, screenHeight1 = 0, screenWidth2 = 0, screenHeight2 = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    comment:!1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    var that = this;
    that.data.userid = t.userid
    that.data.dtid = t.dtid
    that.data.plid = t.plid
    that.getpllist()
  },
  getpllist(){
    var that = this;
    app.util.request({
      url: "entry/wxapp/pingluninfo",
      data: {
        dongtaiid: that.data.dtid,   //动态id
        pinglunid: that.data.plid,  //评论id
        userid: that.data.userid, //用户id
      },
      success: function (res) {
        console.log(res)
        if (res.data.success) {

          that.setData({
            pinglunlist: res.data.data,
          })
        }
      }
    })
  },
  onShow: function () {
    this.getpllist()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getpllist()
    wx.stopPullDownRefresh();
  },

  //评论接口
  commentact: function () {
    var that = this;
    if (that.data.complete == null) {
      wx.showToast({
        title: "内容为空",
        icon: "loading",
        duration: 700
      })
    } else {
      app.util.request({
        url: "entry/wxapp/pinglun",
        data: {
          userid: that.data.userid,  //评论人
          content: that.data.complete,  //评论内容
          dongtaiid: that.data.dongtaiid, //动态id
          parent_pinglun_id: that.data.plid  //父级评论id
        },
        success: function (res) {
          if (res.data.success) {
            wx.showToast({
              title: "评论成功"
            })

            var obj = [];
            var arr = [];
            obj = that.data.pinglunlist;
            arr[0] = res.data.data
            for (var i = 0; i < obj['son'].length; i++) {
              arr[i + 1] = obj['son'][i]
            }
            obj['son'] = arr;
            that.setData({
              comment: !1,
              pinglunlist: obj
            })

          }
        }
      })
    }

  },

  //点击评论按钮
  mycomment: function (e) {
    var that = this;
    app.util.request({
      url: "entry/wxapp/GetUserInfo",
      cachetime: "0",
      data: {
        user_id: that.data.userid
      },
      success: function (t) {
        1 == t.data.state ? wx.navigateTo({ 
          url: '../comment/comment?dtid='+ that.data.dtid +"&pid="+e.currentTarget.dataset.plid
        }) : wx.showModal({
          title: "提示",
          content: "您的账号异常，请尽快联系管理员",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确定",
          success: function (t) { },
          fail: function (t) { },
          complete: function (t) { }
        });
      }
    });
  },
  //评论点赞接口
  mycomlike1: function (t) {
    var that = this;
    var obj = [];
    obj = that.data.pinglunlist;
    app.util.request({

      url: "entry/wxapp/pinglundianzan",
      data: {
        userid: that.data.userid,  //点赞人
        pinglunid: obj['parent'].id,  //评论id
      },
      success: function (res) {
        //console.log(res.data.info)
        if (res.data.info == '点赞成功') {
          wx.showToast({
            title: "点赞成功",
            duration: 1e3
          })
          obj['parent'].heart = parseInt(obj['parent'].heart) + 1
          obj['parent'].user_is_dianzan = true

        } else if (res.data.info == '取消点赞') {
          wx.showToast({
            title: "取消点赞",
            duration: 1e3
          })

          obj['parent'].heart = parseInt(obj['parent'].heart) - 1
          obj['parent'].user_is_dianzan = false
        }
        that.setData({
          pinglunlist: obj
        })
      }
    })
  },
  //子集评论点赞接口
  mycomlike: function (t) {
    var that = this;
    var obj = [];
    obj = that.data.pinglunlist;

    app.util.request({

      url: "entry/wxapp/pinglundianzan",
      data: {
        userid: that.data.userid,  //点赞人
        pinglunid: t.currentTarget.dataset.plid,  //评论id
      },
      success: function (res) {
        //console.log(res.data.info)
        if (res.data.info == '点赞成功') {
          wx.showToast({
            title: "点赞成功",
            duration: 1e3
          })
          obj['son'][t.currentTarget.dataset.plindex].heart = parseInt(obj['son'][t.currentTarget.dataset.plindex].heart) + 1
          obj['son'][t.currentTarget.dataset.plindex].user_is_dianzan = true

        } else if (res.data.info == '取消点赞') {
          wx.showToast({
            title: "取消点赞",
            duration: 1e3
          })

          obj['son'][t.currentTarget.dataset.plindex].heart = parseInt(obj['son'][t.currentTarget.dataset.plindex].heart) - 1
          obj['son'][t.currentTarget.dataset.plindex].user_is_dianzan = false
        }
        that.setData({
          pinglunlist: obj
        })
      }
    })
  },
  //评论框输入事件
  complete: function (t) {
    this.setData({
      complete: t.detail.value
    });
  },
  formid_one: function (t) {
    this.setData({
      comment: !1
    });
  },

 
})