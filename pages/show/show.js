// pages/show/show.js
Page({
  data: {
    restaurant: {},
    reviews: []
  },
  onLoad: function(options) {
    let restaurantId = options.id 

    // get restaurant info
    let Restaurant = new wx.BaaS.TableObject('restaurants')
    let page = this
    
    Restaurant.get(restaurantId).then(function(res) {
      page.setData({
        restaurant: res.data
      })
    })

    // get restaurant review
    let Review = new wx.BaaS.TableObject('reviews')
    let query = new wx.BaaS.Query()

    query.compare('restaurant_id', '=', restaurantId)
    Review.setQuery(query).find().then(function(res) {
      page.setData({
        reviews: res.data.objects
      })
    })
  }
})