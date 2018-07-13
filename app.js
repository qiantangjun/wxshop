//app.js
import ajax from './utils/post'
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
          that.login(res.code)
          //存在code

        } else {
          that.eorrr()
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null
  },
  login(code){
    var that=this
    var logindata={}
        logindata.url="user/wxapp/login"
        logindata.data={}
        logindata.data.code=code
        ajax.post(logindata,function(recs){
          if (recs.data.code == 0) {
            that.globalData.token = recs.data.data.token;
            wx.showToast({
              title: '登录成功',
            })
          }
          else if (recs.data.code == 10000) {
            wx.login({
              success: function (wlogin) {
               if(wlogin.code){
                 that.reg(wlogin.code)
               }
               else{
                 that.eorrr()
               }
              }
            })
          }
          else {
            wx.showToast({
              title: recs.data.code,
            })
          }
        })
  },
  reg(code){
    var that=this
    var regdata={}
    regdata.url="user/wxapp/register/simple"
    regdata.data={}
    regdata.data.code=code
    ajax.post(regdata,function(ress){
      if (ress.data.code == 0) {
        wx.showToast({
          title: '您已注册成功',
        })
        wx.login({
          success: function (reg) {
            if(reg.code){
              that.login(reg.code)
            }
            else {
              that.eorrr()
            }
          }
        })
      }
      else {
        wx.showToast({
          title: ress.data.msg,
        })
      }
    })
  },
  eorrr(){
    wx.showModal({
      title: '提示',
      content: '获取用户信息失败',
      showCancel: false
    })
  }
})
