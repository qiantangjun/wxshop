var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDors: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    activeCategoryId: 0
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    })
    // this.getGoodsList(e.currentTarget.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
      wx.request({
        url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/category/all',
        success: function (res) {
          var category = [{ id: 0, name: '全部' }]
          res.data.data.forEach(item => {
            category.push(item)
          })
          that.setData({
            categories: category
          })
        }
      })
      wx.request({
        url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/list',
        success:function(goods){
          wx.hideLoading()
          that.setData({
            goods: goods.data.data
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