import ajax from '../../../utils/data'
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    order: [

    ],
    orderlist:{},
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function () {

    var token = getApp().globalData.token;
    var that=this
    var order={}
        order.data={}
        order.data.token=getApp().globalData.token
        order.url="order/list"
        order.method="GET"
        ajax.wxdata(order,function(res){
          if(res.data.code==0){
            that.setData({
              order: res.data.data.orderList,
              orderlist: res.data.data.goodsMap
            })
          }
          else{
            that.setData({
              order:[],
              orderlist:{}
            })
          }
        })
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            clientHeight: res.windowHeight
          });
        }
      });
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  onReachBottom: function () {
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  calling(){
    wx.makePhoneCall({
      phoneNumber: '123455',
    })
  },
  gotoindex(){
    wx.switchTab({
      url: '../../index/index',
    })
  },
  wxpay:function(e){
    console.log(e.target.dataset.index)
    // var index =e.currentTarget.dataset.index
    // var payprice = paymoney[index].amountReal
    // var payName = paymoney[index].orderNumber
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
  //确认收货
  sureshop:function(e){
  var id=e.currentTarget.dataset.id
  wx.showModal({
    title: '提示',
    content: '确认收货吗',
    success:function(shuer){
      if (shuer.confirm) {
        wx.request({
          url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/order/delivery',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method:"Post",
          data:{
            token: getApp().globalData.token,
            orderId:id
          },
          success:function(order){
            if(order.code==0){
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
  },//取消订单
  qxorder:function(e){
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
            success:function (qorder) {
              
              if(qorder.data.code==0){
                wx.showToast({
                  title: '取消订单成功',
                })
                setTimeout(function(){
                  wx.redirectTo({
                    url: '/pages/user/order/index',
                  })
                },1000)
              }
              else{
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
  }
})
