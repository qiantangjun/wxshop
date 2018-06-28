// pages/message/messtent/index.js
import ajax from '../../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var mcontent={}
      mcontent.data={}
    mcontent.method="GET"
    mcontent.url="notice/detail"
    mcontent.data.id=options.id
    ajax.wxdata(mcontent,function(res){
          that.setData({
            title: res.data.data.title,
          })
    })
    // wx.request({
    //   url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/notice/detail?id='+options.id,
    //   success:function(res){
    //     that.setData({
    //       title: res.data.data.title,
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
