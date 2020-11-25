// pages/country/country.js
Page({
  data: {
    rows:[
      {name: 'USA'},
      {name: 'UK'},
      {name: 'Germany'},
      {name: 'China'},
      {name: 'Canada'},
      {name: 'India'},
      {name: 'France'},
      {name: 'Australia'},
      {name: 'Other'}
    ],
    lastCity: ''
  },
  onLoad: function (options) {
    let lastCity = tt.getStorageSync('city');
    this.setData({lastCity});
  },
  onShow: function () {
    // Do something when page show.
    let currentCity = tt.getStorageSync('city');
    if (this.data.lastCity != currentCity) {
      tt.navigateBack();
    }
  },
  onClickCell: function (event) {
    var index = event.currentTarget.dataset.index;

    if (index === this.data.rows.length-1) {
    } else {
      tt.setStorageSync('country', this.data.rows[index].name);
    }

    let urlPath = '/pages/city/city?countryIndex='+index
    tt.navigateTo({
      url: urlPath // 指定页面的url
    });

  }
})