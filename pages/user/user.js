Page({
  data: {
    state: 'register', // 'login'
    currentUser: null
  },

  changeState: function() {
    if (this.data.state == 'register' ) {
      this.setData({
        state: 'login'
      })
    } else {
      this.setData({
        state: 'register'
      })
    }
  },

  onRegister: function (event) {
    console.log(event)
    let username = event.detail.value.username
    let password = event.detail.value.password
    let page = this

    if (!username || !password) {
      wx.showModal({
        title: '用户名或密码不能为空'
      })
    } else {
      wx.BaaS.auth.register({
        username: username,
        password: password
      }).then(function (res) {
        console.log(res)
        page.setData({
          currentUser: res
        })
      }).catch(function(err) {
        wx.showModal({
          title: '注册失败',
          content: err.message
        })
      })
    }
  }, 
  
  onLogin: function (event) {
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
    }).catch(function (err) {
      wx.showModal({
        title: '登录失败',
        content: err.message
      })
    })
  },
  
  onLogout: function() {
      wx.BaaS.auth.logout()
      this.setData({
        currentUser: null
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
      // wx.showModal({
      //   title: '当前用户未登录',
      //   content: err.message
      // })
    })
  }
})
