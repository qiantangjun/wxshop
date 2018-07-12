import ajax from '../../../utils/data'
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    coupon:[],
    coupou2:[]
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
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    var coupoudata={}
    coupoudata.url="discounts/my"
    coupoudata.data={}
    coupoudata.data.token= getApp().globalData.token
    ajax.wxdata(coupoudata,function(res){
      var coupon1=[]
      var coupon2=[]
      if(res.data.code==0){
        // that.setData({
        //   coupon:res.data.data
        // })
        for(var i=0;i<res.data.data.length;i++){
          if(res.data.data[i].status==0){
            coupon1.push(res.data.data[i])
          }
          else if(res.data.data[i].status==1){
            coupon2.push(res.data.data[i])
          }
        }
        that.setData({
          coupon:coupon1,
          coupou2:coupon2
        })
      }
      else{
        that.setData({
          coupon: ''
        })
      }
    })
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
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
      })
    }, 1500)

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

})
