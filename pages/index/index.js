import ajax from '../../utils/data.js'
Page({
  data: {
    imgUrls: [
    ],
    tv:[],
    nav:[],
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
      // wx.showLoading({
      //   title: '加载中',
      // })
    var that=this;
    var wdata={};
    wdata.data={};
        wdata.method="GET"
        wdata.url="shop/goods/category/all"
        ajax.wxdata(wdata,function(res){
          if (res.data.code !== 0){
           
              that.setData({
                nav:[]
            })
          }
          else {

            that.setData({
              nav: res.data.data
            })
          }
        });
          wdata.url="banner/list"
          ajax.wxdata(wdata,function(reb){
                that.setData({
                  imgUrls: reb.data.data,
                });
          });
          wdata.url="shop/goods/list"
          ajax.wxdata(wdata,function(goods){
                that.setData({
                   tv:goods.data.data,
                });
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
})
