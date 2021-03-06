// pages/user/user.js
import ajax from '../../utils/data'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
      usermoney:0,
      account:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          avatarUrl: JSON.parse(res.rawData).avatarUrl,
          nickName: JSON.parse(res.rawData).nickName,
        })
      }
    });
    var moneydata={}
    moneydata.url="user/amount"
    moneydata.data={}
    moneydata.data.token=getApp().globalData.token
    ajax.wxdata(moneydata,function(rem){
    that.setData({
      usermoney:rem.data.data.balance,
      account:rem.data.data.score
    })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   *

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
