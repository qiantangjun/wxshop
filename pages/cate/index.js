import ajax from '../../utils/data'
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
    var that = this
    var wdata={}
        wdata.data={}
        wdata.url="shop/goods/category/all"
        wdata.method="GET"
        ajax.wxdata(wdata,function(res){
              var category = [{ id: 0, name: '全部' }]
              res.data.data.forEach(item => {
                category.push(item)
              })
              that.setData({
                categories: category
              })
        })
      // wx.request({
      //   url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/category/all',
      //   success: function (res) {
      //     var category = [{ id: 0, name: '全部' }]
      //     res.data.data.forEach(item => {
      //       category.push(item)
      //     })
      //     that.setData({
      //       categories: category
      //     })
      //   }
      // })
      wdata.url="shop/goods/list"
      ajax.wxdata(wdata,function(req){
        that.setData({
          goods: req.data.data
        })
      })
      // wx.request({
      //   url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/list',
      //   success:function(goods){
      //     wx.hideLoading()
      //     that.setData({
      //       goods: goods.data.data
      //     })
      //   }
      // })
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
     wx.showNavigationBarLoading() //在标题栏中显示加载
     //模拟加载
     setTimeout(function () {
       // complete
       wx.hideNavigationBarLoading() //完成停止加载
       wx.stopPullDownRefresh() //停止下拉刷新
     }, 1500);
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
