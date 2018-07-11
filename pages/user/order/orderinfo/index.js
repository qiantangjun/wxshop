// pages/user/order/orderinfo/index.js
import ajax from '../../../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    orderinfo:{},
    address:{},
    logistics:{},
    orderNumber:'',
    orderID:"",
    amountReal:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this
      var id=options.id
      var address={}
          address.data={}
          address.data.token=getApp().globalData.token
          address.data.id=id
          address.url="order/detail"
          address.method="GET"
          ajax.wxdata(address,function(res){
            that.setData({
              goods: res.data.data.goods,
              orderinfo: res.data.data.orderInfo,
              address: res.data.data.logistics,
              logistics: res.data.data.logistics,
              orderNumber: res.data.data.orderInfo.orderNumber,
              orderID: res.data.data.goods[0].orderId,
              amountReal: res.data.data.orderInfo.amountReal
            })
          })
      // wx.request({
      //   url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/detail',
      //   data:{
      //     token: getApp().globalData.token,
      //     id:id
      //   },
      //   success:function(res){
      //     that.setData({
      //       goods: res.data.data.goods,
      //       orderinfo: res.data.data.orderInfo,
      //       address: res.data.data.logistics,
      //       logistics: res.data.data.logistics
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

  },
  qxorder: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认取消订单吗',
      success: function (rec) {
        if (rec.confirm) {
          wx.request({
            url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/close',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "Post",
            data: {
              token: getApp().globalData.token,
              orderId: id
            },
            success: function (qorder) {

              if (qorder.data.code == 0) {
                wx.showToast({
                  title: '取消订单成功',
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/user/order/index',
                  })
                }, 1000)
              }
              else {
                wx.showToast({
                  title: '取消订单失败',
                })
              }
            }
          })
        } else if (rec.cancel) {
          wx.showToast({
            title: '放弃',
          })
        }

      }
    })
  },
  wxpay: function (e) {

    var payprice = e.currentTarget.dataset.money
    var payName = e.currentTarget.dataset.number
    var pdata = []
    pdata.push(payprice, payName)
    wx.navigateTo({
      url: '../../../paymoney/index?money=' + pdata
    })
    // wx.request({
    //   url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/pay/wx/wxapp',
    //   data:{
    //     token:token,
    //     money: payprice,
    //     payName: payName
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method:"Post",
    //   success:function(res){
    //     if(res.code==0){
    //       wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //       })
    //     }
    //     else{
    //       wx.showToast({
    //       title: '支付失败',
    //       icon: 'success',
    //       duration: 2000
    //       })
    //     }
    //   }
    // })
  },
  sureshop: function (e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认收货吗',
      success: function (shuer) {
        if (shuer.confirm) {
          wx.request({
            url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/delivery',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "Post",
            data: {
              token: getApp().globalData.token,
              orderId: id
            },
            success: function (order) {
              if (order.code == 0) {
                wx.showToast({
                  title: '确认收货成功',
                })
              }
            }
          })
        } else if (shuer.cancel) {
          wx.showToast({
            title: '取消确认收货',
          })
        }
      }
    })
  },
})
