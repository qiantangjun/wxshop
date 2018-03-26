// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      paygoods:[],
      payalldetails:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var token = getApp().globalData.token
    var that = this
    var paydetails = wx.getStorageSync("paymoney")
    var paygoods=wx.getStorageSync("paygoods")
    //console.log(goodsJsonStr2.replace(/\[.*?\]/g, ''))
    this.setData({
      paygoods: paygoods,
      payalldetails: paydetails
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
  paysuucess(){
   wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/create',
     header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
     data: this.data.payalldetails,
      method:"Post",
      success:function(resd){
        wx.navigateTo({
          url: '../user/order/index',
        })
       wx.clearStorage()
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