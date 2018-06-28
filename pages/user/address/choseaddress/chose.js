// pages/user/address/choseaddress/chose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: '',
    provinces: [],//存储省份的数据
    citys: [],//存储城市
    districts: [],//存储区县的数据
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0,
    provinceid: '',//存储获取到省份的id
    citysid: '',//存储获取到的城市的id
    streetid: '',//存储获取到的街市id
    savepid: '',
    savecid: '',
    savesid: '',
    readyid: '',//上一级页面传过来的地址ID
    url: '',
    showtitle: '',
    addressisdeafutl: ''
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == '') {
      wx.showModal({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showModal({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showModal({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.selProvince == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择省份',
        showCancel: false
      })
      return
    }
    if (this.data.selCity == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择区域',
        showCancel: false
      })
      return
    }
    if (this.data.selProvince == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (this.data.selDistrict == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择县辖区',
        showCancel: false
      })
      return
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    if (code == "") {
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel: false
      })
      return
    }
    wx.request({
      url: that.data.url,
      data: {
        token: getApp().globalData.token,
        provinceId: that.data.savepid,
        cityId: that.data.savecid,
        districtId: that.data.savesid,
        linkMan: linkMan,
        address: address,
        mobile: mobile,
        code: code,
        isDefault: that.data.addressisdeafutl,
        id: that.data.readyid
      },
      success: function (sucs) {
        wx.showToast({
          title: that.data.showtitle,
        })
        wx.navigateBack({

        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = getApp().globalData.token;
    var that = this;
    if (options.id == undefined) {
      that.setData({
        addressData: '',
        selProvince: "请选择",
        selCity: "请选择",
        selDistrict: "请选择",
        url: "https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/add",
        showtitle: "地址添加成功"
      })
    }
    else {
      wx.request({
        url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/detail',
        data: { token: token, id: options.id },
        success: function (readata) {
          that.setData({
            addressData: readata.data.data,
            selProvince: readata.data.data.provinceStr,
            selCity: readata.data.data.cityStr,
            selDistrict: readata.data.data.areaStr,
            readyid: options.id, url: "https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/update",
            showtitle: "地址修改成功",
            addressisdeafutl: readata.data.data.isDefault
          })
        }
      })
    }
    wx.request({
      url: 'https://api.it120.cc/common/region/province',
      success: function (res) {
        var picdata = res.data.data;
        var pickor = [];
        var pikid = []
        for (var i = 0; i < picdata.length; i++) {
          pickor.push(picdata[i].name);
          pikid.push(picdata[i].id)
        }
        that.setData({
          provinces: pickor,
          provinceid: pikid,
        })
      }
    })
  },
  bindPickerProvinceChange: function (e) {
    var that = this
    var pid = that.data.provinceid[e.detail.value]
    that.setData({
      index: e.detail.value,
      selProvince: '',
      savepid: pid
    })
    wx.request({
      url: 'https://api.it120.cc/common/region/child?pid=' + pid,
      success: function (rescity) {
        var picity = rescity.data.data;
        var dcity = [];
        var cikid = []
        for (var i = 0; i < picity.length; i++) {
          dcity.push(picity[i].name);
          cikid.push(picity[i].id)
        }
        that.setData({
          citys: dcity,
          citysid: cikid,
          selCity: "请选择",
          selDistrict: "请选择"
        })
      }
    })
  },
  bindPickerCityChange: function (e) {
    var that = this;
    var cid = that.data.citysid[e.detail.value]
    that.setData({
      index2: e.detail.value,
      selCity: '',
      savecid: cid
    }),
      wx.request({
        url: 'https://api.it120.cc/common/region/child?pid=' + cid,
        success: function (dep) {
          var picity = dep.data.data;
          var depname = [];
          var depid = []
          for (var i = 0; i < picity.length; i++) {
            depname.push(picity[i].name);
            depid.push(picity[i].id)
          }
          that.setData({
            districts: depname,
            streetid: depid,
          })
        }
      })
  },
  bindPickerChange: function (e) {
    var that = this;
    var sid = that.data.streetid[e.detail.value]
    that.setData({
      index3: e.detail.value,
      selDistrict: '',
      savesid: sid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  choseaddress() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
   onPullDownRefresh: function () {
     wx.showNavigationBarLoading() //在标题栏中显示加载
     //模拟加载
     setTimeout(function () {
       // complete
       wx.hideNavigationBarLoading() //完成停止加载
       wx.stopPullDownRefresh() //停止下拉刷新
     }, 1500);
   },
  //删除地址
  deleteAddress: function () {
    var that = this
    wx.showModal({
      title: '确认删除地址吗',
      content: '',
      success: function (sure) {
        wx.request({
          url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/delete',
          data: {
            token: getApp().globalData.token,
            id: that.data.readyid
          },
          success: function () {
            wx.navigateBack({

            })
          }
        })
      }
    })


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switch1Change: function (e) {
    var that = this
    that.setData({
      addressisdeafutl: e.detail.value
    })

  }
})
