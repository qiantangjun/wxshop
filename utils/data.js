function wxdata(jsdata, callback) {
  setTimeout(function () {
    wx.showLoading({
      title: '加载中',
    })
  },310)
  var rootDocment = "https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/"
  var url = jsdata.url
  var method = jsdata.method
  var data = jsdata.data
 setTimeout(function(){
   wx.request({
     url: rootDocment + url,
     data: data,
     method: "GET",
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success: function (res) {
       wx.hideLoading()
       if (res.data.code == "400" || res.data.code == "401" || res.data.code == '402' || res.data.code == '2000') {
         wx.showToast({
           title: res.data.msg,
           icon: 'loading',
           duration: 1500
         })
       } else {
         callback(res)
       }
     },
     fail: function (error) {
       wx.showToast({
         title: "网络错误，请重试",
         icon: 'loading',
         duration: 10000
       })
       wx.hideLoading()
     }
   })
 },320)
}
module.exports = {
  wxdata: wxdata
}
