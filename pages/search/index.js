// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchRetData:''
  },
  _sendSearchReq: function (e) {
    var that=this
    let value = e.detail.value;
    let data = this.data;
    wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/list',
      success:function(res){
        console.log(res)
        that.setData({
          searchRetData:res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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