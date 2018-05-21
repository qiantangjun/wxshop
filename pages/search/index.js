// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchRetData:'',
    inputValue:'',
    nolist:''
  },
  _sendSearchReq: function (e) {
    var that=this
    that.setData({
      searchRetData: '',
      nolist: ''
    })
    var searchdata=[]
    wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/list',
      success:function(res){
        var sdata=res.data.data
        for(var i=0;i<sdata.length;i++){
          if (sdata[i].id ==that.data.inputValue) {
            searchdata.push(sdata[i])
          } else {
            if (
              sdata[i].characteristic.match(that.data.inputValue)
            ) {
              searchdata.push(sdata[i])
            } else {
              if (
                sdata[i].name.match(that.data.inputValue)
              ) {
                searchdata.push(sdata[i])
              } else {
              }
            }
          }
        }
       if(
         searchdata.length==0
       ){
         that.setData({
           nolist:"未搜索到指定商品的数据"
         })
       }
       else{
         that.setData({
           searchRetData: searchdata
         })
       }
      }
    })
  },
  searchinput:function(e){
    var that=this
    that.setData({
      inputValue: e.detail.value
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