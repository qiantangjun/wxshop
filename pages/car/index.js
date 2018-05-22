// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    pronum: [],
    num: 1,
    car: [],
    selectedAll: true,
    totalPrice: 0,
    totalnum: 0,
    pic: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var token = getApp().globalData.token
    var that = this
    var addcar = wx.getStorageSync("addcart")
    if (
      addcar
    ) {
      var carbox = []
      carbox = addcar
      for (var i = 0; i < carbox.length; i++) {
        var selected = carbox[i].selected
        carbox[i].selected = true
      }
      that.setData({
        car: carbox
      })
      that.getTotalPrice()
    }

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
  gotoindex() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //购物车加
  addnum: function (e) {
    var index = e.currentTarget.dataset.index
    var car = this.data.car
    var number = car[index].number
    var maxnum = car[index].maxnum
    if (number >= maxnum) {
      return
    }
    number = number + 1
    car[index].number = number
    this.setData({
      car: car
    })
    this.getTotalPrice()
    wx.setStorageSync("addcart", car)
  },
  //购物减
  subnum: function (e) {
    var index = e.currentTarget.dataset.index
    var car = this.data.car
    var number = car[index].number
    if (number < 2) {
      return false
    }
    number = number - 1
    car[index].number = number
    this.setData({
      car: car
    })
    this.getTotalPrice()
    wx.setStorageSync("addcart", car)
  },
  //购物车全选事件
  selectedAll: function () {
    var selectedAll = this.data.selectedAll
    selectedAll = !selectedAll
    var cars = this.data.car
    for (
      var i = 0; i < cars.length; i++
    ) {
      cars[i].selected = selectedAll;
    }
    this.setData({
      selectedAll: selectedAll,
      car: cars
    })
    this.getTotalPrice()
  },
  getTotalPrice() {
    var cars = this.data.car
    var total = 0
    var tnum = 0
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].selected) {                     // 判断选中才会计算价格
        total += cars[i].number * cars[i].price;
        tnum += cars[i].number// 所有价格加起来
      }
      this.setData({                                // 最后赋值到data中渲染到页面
        car: cars,
        totalPrice: total.toFixed(0),
        totalnum: tnum
      });
    }
  },
  selectedlist: function (e) {
    var index = e.currentTarget.dataset.index;
    var cars = this.data.car;
    var selected = cars[index].selected;
    cars[index].selected = !selected;
    this.setData({
      car: cars,
      selectedAll: false
    })
    this.getTotalPrice();
    this.choseall()
  },
  choseall() {
    var cars = this.data.car
    var i = 0
    cars.forEach(item => {
      if (item.selected == true) i++
      return i
    })
    if (i == cars.length) {
      this.setData({
        selectedAll: true
      })
    }
  },
  delecart: function (e) {//购物车删除   
    var index = e.currentTarget.dataset.index
    var cars = this.data.car
    wx.showToast({
      title: '删除成功',
    })
    cars.splice(index, 1)
    this.setData({
      car: cars
    })
    if (cars.length == 0) {
      wx.clearStorage("addcart")
    }
    wx.setStorageSync("addcart", cars)
  },

  gopay: function () {
    //记录订单
    var token = getApp().globalData.token
    var goodsJsonStr2 = this.data.car
    var goodsJsonStr = JSON.stringify(goodsJsonStr2)
    var postpay = {}
    postpay.token = token
    postpay.goodsJsonStr = goodsJsonStr
    wx.setStorageSync("paygoods", this.data.car)
    wx.navigateTo({
      url: '../pay/index',
    })
  }
})