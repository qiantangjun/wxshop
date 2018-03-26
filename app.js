//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.login({
      success: function (res) {
        if (res.code) {
          //存在code
          wx.request({
            url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/wxapp/login',
            data: { code: res.code },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
            // wx.request({
             //  url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/wxinfo',
             //  data: { token: res.data.data.token },
              // method:'POST',
              // header: {
              //   "content-type": "application/x-www-form-urlencoded"
              // },
               //success:function(re){
              //  console.log(re)
              // }
            // })
            that.globalData.token=res.data.data.token;
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
            },
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '获取用户信息失败',
            showCancel: false
          })
        }
      }
    }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token:null
  }
})