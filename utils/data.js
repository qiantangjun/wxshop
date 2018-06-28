function wxdata(jsdata,callback){
  wx.showLoading({
        title: '加载中',
  })
  var rootDocment="https://api.it120.cc/b4bc6fa88ad298e813c236857ec6f67e/"
  var url=jsdata.url
  var method=jsdata.method
  var data=jsdata.data
  wx.request({
         url: rootDocment + url,
         data: data,
         method:method,
         header: {'Content-Type': 'application/json'},
         success: function(res){
             wx.hideLoading()
              if(res.data.code=="400"||res.data.code=="401"||res.data.code=='402'||res.data.code=='404'||res.data.code=='2000'){
                wx.showToast({
                title:res.data.msg,
                icon: 'loading',
                duration: 10000
                })
              }
              else{
                callback(res)
              }
         },
         fail: function(error){
           wx.showToast({
           title:"网络错误，请重试",
           icon: 'loading',
           duration: 10000
           })
            wx.hideLoading()
         }
       })
}
module.exports={
  wxdata:wxdata
}
