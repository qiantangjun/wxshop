// pages/car/index.js
import ajax from '../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var pro = {}
    pro.data = {}
    pro.data.categoryId = options.id
    pro.url = "shop/goods/list"
    pro.method = "GET"
    ajax.wxdata(pro, function(res) {
      if (res.data.code == 0) {
        that.setData({
          prolist: res.data.data,
          procid: options.id
        })
      } else {
        that.setData({
          prolist: "",
          procid: ""
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})