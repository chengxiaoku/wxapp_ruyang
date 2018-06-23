var dateTimePicker = require('../../../utils/dateTimePicker.js');
var app = getApp(), _imgArray = [];

function isPoneAvailable(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
function isNumber(val) {

  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val)) {
    return true;
  } else {
    return false;
  }

}
Page({
  data: {
    stick_none: !1,
    checked: !1,
    checked_welfare: !1,
    checked_average: !1,
    checked_password: !1,
    know: !1,
    num: 1,
    disabled: !1,
    money1: 0,


    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    });
  },
  bindPickerChange: function (e) {
    var t = this.data.stock[e.detail.value];
    this.setData({
      index: e.detail.value,
      text: t
    });
  },


  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  onLoad: function (e) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    var lastArray1 = obj.dateTimeArray.pop();
    var lastTime1 = obj.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });



    console.log(e);
    var i = this, t = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/GetUserInfo",
      cachetime: "0",
      data: {
        user_id: t
      },
      success: function (e) {
        2 == e.data.state && wx.showModal({
          title: "提示",
          content: "您的账号异常，请尽快联系管理员",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确定",
          success: function (e) {
            wx.navigateBack({
              delta: 1
            });
          },
          fail: function (e) { },
          complete: function (e) { }
        });
      }
    }), wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: wx.getStorageSync("color"),
      animation: {
        duration: 0,
        timingFunc: "easeIn"
      }
    }), app.util.request({
      url: "entry/wxapp/System",
      cachetime: "0",
      success: function (e) {
        i.setData({
          System: e.data
        });
      }
    });
    var a = e.info, n = e.money, s = e.type_id, o = e.type2_id, c = wx.getStorageSync("System");
    wx.setNavigationBarTitle({
      title: a
    });
    wx.getStorageSync("uniacid");
    console.log(wx.getStorageSync("users")), i.setData({
      type_id: s,
      type2_id: o,
      info: a,
      procedures: Number(c.hb_sxf),
      money: n,
      url: wx.getStorageSync("url2"),
      url1: wx.getStorageSync("url"),
      name: wx.getStorageSync("users").name
    }), wx.getLocation({
      type: "wgs84",
      success: function (e) {
        var t = e.latitude + "," + e.longitude;
        app.util.request({
          url: "entry/wxapp/map",
          cachetime: "0",
          data: {
            op: t
          },
          success: function (e) {
            i.setData({
              address: e.data.result.address,
              coordinates: t
            });
          }
        });
      }
    })
  },
  selected: function (e) {
    var t = e.currentTarget.id, a = this.data.stick;
    this.setData({
      stick_info: a[t].array,
      money1: a[t].money,
      type: a[t].type,
      checked: !1,
      stick_none: !0
    });
  },
  add: function (e) {
    var a = this;
    wx.chooseLocation({
      type: "wgs84",
      success: function (e) {
        e.latitude, e.longitude, e.speed, e.accuracy;
        var t = e.latitude + "," + e.longitude;
        a.setData({
          address: e.address,
          coordinates: t
        });
      }
    });
  },
  label: function (e) {
    var t = this.data.label, a = e.currentTarget.dataset.inde;
    "selected1" == t[a].click_class ? t[a].click_class = "selected2" : "selected2" == t[a].click_class && (t[a].click_class = "selected1"),
      this.setData({
        label: t
      });
  },
  know: function (e) {
    var t = this.data.know;
    1 == t ? this.setData({
      know: !1
    }) : this.setData({
      know: !0
    });
  },
  cancel: function (e) {
    this.setData({
      money1: 0,
      type: 0,
      checked: !1,
      stick_none: !1,
      iszdchecked: !1
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () {
    console.log(this.data), _imgArray.splice(0, _imgArray.length);
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },




  //发布
  submitact: function (t) {
    var that = this;
    if (!t.detail.value.content || t.detail.value.content == '' || t.detail.value.content == null) {
      wx.showModal({
        title: "提示",
        content: "内容为空",
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      })
    } else if (!t.detail.value.tel || t.detail.value.tel == '' || t.detail.value.tel == null) {
      wx.showModal({
        title: "提示",
        content: "手机号为空",
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      })
    } else if (!isPoneAvailable(t.detail.value.tel)) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的手机号",
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      })
    } else if (!that.data.address || that.data.address == '' || that.data.address == null) {
      wx.showModal({
        title: "提示",
        content: "任务地址为空",
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      })
    } else if (!t.detail.value.welfare_money || t.detail.value.tel == '' || t.detail.value.welfare_money == null) {
      wx.showModal({
        title: "提示",
        content: "任务金额为空",
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      })
    } else if (t.detail.value.welfare_money < 1) {
      wx.showToast({
        title: "任务金额最低1元",
        icon: "loading",
        duration: 700
      })
    } else if (t.detail.value.welfare_money > 2000) {
      wx.showToast({
        title: "任务金额最高2000元",
        icon: "loading",
        duration: 700
      })
    } else if (!isNumber(t.detail.value.welfare_money)) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的金额",
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      })
    } else {

      app.util.request({
        url: "entry/wxapp/FabuRenwu",
        cachetime: "0",
        data: {
          details: t.detail.value.content,
          user_name: wx.getStorageSync("users").name,
          user_tel: t.detail.value.tel,
          userid: wx.getStorageSync("users").id,
          img: "",
          user_img2: "",
          address: that.data.address,
          money: t.detail.value.welfare_money,
          type_id: that.data.type_id,
          type2_id: that.data.type2_id,
          end_time: Date.parse(new Date()),
          longitude: that.data.coordinates.split(",")[1],
          latitude: that.data.coordinates.split(",")[0],
        },
        success: function (e) {
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
            wx.switchTab({
              url: "../bounty/bounty",
              success: function (e) { },
              fail: function (e) { },
              complete: function (e) { }
            });
          }, 2e3);
        }
      })
    }

  },



});