// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    pronum: [],
    address: [],
    address2: [],
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
    wx.getStorage({
      key: 'add',
      success: function (res) {
        wx.request({
          url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/detail',
          data: { token: token, id: res.data },
          success: function (res2) {
            var address3 = []
            address3.push(res2.data.data)
            that.setData({
              address2: address3,
              address: []
            })
          }
        })
      },
    })
    wx.request({
      url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/shipping-address/list',
      data: { token: token },
      success: function (res) {
        if (res.data.msg == "暂无数据") {
          that.setData({
            address: '',
          })
        }
        else {
          var addres=res.data.data
          for(var i=0;i<addres.length;i++){
            if (i <1&&addres[i].isDefault==false){
              that.setData({
                address:[],
                address2:res.data.data
              })
              }
              else{
              that.setData({
                address:res.data.data,
                address2:[]
              })
              }
          }
        }
      }
    })
    var addcar=wx.getStorageSync("addcart")
    var buycar=wx.getStorageSync("buy")
    if(
      addcar
    )
    {
      var carbox = []
      carbox.push(addcar)
      for (var i = 0; i < carbox.length; i++) {
        var selected = carbox[i].selected
        carbox[i].selected = true
      }
      that.setData({
        car: carbox
      })
      that.getTotalPrice()
    }
    if(
      buycar
    ){
      var carbox = []
      carbox.push(buycar)
      for (var i = 0; i < carbox.length; i++) {
        var selected = carbox[i].selected
        carbox[i].selected = true
      }
      that.setData({
        car: carbox
      })
      that.getTotalPrice()
    }
    if(
      buycar&&addcar
    )
    {
      var carbox = []
      carbox.push(buycar,addcar)
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
    wx.clearStorage()
    this.setData({
      car: cars
    })
  },
  gopay: function () {
    if (this.data.address2 == '') {
      var provinceId = this.data.address[0].provinceId
      var cityId = this.data.address[0].cityId
      var districtId = this.data.address[0].districtId
      var address = this.data.address[0].address
      var linkMan = this.data.address[0].linkMan
      var mobile = this.data.address[0].mobile
      var code = this.data.address[0].code
    }
    if (
      this.data.address == ''
    ) {
      var provinceId = this.data.address2[0].provinceId
      var cityId = this.data.address2[0].cityId
      var districtId = this.data.address2[0].districtId
      var address = this.data.address2[0].address
      var linkMan = this.data.address2[0].linkMan
      var mobile = this.data.address2[0].mobile
      var code = this.data.address2[0].code
    }
    //记录订单
    var payOnDelivery = 2
    var expireMinutes = 15
    var calculate = true
    var remark = ""
    var couponId = ''
    var idcard = ''
    var token = getApp().globalData.token
    var goodsJsonStr2 = this.data.car
    var goodsJsonStr = JSON.stringify(goodsJsonStr2)
    var postpay={}
    postpay.token=token
    postpay.goodsJsonStr = goodsJsonStr
    postpay.provinceId = provinceId
    postpay.cityId = cityId
    postpay.districtId = districtId
    postpay.address = address
    postpay.linkMan = linkMan
    postpay.mobile = mobile
    postpay.code=code
    postpay.remark = remark
    postpay.couponId = couponId
    postpay.idcard = idcard
    postpay.payOnDelivery = payOnDelivery
    postpay.expireMinutes = expireMinutes
    wx.setStorageSync("paymoney",postpay)
    wx.setStorageSync("paygoods",this.data.car)
    wx.navigateTo({
      url: '../pay/index',
    })
  }
})