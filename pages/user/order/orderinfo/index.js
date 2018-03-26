// pages/user/order/orderinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    orderinfo:{},
    address:{},
    logistics:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this
      var id=options.id
      wx.request({
        url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/detail',
        data:{
          token: getApp().globalData.token,
          id:id
        },
        success:function(res){
        console.log(res)
          that.setData({
            goods: res.data.data.goods,
            orderinfo: res.data.data.orderInfo,
            address: res.data.data.logistics,
            logistics: res.data.data.logistics
          })
        }
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