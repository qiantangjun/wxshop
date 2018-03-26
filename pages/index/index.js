Page({
  data: {
    imgUrls: [
    ],
    telphone:[

    ],
    tv:[],
    intel:[],
    computer:[],
    nav:[],
    isHideLoadMore:false,
    more:'正在加载...',
    moredata:false,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
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
      wx.showLoading({
        title: '加载中',
      })
    var that=this
      wx.request({
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: '',
        method: 'GET',
        url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/category/all',
        success:function(res){
          that.setData({
            nav:res.data.data
          })
        },
      }),
        wx.request({
        header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: '',
          method: 'GET',
          url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/banner/list',
          success: function (res) {
            that.setData({
              imgUrls: res.data.data,

            })
          },
        }),
        wx.request({
        header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: '',
          method: 'GET',
          url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/shop/goods/list',
          success: function (res) {
            that.setData({
              telphone: res.data.data,
              tv: res.data.data,
              intel:res.data.data,
              computer:res.data.data
            })
            wx.hideLoading()
          },
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
})