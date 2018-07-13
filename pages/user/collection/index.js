// pages/user/collection/index.js
import ajax from '../../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  collection:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that=this
    var colldata={}
        colldata.url="shop/goods/fav/list"
        colldata.data={}
        colldata.data.token=getApp().globalData.token
        ajax.wxdata(colldata,function(res){
          if(res.data.code==0){
            that.setData({
              collection:res.data.data
            })
          }
          else{
            that.setData({
              collection:""
            })
          }
        })
  },
  delete:function(e){
    wx.showModal({
      title: '提示',
      content: '确认删除此商品吗',
      success: function (res) {
        if (res.confirm) {
            var deledata={}
            deledata.url ="shop/goods/fav/delete"
            deledata.data={}
            deledata.data.token = getApp().globalData.token
            deledata.data.goodsId = e.currentTarget.dataset.id
            ajax.wxdata(deledata,function(res){
              if(res.data.code==0){
                wx.showToast({
                  title: '删除成功',
                })
                wx.navigateTo({
                  url: 'index',
                })
              }
              else{
                wx.showToast({
                  title:res.data.msg,
                })
              }
            })
        }
        else if (res.cancel) {
          
        }
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
