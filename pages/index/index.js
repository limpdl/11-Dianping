Page({
  data: {
    restaurants: []
  },

  onLoad: function() {
    let tableName = 'restaurants'
    let Restaurant = new wx.BaaS.TableObject(tableName)
    let page = this
    
    Restaurant.find().then(function(res) {
      page.setData({
        restaurants: res.data.objects
      })
    })
  },
  
  onTap: function(event) {
    let restaurantId = event.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/show/show?id=' + restaurantId
    })
  }
})