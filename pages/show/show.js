// pages/show/show.js
Page({
  data: {
    currentUser: null,
    restaurantId: null,
    restaurant: {},
    reviews: [],
    ratingValues: [5,4,3,2,1],
    rating: 3
  },

  onLoad: function(options) {
    this.setData({
      restaurantId: options.id
    })

    // let restaurantId = this.data.restaurantId
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
    this.fetchReviews()

    // get current user
    wx.BaaS.auth.getCurrentUser().then(function (res) {
      // 设置用户
      page.setData({
        currentUser: res
      })
    })
  },

  fetchReviews: function() {
    let restaurantId = this.data.restaurantId
    let Review = new wx.BaaS.TableObject('reviews')
    let query = new wx.BaaS.Query()
    let page = this
    
    query.compare('restaurant_id', '=', restaurantId)
    Review.setQuery(query).find().then(function (res) {
      page.setData({
        reviews: res.data.objects
      })
    })
  },

  onChangeRating: function(event) {
    let index = event.detail.value
    let rating = this.data.ratingValues[index]
    
    this.setData({
      rating: rating
    })
  },

  onSubmitReview: function(event) {
    let content = event.detail.value.content
    let rating = this.data.rating
    let Review = new wx.BaaS.TableObject('reviews')
    let page = this
    let review = Review.create()
    
    review.set({
      user_id: this.data.currentUser.id.toString(),
      restaurant_id: this.data.restaurantId,
      content: content,
      rating: rating
    })

    review.save().then(function(res) {
      page.fetchReviews()
    })
  }
})