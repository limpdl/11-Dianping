Page({
  data: {
    currentUser: null
  },

  onSubmit: function (event) {
    console.log(event)
    let username = event.detail.value.username
    let password = event.detail.value.password
    let page = this

    wx.BaaS.auth.register({
      username: username,
      password: password
    }).then(function (res) {
      console.log(res)
      page.setData({
        currentUser: res
      })
    })
  }, 
  
  onSubmitLogin: function (event) {
    console.log(event)
    let username = event.detail.value.username
    let password = event.detail.value.password
    let page = this

    wx.BaaS.auth.login({
      username: username,
      password: password
    }).then(function (res) {
      console.log(res)
      page.setData({
        currentUser: res
      })
    })
  },

  onLoad: function(options) {
    let page = this
    wx.BaaS.auth.getCurrentUser().then(function(res) {
      // 设置用户
      page.setData({
        currentUser: res
      })
    }).catch(function(err) {
      wx.showModal({
        title: '当前用户未登录',
        content: err.message
      })
    })
  }
})
