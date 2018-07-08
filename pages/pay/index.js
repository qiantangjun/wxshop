// pages/pay/index.js
import ajax from '../../utils/data'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paygoods: [],
    payalldetails: "",
    allprice: '',
    address: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var token = getApp().globalData.token
    var that = this
    var pushbox = []
    var paygoods = wx.getStorageSync("paygoods")
    if(paygoods==""){
      wx.showToast({
        title: '错误请求',
      })
      setTimeout(function(){
        wx.switchTab({
          url: '../index/index',
        })
      },500)
    }
    pushbox = paygoods
    var all = 0
    for (var i = 0; i < pushbox.length; i++) {
      all += pushbox[i].price * pushbox[i].number
    }
    that.address()
   
    this.setData({
      paygoods: pushbox,
      allprice: all
    })
  },
  address(){
    var that=this
    var address={}
        address.data={}
        address.data.token=getApp().globalData.token
        address.url="user/shipping-address/default"
        address.method="GET"
        ajax.wxdata(address,function(success){
          var addbox=[]
         if(success.data.code==0){
           addbox.push(success.data.data)
           that.setData({
             address:addbox
           });
         }
       });
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
    if(that.data.address.length==0){
      wx.showToast({
        title: '请先选择地址',
      })
      that.address()
    }
    else{
        that.create()
    }
  },
  create(){
    var that=this
    // var creadata={}
    //     creadata.url="/order/create"
    //     creadata.method="POST"
    //     creadata.data={}
    //     creadata.data.linkMan=that.data.address[0].linkMan
    //     creadata.data.mobile=that.data.address[0].mobile
    //     creadata.data.code=that.data.address[0].code
    //     creadata.data.provinceStr=that.data.address[0].provinceStr
    //     creadata.data.areaStr=that.data.address[0].areaStr
    //     creadata.data.address=that.data.address[0].address
    //     creadata.data.provinceId=that.data.address[0].provinceId
    //     creadata.data.cityId=that.data.address[0].cityId
    //     creadata.data.districtId=that.data.address[0].districtId
    //     creadata.data.cityStr= that.data.address[0].cityStr
    //     creadata.data.goodsJsonStr=JSON.stringify(that.data.paygoods)
    //     creadata.data.expireMinutes=120
    //     creadata.data.token=getApp().globalData.token
    //     ajax.wxdata(creadata,function(resd){

    //     })
    wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/create',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        linkMan:that.data.address[0].linkMan,
        mobile: that.data.address[0].mobile,
        code: that.data.address[0].code,
        provinceStr:that.data.address[0].provinceStr,
        areaStr: that.data.address[0].areaStr,
        address: that.data.address[0].address,
        provinceId:that.data.address[0].provinceId,
        cityId: that.data.address[0].cityId,
        districtId:that.data.address[0].districtId,
        cityStr: that.data.address[0].cityStr,
        goodsJsonStr: JSON.stringify(that.data.paygoods),
        expireMinutes:120,
        token: getApp().globalData.token
      },
      method: "Post",
      success: function (resd) {
        if (resd.data.code == 0) {
          wx.showToast({ title: '订单创建成功' })
          wx.clearStorageSync()
         var pdata=[]
         pdata.push(resd.data.data.amountReal, resd.data.data.orderNumber)
         pdata.money = resd.data.data.amountReal
         pdata.ordernumber = resd.data.data.orderNumber
          wx.navigateTo({
            url: '../paymoney/index?money='+pdata
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
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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
