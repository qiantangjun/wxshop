// pages/pay/index.js
import ajax from '../../utils/data'
import ajaxpost from '../../utils/post'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paygoods: [],
    payalldetails: "",
    allprice: '',
    payallprice:'',
    address: [],
    money: [{
        money: "在线转账",
        index: '1',
        payOnDelivery: '2'
      },
      {
        money: "货到付款",
        index: '2',
        payOnDelivery: '1'
      },

    ],
    paychose: '',
    coupon: [{
      "id": 11111111,
      "money": 0,
      "moneyHreshold": 0,
      "name": "无可用优惠券",
      "pid": 2676,
      "status": 0,
      "statusStr": "正常",
      "type": "无可用优惠券"
    }, ],
    couponID:'',
    couponmoney:0.00,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var paygoods = wx.getStorageSync("paygoods")
    if (paygoods == "") {
      wx.showToast({
        title: '错误请求',
      })
      setTimeout(function() {
        wx.switchTab({
          url: '../index/index',
        })
      }, 500)
    }
    var token = getApp().globalData.token
    var that = this
    var pushbox = []
    var paycoupon = that.data.money
    paycoupon[0].check = true
    pushbox = paygoods
    var all = 0
    for (var i = 0; i < pushbox.length; i++) {
      all += pushbox[i].price * pushbox[i].number
    }
    that.address()
    var coupondata = {}
    coupondata.url = "discounts/my"
    coupondata.data = {}
    coupondata.data.status = 0
    coupondata.data.token = token
    ajax.wxdata(coupondata, function(cou) {
      var coudata = []
        coudata.push(that.data.coupon[0])
      if (cou.data.code == 0) {
        for (var i = 0; i < cou.data.data.length; i++) {
          coudata.push(cou.data.data[i])
        }
      } else {
        coudata.push(that.data.coupon[0])
      }
      coudata[0].check=true
      that.setData({
        coupon:coudata
      })
    })
    that.setData({
      paygoods: pushbox,
      allprice: all,
      payallprice:all,
      money: paycoupon,
      paychose: paycoupon[0].payOnDelivery,
    })

  },
  address() {
    var that = this
    var address = {}
    address.data = {}
    address.data.token = getApp().globalData.token
    address.url = "user/shipping-address/default"
    address.method = "GET"
    ajax.wxdata(address, function(success) {
      var addbox = []
      if (success.data.code == 0) {
        addbox.push(success.data.data)
        that.setData({
          address: addbox
        });
      }
    });
  },
  couclick: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index - 1
    var paycoupon = that.data.money
    for (var i = 0; i < paycoupon.length; i++) {
      paycoupon[i].check = false
    }
    paycoupon[index].check = true
    that.setData({
      money: paycoupon,
      paychose: paycoupon[index].payOnDelivery
    })
  },
  chosecoupon:function(e){
    var that=this
    var index=e.currentTarget.dataset.index
    var maxmoney=e.currentTarget.dataset.pay
    var couponmoney=e.currentTarget.dataset.money
    var chosedata=that.data.coupon
    var allprice = that.data.payallprice
    var couponid=e.currentTarget.dataset.id
    if(maxmoney>=allprice){
        wx.showToast({
          title:"满"+maxmoney+"可用",
        })
        return false
    }
    allprice=allprice-couponmoney
    for(var i=0;i<chosedata.length;i++){
      chosedata[i].check=false
    }
    chosedata[index].check=true
    that.setData({
      coupon:chosedata,
      allprice:allprice.toFixed(1),
      couponID:couponid,
      couponmoney:couponmoney
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
  onHide: function() {},
  paysuucess() {
    var that = this
    if (that.data.address.length == 0) {
      wx.showToast({
        title: '请先选择地址',
      })
      that.address()
    } else {
      that.create()
    }
  },
  create() {
    var that = this
    var orderdata = {}
    orderdata.url = "order/create"
    orderdata.data = {}
    orderdata.data.linkMan = that.data.address[0].linkMan
    orderdata.data.mobile = that.data.address[0].mobile
    orderdata.data.code = that.data.address[0].code
    orderdata.data.provinceStr = that.data.address[0].provinceStr
    orderdata.data.areaStr = that.data.address[0].areaStr
    orderdata.data.address = that.data.address[0].address
    orderdata.data.provinceId = that.data.address[0].provinceId
    orderdata.data.cityId = that.data.address[0].cityId
    orderdata.data.districtId = that.data.address[0].districtId
    orderdata.data.cityStr = that.data.address[0].cityStr
    orderdata.data.goodsJsonStr = JSON.stringify(that.data.paygoods)
    orderdata.data.expireMinutes = 120
    orderdata.data.token = getApp().globalData.token
    orderdata.data.payOnDelivery = that.data.paychose
    orderdata.data.couponId=that.data.couponID
    ajaxpost.post(orderdata, function(resd) {
      if (resd.data.code == 0) {
        wx.showToast({
          title: '订单创建成功'
        })
        wx.clearStorageSync()
        var pdata = []
        pdata.push(resd.data.data.amountReal, resd.data.data.orderNumber)
        if (that.data.paychose == 2) {
          wx.navigateTo({
            url: '../paymoney/index?money=' + pdata
          })
        } else if (that.data.paychose == 1) {
          wx.navigateTo({
            url: '../user/order/index'
          })
        }
      }
    })
  },
  // paymoney(token,money){
  //   wx.request({
  //     url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/pay/wx/wxapp',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       token:token,
  //       money:money,
  //       payName: "支付商品"
  //     },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         // 发起支付
  //         wx.requestPayment({
  //           timeStamp: res.data.data.timeStamp,
  //           nonceStr: res.data.data.nonceStr,
  //           package: 'prepay_id=' + res.data.data.prepayId,
  //           signType: 'MD5',
  //           paySign: res.data.data.sign,
  //           fail: function (aaa) {
  //             wx.showToast({ title: '支付失败' })
  //           },
  //           success: function () {
  //             wx.showToast({ title: '支付成功' })
  //             wx.clearStorageSync()
  //            setTimeout(function(){
  //              wx.redirectTo({
  //                url: '../pay/paysuccess/index',
  //              })
  //            },500)
  //           }
  //         })
  //       } else {
  //         wx.showToast({ title: '支付失败' + res.data.code })
  //         setTimeout(function(){
  //           wx.redirectTo({
  //             url: '../pay/payfailed/index',
  //           })
  //         },500)
  //       }
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
