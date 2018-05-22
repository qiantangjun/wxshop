// pages/pay/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paygoods: [],
    payalldetails: "",
    allprice: '',
    address: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var token = getApp().globalData.token
    var that = this
    var pushbox = []
    var paygoods = wx.getStorageSync("paygoods")
    pushbox = paygoods
    var all = 0
    for (var i = 0; i < pushbox.length; i++) {
      all += pushbox[i].price * pushbox[i].number
    }
    wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/list',
      data: {
        token: getApp().globalData.token
      },
      success: function (success) {
        that.setData({
          address: success.data.data
        })
      }
    })
    //console.log(goodsJsonStr2.replace(/\[.*?\]/g, ''))
    this.setData({
      paygoods: pushbox,
      allprice: all
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  paysuucess() {
    var that = this
    wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/default',
      data: {
        token: getApp().globalData.token
      },
      success: function (success) {
        wx.request({
          url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/create',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            linkMan: success.data.data.linkMan,
            mobile: success.data.data.mobile,
            code: success.data.data.code,
            provinceStr: success.data.data.provinceStr,
            areaStr: success.data.data.areaStr,
            address: success.data.data.address,
            provinceId: success.data.data.provinceId,
            cityId: success.data.data.cityId,
            districtId: success.data.data.districtId,
            cityStr: success.data.data.cityStr,
            goodsJsonStr: JSON.stringify(that.data.paygoods),
            expireMinutes: 50,
            token: getApp().globalData.token
          },
          method: "Post",
          success: function (resd) {
            if (resd.data.code == 0) {
              wx.clearStorageSync()
              var token = getApp().globalData.token
              var money = resd.data.data.amountReal
              wx.request({
                url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/pay/wx/wxapp',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  token: token,
                  money: money,
                  payName: "支付商品"
                },
                success: function (res) {
                  if (res.data.code == 0) {
                    // 发起支付
                    wx.requestPayment({
                      timeStamp: res.data.data.timeStamp,
                      nonceStr: res.data.data.nonceStr,
                      package: 'prepay_id=' + res.data.data.prepayId,
                      signType: 'MD5',
                      paySign: res.data.data.sign,
                      fail: function (aaa) {
                        wx.showToast({ title: '支付失败' })
                      },
                      success: function () {
                        wx.showToast({ title: '支付成功' })
                      }
                    })

                  } else {
                    wx.showToast({ title: '支付失败' + res.data.code })
                    wx.navigateTo({
                      url: '../user/order/index',
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})