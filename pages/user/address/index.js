import ajax from '../../../utils/data'
// pages/user/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var token = getApp().globalData.token;
    var that = this;
    var addata={}
        addata.data={}
        addata.url="user/shipping-address/list"
        addata.method="GET"
          addata.data.token=token
          ajax.wxdata(addata,function(res){
          if(res.data.code==700){
            that.setData({
              address:""
            })
          }
          else if(res.data.code==0){
            that.setData({
              address:res.data.data
            })
          }
          })
    // wx.request({
    //   url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/list?token='+token,
    //   success:function(res){
    //     if (res.data.msg=="暂无数据"){
    //       that.setData({
    //         address:''
    //       })
    //    }
    //    else{
    //       that.setData({
    //         address:res.data.data
    //       })
    //    }
    //    wx.hideLoading()
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
  onLoad: function () {

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

  },
  gopay:function(e){
    var index = e.currentTarget.id;
      wx.setStorage({
        key: 'add',
        data:index,
        success:function(){
          wx.navigateBack({

          })
        }
      })
  }
})
