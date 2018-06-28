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
            success: function (recs) {
              if (recs.data.code==0){
                that.globalData.token = recs.data.data.token;
              }
              else if (recs.data.code == 10000){
               wx.login({
                 success:function(wlogin){
                   wx.request({
                     url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/wxapp/register/simple',
                     data: { code: wlogin.code },
                     method: 'POST',
                     header: {
                       "content-type": "application/x-www-form-urlencoded"
                     },
                     success: function (ress) {
                       if (ress.data.code == 0) {
                         wx.showToast({
                           title: '您已注册成功',
                         })
                        wx.login({
                          success:function(reg){
                            wx.request({
                              url: 'https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/user/wxapp/login',
                              data: { code: reg.code },
                              method: 'POST',
                              header: {
                                "content-type": "application/x-www-form-urlencoded"
                              },
                              success: function (ressc) {
                                if (ressc.data.code == 0) {
                                  that.globalData.token = ressc.data.data.token;
                                }
                                else {
                                  wx.showToast({
                                    title: ressc.data.msg,
                                  })
                                }
                              },
                              fail: function (error) {

                              }
                            })
                          }
                        })
                       }
                       else {
                         wx.showToast({
                           title: recs.data.msg,
                         })
                       }
                     },
                   })
                 }
               })
              }
              else{
                wx.showToast({
                  title: recs.data.code,
                })
              }
            },
            fail:function () {
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
    token: null
  }
})