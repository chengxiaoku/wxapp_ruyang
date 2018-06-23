var qqmapsdk, app = getApp(), Data = require("../../utils/util.js"), QQMapWX = require("../../../utils/qqmap-wx-jssdk.js");

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
    activeIndex: 0,
    index: 0,
    currentTab: 0,
    swiperCurrent: 0,
    indicatorDots: !1,
    autoplay: !0,
    interval: 5e3,
    duration: 1e3,
    circular: !0,
    averdr: !1,
    hotels: !1,
    refresh_top: !1,
    scroll_top: !0,
    index_class: !1,
    seller: [],
    page: 1,
    bkname: "最新动态",


    comment: !1,
    reward: !1,
    complete: null,
    complete1: null,


    star: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }],
    star1: [{
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }],
    star2: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }],
    star3: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }],
    star4: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }],

    dongtailist: [],
    mylist: [],
    userid: wx.getStorageSync('users').id
  },
  updateUserInfo: function (t) {
    "getUserInfo:ok" == t.detail.errMsg && (this.setData({
      hydl: !1
    }), this.reload());
  },
  swiperChange: function (t) {
    this.setData({
      swiperCurrent: t.detail.current
    });
  },
  swiperChange1: function (t) {
    this.setData({
      swiperCurrent1: t.detail.current
    });
  },
  jumps: function (t) {
    var e = this, a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, i = t.currentTarget.dataset.id, o = t.currentTarget.dataset.sjtype;
    var s = t.currentTarget.dataset.type;
    if (1 == s) {
      if ("../distribution/jrhhr" == n) return e.redinfo(), !1;
      if ("../store/store" == n) return wx.switchTab({
        url: "../store/store"
      }), !1;
      if ("../fabu/fabu/fabu" == n) return wx.switchTab({
        url: "../fabu/fabu/fabu"
      }), !1;
      if ("../logs/logs" == n) return wx.switchTab({
        url: "../logs/logs"
      }), !1;
      if ("../type/type" == n) return wx.switchTab({
        url: "../type/type"
      }), !1;
      wx.navigateTo({
        url: n,
        success: function (t) {
          e.setData({
            averdr: !0
          });
        },
        fail: function (t) { },
        complete: function (t) { }
      });
    } else 2 == s ? wx.navigateTo({
      url: "../car/car?vr=" + i + "&sjtype=" + o,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    }) : 3 == s && wx.navigateToMiniProgram({
      appId: a,
      path: "",
      extraData: {
        foo: "bar"
      },
      success: function (t) {
        e.setData({
          averdr: !0
        });
      }
    });
  },
  city_select: function (t) {
    wx.navigateTo({
      url: "city",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  delete: function (t) {
    this.setData({
      averdr: !0
    });
  },
  changeIndicatorDots: function (t) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    });
  },
  changeAutoplay: function (t) {
    this.setData({
      autoplay: !this.data.autoplay
    });
  },
  intervalChange: function (t) {
    this.setData({
      interval: t.detail.value
    });
  },
  durationChange: function (t) {
    this.setData({
      duration: t.detail.value
    });
  },
  settled: function (t) {
    wx.navigateTo({
      url: "../settled/settled"
    });
  },
  onLoad: function (t) {
    //console.log(wx.getStorageSync('users'));
    var e = decodeURIComponent(t.scene);
    if ("undefined" != e) var a = e;
    if (null != t.userid) {

      a = t.userid;
    }
    var n = this;
    wx.getLocation({
      type: "wgs84",
      success: function (t) {
        t.latitude, t.longitude, t.speed, t.accuracy;
      }
    }), wx.getSystemInfo({
      success: function (t) {
        n.setData({
          windowHeight: t.windowHeight
        })
      }
    }), app.util.request({
      url: "entry/wxapp/Url2",

      cachetime: "0",
      success: function (t) {
        console.log(t.data);
        wx.setStorageSync("url2", t.data);
      }
    }), app.util.request({

      url: "entry/wxapp/Url",
      cachetime: "0",
      success: function (t) {
        console.log(t.data);
        wx.setStorageSync("url", t.data), n.setData({
          url: t.data
        });
      }
    }),


      this.getdtlist();

    this.reload();
  },
  reload: function (t) {
    var c = this, i = this.data.fxzuid;
    wx.login({
      success: function (t) {
        var e = t.code;
        wx.setStorageSync("code", e), wx.getSetting({
          success: function (t) {
            t.authSetting["scope.userInfo"] ? wx.getUserInfo({
              success: function (t) {
                wx.setStorageSync("user_info", t.userInfo);
                var a = t.userInfo.nickName, n = t.userInfo.avatarUrl;
                app.util.request({
                  url: "entry/wxapp/openid",
                  cachetime: "0",
                  data: {
                    code: e
                  },
                  success: function (t) {
                    wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                    var e = t.data.openid;
                    app.util.request({
                      url: "entry/wxapp/Login",
                      cachetime: "0",
                      data: {
                        openid: e,
                        img: n,
                        name: a
                      },
                      success: function (t) {
                        c.setData({
                          userinfo: t.data
                        }), wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid),
                          null != i && app.util.request({
                            url: "entry/wxapp/Binding",
                            cachetime: "0",
                            data: {
                              fx_user: t.data.id,
                              user_id: i
                            },
                            success: function (t) {

                            }
                          });
                      }
                    });
                  }
                });
              }
            }) : (c.setData({
              hydl: !0
            }));
          }
        });
      }
    }), wx.getLocation({
      type: "wgs84",
      success: function (t) {
        wx.setStorageSync("Location", t);
        var e = t.latitude + "," + t.longitude;
        app.util.request({
          url: "entry/wxapp/map",
          cachetime: "0",
          data: {
            op: e
          },
          success: function (i) {
            app.util.request({
              url: "entry/wxapp/System",
              cachetime: "0",
              success: function (t) {
                "1" == t.data.dw_more && c.setData({
                  dwcity: i.data.result.address_component.district
                }), "2" == t.data.dw_more && c.setData({
                  dwcity: i.data.result.address_component.city
                });
                var e = t.data.gd_key;
                "" == e && wx.showModal({
                  title: "配置提示",
                  content: "请在后台配置高德地图的key",
                  showCancel: !0,
                  cancelText: "取消",
                  confirmText: "确定",
                  success: function (t) { },
                  fail: function (t) { },
                  complete: function (t) { }
                }), new (require("../amap-wx.js").AMapWX)({
                  key: e
                }).getWeather({
                  success: function (t) {
                    var e, a, n = t.liveData.city, i = t.liveData.weather, o = t.liveData.reporttime.slice(0, 10), s = (0 == (e = new Date(o)).getDay() && (a = "星期日"),
                      1 == e.getDay() && (a = "星期一"), 2 == e.getDay() && (a = "星期二"), 3 == e.getDay() && (a = "星期三"),
                      4 == e.getDay() && (a = "星期四"), 5 == e.getDay() && (a = "星期五"), 6 == e.getDay() && (a = "星期六"),
                      a), r = t.temperature.data;
                    c.setData({
                      area: n,
                      reporttime: o,
                      weather: i,
                      w1: s,
                      temperature: r
                    });
                  },
                  fail: function (t) { }
                });
                var a = ["最新信息"];
                "1" == t.data.is_sjrz && a.push("热门商家"), "1" == t.data.is_pageopen && a.push("黄页114"),
                  "1" == t.data.is_pcfw && a.push("顺风车"), wx.setStorageSync("System", t.data),
                  1 == t.data.many_city ? (wx.setStorageSync("city", t.data.cityname), c.setData({
                    city: t.data.cityname
                  })) : (1 != wx.getStorageSync("city_type") ? (wx.setStorageSync("city", c.data.dwcity),
                    c.setData({
                      city: c.data.dwcity
                    })) : (c.setData({
                      city: wx.getStorageSync("city")
                    })));
                var n = wx.getStorageSync("city");
                app.util.request({
                  url: "entry/wxapp/SaveHotCity",
                  cachetime: "0",
                  data: {
                    cityname: n,
                    user_id: wx.getStorageSync("users").id
                  },
                  success: function (t) {

                  }
                }), wx.setNavigationBarTitle({
                  title: t.data.pt_name
                }), wx.setStorageSync("color", t.data.color), wx.setNavigationBarColor({
                  frontColor: "#ffffff",
                  backgroundColor: wx.getStorageSync("color"),
                  animation: {
                    duration: 0,
                    timingFunc: "easeIn"
                  }
                });
                n = wx.getStorageSync("city");
                c.setData({
                  System: t.data,
                  bkarr: a
                }), c.refresh(), c.seller();
              }
            });
          }
        });
      },
      fail: function (t) {
        wx.getSetting({
          success: function (t) {
            0 == t.authSetting["scope.userLocation"] && wx.openSetting({
              success: function (t) { }
            });
          }
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Views",
      cachetime: "0",
      success: function (t) {

        var e = t.data;
        "" == e ? e = 0 : 1e4 < Number(e) && (e = (Number(e) / 1e4).toFixed(2) + "万"), c.setData({
          views: e
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Num",
      cachetime: "0",
      success: function (t) {
        c.setData({
          Num: t.data
        });
      }
    });
  },
  refresh: function (t) {
    var s = this, e = wx.getStorageSync("city");
    app.util.request({
      url: "entry/wxapp/Storelist",
      cachetime: "0",
      data: {
        cityname: e
      },
      success: function (t) {
        t.data.length <= 5 ? s.setData({
          store: t.data
        }) : s.setData({
          store: t.data.slice(0, 6)
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Ad",
      cachetime: "0",
      data: {
        cityname: e
      },
      success: function (t) {

        var e = [], a = [], n = [], i = [];
        for (var o in t.data) 1 == t.data[o].type && e.push(t.data[o]), 5 == t.data[o].type && a.push(t.data[o]),
          7 == t.data[o].type && n.push(t.data[o]), 10 == t.data[o].type && i.push(t.data[o]);
        s.setData({
          slide: e,
          advert: a,
          ggslide: n,
          zjggbk: i
        });
      }
    }), app.util.request({
      url: "entry/wxapp/news",
      cachetime: "0",
      data: {
        cityname: e
      },
      success: function (t) {
        var e = [];
        for (var a in t.data) 1 == t.data[a].type && e.push(t.data[a]);
        s.setData({
          msgList: e
        });
      }
    }), app.util.request({
      url: "entry/wxapp/GetNav",
      cachetime: "0",
      success: function (t) {

        var e = t.data;
        e.length <= 5 ? s.setData({
          height: 150
        }) : 5 < e.length && s.setData({
          height: 300
        });
        for (var a = [], n = 0, i = e.length; n < i; n += 10) a.push(e.slice(n, n + 10));
        s.setData({
          nav: a,
          navs: e
        });
      }
    });
  },
  sjbk: function () {
    var h = this, t = wx.getStorageSync("city");

    h.data.page;
    var w = [];
    app.util.request({
      url: "entry/wxapp/StoreList",
      cachetime: "0",
      data: {
        page: 1,
        cityname: t
      },
      success: function (t) {
        if (h.setData({
          refresh_top: !0
        }), w = t.data, 0 < t.data.length) {
          for (var e = {}, a = [], n = 0, i = w.length; n < i; n++) e[w[n]] || (a.push(w[n]),
            e[w[n]] = !0);
          for (var o in t.data) {
            t.data[o].star = h.data.star1;
            t.data[o].star;
            t.data[o].score = Number(t.data[o].score);
            t.data[o].score;
            var s = t.data[o].coordinates.split(",");
            t.data[o].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[o].lng2 = Number(wx.getStorageSync("Location").longitude);
            var r = Number(wx.getStorageSync("Location").latitude), c = Number(wx.getStorageSync("Location").longitude), u = s[0], l = s[1], g = r * Math.PI / 180, d = u * Math.PI / 180, p = g - d, f = c * Math.PI / 180 - l * Math.PI / 180, m = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(p / 2), 2) + Math.cos(g) * Math.cos(d) * Math.pow(Math.sin(f / 2), 2)));
            m *= 6378.137;
            m = (m = Math.round(1e4 * m) / 1e4).toFixed(2);
            t.data[o].distance = m;
          }
          h.setData({
            store1: w.sort(function (t, e) {
              return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            })
          });
        } else h.setData({
          store1: w
        });
      }
    });
  },
  seller: function (t) {
    var s = this, e = (s.data.index_class, wx.getStorageSync("city")), r = (wx.getStorageSync("index"),
      s.data.page, []);
    app.util.request({
      url: "entry/wxapp/list2",
      cachetime: "0",
      data: {
        page: s.data.page,
        cityname: e
      },
      success: function (t) {
        if (s.setData({
          refresh_top: !0
        }), r = t.data, 0 < t.data.length) {
          for (var e in t.data) {
            var a = app.ormatDate(t.data[e].tz.sh_time);
            t.data[e].tz.img = t.data[e].tz.img.split(","), t.data[e].tz.details = t.data[e].tz.details.replace("↵", " "),
              4 < t.data[e].tz.img.length && (t.data[e].tz.img_length = Number(t.data[e].tz.img.length) - 4),
              4 <= t.data[e].tz.img.length ? t.data[e].tz.img1 = t.data[e].tz.img.slice(0, 4) : t.data[e].tz.img1 = t.data[e].tz.img,
              t.data[e].tz.time = a.slice(0, 16);
          }
          for (var n in r) {
            for (var i in r[n].label) r[n].label[i].number = (void 0, o = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")",
              o);
            s.setData({
              seller: r
            });
          }
        } else s.setData({
          seller: r
        });
        var o;
      }
    });
  },
  hybk: function () {
    var d = this, t = (d.data.index_class, wx.getStorageSync("city")), p = (wx.getStorageSync("index"),
      d.data.page, []);
    app.util.request({
      url: "entry/wxapp/YellowPageList",
      cachetime: "0",
      data: {
        page: 1,
        cityname: t
      },
      success: function (t) {
        if (d.setData({
          refresh_top: !0
        }), p = t.data, 0 < t.data.length) {
          for (var e in p) {
            var a = p[e].coordinates.split(",");
            p[e].lat2 = Number(wx.getStorageSync("Location").latitude), p[e].lng2 = Number(wx.getStorageSync("Location").longitude);
            var n = Number(wx.getStorageSync("Location").latitude), i = Number(wx.getStorageSync("Location").longitude), o = a[0], s = a[1], r = n * Math.PI / 180, c = o * Math.PI / 180, u = r - c, l = i * Math.PI / 180 - s * Math.PI / 180, g = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(u / 2), 2) + Math.cos(r) * Math.cos(c) * Math.pow(Math.sin(l / 2), 2)));
            g *= 6378.137;
            g = (g = Math.round(1e4 * g) / 1e4).toFixed(2);
            p[e].distance = g;
          }
          d.setData({
            yellow_list: p.sort(function (t, e) {
              return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            })
          });
        } else d.setData({
          yellow_list: p
        });
      }
    });
  },
  sfcbk: function () {
    var a = this, t = (a.data.index_class, wx.getStorageSync("city")), n = (wx.getStorageSync("index"),
      a.data.page, []);
    app.util.request({
      url: "entry/wxapp/CarList",
      cachetime: "0",
      data: {
        page: 1,
        cityname: t
      },
      success: function (t) {
        if (a.setData({
          refresh_top: !0
        }), n = t.data, 0 < t.data.length) {
          for (var e in t.data) t.data[e].tz.time = app.ormatDate(t.data[e].tz.time).slice(5, 16),
            t.data[e].tz.start_time1 = t.data[e].tz.start_time.slice(5, 10), t.data[e].tz.start_time2 = t.data[e].tz.start_time.slice(10, 17),
            2 == t.data[e].tz.is_open ? (t.data[e].tz.class2 = "car3", t.data[e].tz.class3 = "car4",
              t.data[e].tz.class4 = "car5") : (t.data[e].tz.class2 = "", t.data[e].tz.class3 = "",
                t.data[e].tz.class4 = ""), "人找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1",
                  t.data[e].tz.class1 = "car1") : "车找人" == t.data[e].tz.typename ? (t.data[e].tz.class = "color2",
                    t.data[e].tz.class1 = "car2") : "货找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1",
                      t.data[e].tz.class1 = "car1") : "车找货" == t.data[e].tz.typename && (t.data[e].tz.class = "color2",
                        t.data[e].tz.class1 = "car2");
          a.setData({
            pc: n
          });
        } else a.setData({
          pc: n
        });
      }
    });
  },
  bkswiperChange: function (t) {
    var e = this;
    e.setData({
      refresh_top: !1,
      activeIndex: t.detail.current
    });
    var a = e.data.bkarr[t.detail.current];
    "最新信息" == a && e.seller(), "热门商家" == a && e.sjbk(), "黄页114" == a && e.hybk(),
      "顺风车" == a && e.sfcbk();
  },
  commend: function (t) {
    var e = this, a = t.currentTarget.id;
    var n = t.currentTarget.id, i = t.currentTarget.dataset.name;
    wx.setStorageSync("index", n), e.setData({
      index_class: !0,
      activeIndex: a,
      bkname: i,
      refresh_top: !1,
      swipecurrent: t.currentTarget.id
    }), "最新信息" == i && e.seller(), "热门商家" == i && e.sjbk(), "黄页114" == i && e.hybk(),
      "顺风车" == i && e.sfcbk();
      e.getdtlist();
  },
  whole: function (t) {
    wx.removeStorage({
      key: "index",
      success: function (t) { }
    }), this.setData({
      page: 1,
      seller: [],
      index_class: !1
    }), this.seller();
  },
  bindinput: function (t) {
    var e = t.detail.value;
    "" != e && app.util.request({
      url: "entry/wxapp/list2",
      cachetime: "0",
      data: {
        keywords: e
      },
      success: function (t) {
        0 == t.data.length ? wx.showModal({
          title: "提示",
          content: "没有这个帖子",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确定",
          success: function (t) { },
          fail: function (t) { },
          complete: function (t) { }
        }) : wx.navigateTo({
          url: "../infodetial/infodetial?id=" + t.data[0].tz.id,
          success: function (t) { },
          fail: function (t) { },
          complete: function (t) { }
        });
      }
    });
  },
  ormatDate: function (t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);
    function a(t, e) {
      for (var a = "" + t, n = a.length, i = "", o = e; o-- > n;) i += "0";
      return i + a;
    }
  },
  thumbs_up: function (t) {
    var a = this, n = a.data.seller, i = t.currentTarget.dataset.id, o = wx.getStorageSync("users").id, e = (Number(t.currentTarget.dataset.num),
      function (e) {
        n[e].tz.id == i && (n[e].thumbs_up = !0, app.util.request({
          url: "entry/wxapp/Like",
          cachetime: "0",
          data: {
            information_id: i,
            user_id: o
          },
          success: function (t) {
            1 != t.data ? wx.showModal({
              title: "提示",
              content: "不能重复点赞",
              showCancel: !0,
              cancelText: "取消",
              confirmText: "确认",
              success: function (t) { },
              fail: function (t) { },
              complete: function (t) { }
            }) : (n[e].tz.givelike = Number(n[e].tz.givelike) + 1, a.setData({
              seller: n
            }));
          }
        }));
      });
    for (var s in n) e(s);
  },
  previewImage: function (t) {
    console.log(t.currentTarget.dataset.id)
    var e = t.currentTarget.dataset.id, a = this.data.url, n = [], i = t.currentTarget.dataset.inde, o = this.data.dongtailist;
    for (var s in o) if (o[s].id == e) {
      var r = o[s].image_list;
      for (var c in r) n.push(a + r[c]);
      wx.previewImage({
        current: a + r[i],
        urls: n
      });
    }
  },
  red: function (t) {
    wx.navigateTo({
      url: "../redbag/redbag",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  redinfo: function (t) {
    var e = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/MyDistribution",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (t) {
        "2" == t.data.state ? (wx.navigateTo({
          url: "../distribution/yaoqing"
        })) : "1" == t.data.state ? wx.showModal({
          title: "提示",
          content: "您的申请正在审核中，请耐心等待"
        }) : wx.navigateTo({
          url: "../distribution/jrhhr"
        });
      }
    });
  },
  yellow_page: function (t) {
    wx.reLaunch({
      url: "../yellow_page/yellow"
    });
  },
  post1: function (t) {
    wx.navigateTo({
      url: "../fabu/fabu/fabu"
    });
  },
  store_info: function (t) {
    var e = t.currentTarget.id;
    wx.navigateTo({
      url: "../sellerinfo/sellerinfo?id=" + e,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  notice: function (t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../notice/notice?id=" + e,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  post: function (t) {
    wx, wx.reLaunch({
      url: "../shun/shun",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  phone: function (t) {
    var e = t.currentTarget.dataset.id;
    wx.makePhoneCall({
      phoneNumber: e
    });
  },
  more: function (t) {
    wx.switchTab({
      url: "../store/store",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  jump: function (t) {
    var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
    wx.navigateTo({
      url: "../marry/marry?id=" + e + "&name=" + a,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  carinfo: function (t) {

    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../shun/shuninfo2/shuninfo2?id=" + e,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  yellow_info: function (t) {
    var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.user_id;
    wx.navigateTo({
      url: "../yellow_page/yellowinfo?id=" + e,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  store: function (t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../sellerinfo/sellerinfo?id=" + e,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  see: function (t) {
    this.data.seller;
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../dongtaidt/dongtaidt?id=" + e,
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  formid_one: function (t) {
    app.util.request({
      url: "entry/wxapp/SaveFormid",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("users").id,
        form_id: t.detail.formId,
        openid: wx.getStorageSync("openid")
      },
      success: function (t) { }
    });
  },
  hddb: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },
  onReady: function () {
    this.setData({
      first: 1
    }), wx.removeStorageSync("city_type");
  },
  onShow: function () { this.getdtlist(); },
  onHide: function () { },
  onUnload: function () {
    wx.removeStorageSync("city_type");
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      seller: [],
      activeIndex: 0,
      swipecurrent: 0,
      refresh_top: !1
    }), this.reload(), this.getdtlist(), wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    //console.log("上拉触底");
  },
  onShareAppMessage: function () { },








  //评论框输入事件
  complete: function (t) {
    this.setData({
      complete: t.detail.value
    });
  },
  complete1: function (t) {
    this.setData({
      complete1: t.detail.value
    });
  },
  //获取动态接口
  getdtlist: function () {
    var that = this
    app.util.request({

      url: "entry/wxapp/dongtai_list",
      data: {
        userid: wx.getStorageSync('users').id,
        pageindex: 1,
        pagesize: 20,
        num: 5,
        pinglun_num: 5,
        type: false
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data) {
          that.setData({
            dongtailist: res.data.data
          })
        }
      }
    })

    app.util.request({

      url: "entry/wxapp/dongtai_list",
      data: {
        userid: wx.getStorageSync('users').id,
        pageindex: 1,
        pagesize: 20,
        num: 5,
        pinglun_num: 5,
        type: true
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data) {
          that.setData({
            mydongtailist: res.data.data
          })
        }
      }
    })
  },
  //动态关注接口
  follow: function (t) {
    var that = this;
    app.util.request({

      url: "entry/wxapp/guanzhu",
      data: {
        userid1: wx.getStorageSync('users').id,  //关注人
        userid2: t.currentTarget.dataset.id  //被关注人
      },
      success: function (res) {
        console.log(res)
        if (res.data.success) {
          wx.showToast({
            title: "关注成功",
            mask: !0,
            success: function (e) {

              var obj = []
              if (that.data.activeIndex == 0) {
                obj = that.data.dongtailist;
                obj[t.currentTarget.dataset.index].is_guanzhu = true
                for (var i = 0; i < obj.length; i++) {
                  if (obj[t.currentTarget.dataset.index].userid == obj[i].userid) {
                    obj[i].is_guanzhu = true
                  }
                }
                that.setData({
                  dongtailist: obj
                })
              } else {
                obj = that.data.mydongtailist;
                obj[t.currentTarget.dataset.index].is_guanzhu = true
                for (var i = 0; i < obj.length; i++) {
                  if (obj[t.currentTarget.dataset.index].userid == obj[i].userid) {
                    obj[i].is_guanzhu = true
                  }
                }
                that.setData({
                  mydongtailist: obj
                })
              }


            },
            fail: function (t) { },
            complete: function (t) { }
          })

        }
      }
    })
  },
  //动态点赞接口
  mylike: function (t) {
    var that = this;
    app.util.request({
      url: "entry/wxapp/dongtai_dianzan",
      data: {
        userid: wx.getStorageSync('users').id,   //点赞人
        dongtaiid: t.currentTarget.dataset.id,  //动态id
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.success) {
          var obj = [];
          if (that.data.activeIndex == 0) {
            obj = that.data.dongtailist;
          } else {
            obj = that.data.mydongtailist;
          }
          
          if (res.data.data.type == 'add') {
            wx.showToast({
              title: "点赞成功"
            })
            obj[t.currentTarget.dataset.index].user_is_dianzan = true
          } else {
            wx.showToast({
              title: "取消点赞"
            })
            obj[t.currentTarget.dataset.index].user_is_dianzan = false
          }
          obj[t.currentTarget.dataset.index].dianzan_sum = res.data.data.dianzan_num
          if (that.data.activeIndex == 0) {
            that.setData({
              dongtailist: obj
            })
          } else {
            that.setData({
              mydongtailist: obj
            })
          }
          
        }
      }
    })
  },
  //动态打赏接口
  rewardact: function () {
    var that = this;
    if (that.data.complete1 == null || that.data.complete1 == '') {
      wx.showToast({
        title: "内容为空",
        icon: "loading",
        duration: 700
      })
    } else if (!isNumber(that.data.complete1)) {
      wx.showToast({
        title: "格式错误",
        icon: "loading",
        duration: 700
      })
    } else if (that.data.complete1 < 0.01) {
      wx.showToast({
        title: "最低打赏0.01元",
        icon: "loading",
        duration: 700
      })
    } else if (that.data.complete1 > 200) {
      wx.showToast({
        title: "最高打赏200元",
        icon: "loading",
        duration: 700
      })
    } else {
      app.util.request({

        url: "entry/wxapp/dashang",
        data: {
          userid: wx.getStorageSync('users').id,  //打赏人
          dongtaiid: that.data.dtid,  //动态id
          money: that.data.complete1, //打赏金额
          dongtai_userid: that.data.dturid  //被打赏人
        },
        success: function (res) {
          //console.log(res)
          if (res.data.success) {
            wx.showToast({
              title: "打赏成功"
            })
            that.setData({
              reward: !1,
            });
            var obj = [];
            
            var arr = { 'dashanglist': [] };
            if (that.data.activeIndex == 0) {
              obj = that.data.dongtailist;
            } else {
              obj = that.data.mydongtailist;
            }
            
            var add = { 'name': wx.getStorageSync('users').name, 'dashang_money': parseFloat(that.data.complete1).toFixed(2) }
            arr.dashanglist[0] = add;
            for (var i = 0; i < obj[that.data.dtindex].dashanglist.length; i++) {
              arr.dashanglist[i + 1] = obj[that.data.dtindex].dashanglist[i]
            }
            obj[that.data.dtindex].dashanglist = arr.dashanglist;
            if (that.data.activeIndex == 0) {
              that.setData({
                dongtailist: obj
              })
            } else {
              that.setData({
                mydongtailist: obj
              })
            }
            
          } else {
            wx.showToast({
              title: res.data.info
            })
          }
        }
      })
    }

  },
  //动态评论接口
  commentact: function () {
    var that = this;
    //console.log(that.data.dtid)
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
          userid: wx.getStorageSync('users').id,  //评论人
          content: that.data.complete,  //评论内容
          dongtaiid: that.data.dtid, //动态id
          parent_pinglun_id: 0  //父级评论id
        },
        success: function (res) {
          if (res.data.success) {
            wx.showToast({
              title: "评论成功"
            })
            
            var obj = [];
            var arr = { 'pinglunlist': [] };
            if (that.data.activeIndex == 0) {
              obj = that.data.dongtailist;
            } else {
              obj = that.data.mydongtailist;
            }
            
            var add = res.data.data
            arr.pinglunlist[0] = add;
            for (var i = 0; i < obj[that.data.dtindex].pinglunlist.length; i++) {
              arr.pinglunlist[i + 1] = obj[that.data.dtindex].pinglunlist[i]
            }
            obj[that.data.dtindex].pinglunlist = arr.pinglunlist;
            if (that.data.activeIndex == 0) {
              that.setData({
                dongtailist: obj
              })
              that.setData({
                comment: !1,
                dongtailist: obj
              })
            } else {
              that.setData({
                mydongtailist: obj
              })
              that.setData({
                comment: !1,
                mydongtailist: obj
              })
            }
            
          }
        }
      })
    }

  },
  //动态取消关注接口
  unfollow: function (t) {
    var that = this;
    app.util.request({

      url: "entry/wxapp/qx_guanzhu",
      data: {
        userid1: wx.getStorageSync('users').id,  //取消关注人
        userid2: t.currentTarget.dataset.id,   //被取消关注人
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.success) {
          wx.showToast({
            title: "取消关注",
            success: function (e) {

              var obj = [];
              if (that.data.activeIndex == 0) {
                obj = that.data.dongtailist;
              } else {
                obj = that.data.mydongtailist;
              }
              

              obj[t.currentTarget.dataset.index].is_guanzhu = false
              for (var i = 0; i < obj.length; i++) {
                if (obj[t.currentTarget.dataset.index].userid == obj[i].userid) {
                  obj[i].is_guanzhu = false
                }
              }
              if (that.data.activeIndex == 0) {
                that.setData({
                  dongtailist: obj
                })
              } else {
                that.setData({
                  mydongtailist: obj
                })
              }
              


            },
            fail: function (t) { },
            complete: function (t) { }
          })


        }
      }
    })
  },
  //评论点赞接口
  mycomlike: function (t) {
    var that = this;
    var obj = [];
    if (that.data.activeIndex == 0) {
      obj = that.data.dongtailist;
    } else {
      obj = that.data.mydongtailist;
    }
    

    app.util.request({

      url: "entry/wxapp/pinglundianzan",
      data: {
        userid: wx.getStorageSync('users').id,  //点赞人
        pinglunid: t.currentTarget.dataset.id,  //评论id
      },
      success: function (res) {
        //console.log(res.data.info)
        if (res.data.info == '点赞成功') {
          wx.showToast({
            title: "点赞成功",
            duration: 1e3
          })
          
          obj[t.currentTarget.dataset.index].pinglunlist[t.currentTarget.dataset.plindex].heart = parseInt(obj[t.currentTarget.dataset.index].pinglunlist[t.currentTarget.dataset.plindex].heart) + 1
          obj[t.currentTarget.dataset.index].pinglunlist[t.currentTarget.dataset.plindex].user_is_dianzan = true

        } else if (res.data.info == '取消点赞') {
          wx.showToast({
            title: "取消点赞",
            duration: 1e3
          })
          if (that.data.activeIndex == 0) {
            console.log("最新动态");
          } else {
            console.log("我的关注");
          }
          obj[t.currentTarget.dataset.index].pinglunlist[t.currentTarget.dataset.plindex].heart = parseInt(obj[t.currentTarget.dataset.index].pinglunlist[t.currentTarget.dataset.plindex].heart) - 1
          obj[t.currentTarget.dataset.index].pinglunlist[t.currentTarget.dataset.plindex].user_is_dianzan = false
        }
        if (that.data.activeIndex == 0) {
          that.setData({
            dongtailist: obj
          })
        } else {
          that.setData({
            mydongtailist: obj
          })
        }
        
      }
    })
  },

  //评论取消按钮
  formid_one: function (t) {
    this.setData({
      comment: !1,
      reward: !1
    });
  },
  //点击评论按钮
  mycomment: function (e) {
    wx.navigateTo({
      url: '../comment/comment?dtid=' + e.currentTarget.dataset.id + "&pid=0"
    });
    // this.setData({
    //   comment: !0,
    //   dtid: e.currentTarget.dataset.id,
    //   dtindex: e.currentTarget.dataset.index
    // });
  },
  //点击打赏按钮
  myreward: function (e) {
    if (e.currentTarget.dataset.userid == wx.getStorageSync('users').id) {
      wx.showToast({
        title: "不能打赏自己",
        duration: 1e3,
        icon: "loading"
      })
    } else {
      this.setData({
        reward: !0,
        dturid: e.currentTarget.dataset.userid,
        dtid: e.currentTarget.dataset.id,
        dtindex: e.currentTarget.dataset.index
      });
    }
  },
  // 点击播放，其它视频结束

  bindplay: function (e) {

    var id = e.currentTarget.id         //点击id
    console.log(e.currentTarget)
    console.log(this.data.playIndex)      //正在播放的id

    if (!this.data.playIndex) { // 没有播放时播放视频

      this.setData({

        playIndex: id

      })

      //console.log(this.data.playIndex)

      var videoContext = wx.createVideoContext(id)

      videoContext.play()

    } else {                    // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.playIndex)

      // videoContextPrev.seek(0)

      if (this.data.playIndex != id) {                  //不知道为什么，不加这个判断的时候这个视频会一直在播放和暂停之间切换
        videoContextPrev.pause()

      }

      this.setData({

        playIndex: id

      })

      var videoContextCurrent = wx.createVideoContext(this.data.playIndex)

      videoContextCurrent.play()

    }

  },

















});