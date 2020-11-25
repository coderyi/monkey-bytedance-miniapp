// pages/users/users.js

import monkeyApi from '../../common/api.js';

Page({
  data: {
    rows: [],
    page: 1,
    currentLanguage: 'JavaScript',
    refreshing: false,
    loadinging: false,
  },
  onReachBottom() {
    console.log('onReachBottom')
    this.loadMore();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onLoad: function (options) {
    
    this.loadData();
  },
  onShow: function () {
    // Do something when page show.
    this.loadData();
  },
  loadData: function () {
    let language= tt.getStorageSync('rep-language');
    if (language) {
      this.setData({
        currentLanguage: language
      });
    }
    this.requestData();
  }, 
  loadMore() {
    if (this.data.loading) {
      return;
    }
    let self = this;
    let nextPage = self.data.page + 1;
    this.setData({
      loading: true,
      page: nextPage
    });
    
    this.requestData(function (res) {
      console.log('loadData' + self.data.loading);
      self.setData({
        loading: false,
      });
    });
  },
  requestData: function (callback){
    var me = this;
    monkeyApi.requestRepRank(me.data.currentLanguage,me.data.page).then(function(data){
      if (me.data.page > 1) {
        let nextRows = me.data.rows;
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          nextRows.push(item);
        }
        me.setData({rows: nextRows});

      } else {
        me.setData({rows: data});
      }

      if (callback) {
        callback(true);
      }
    })
  },
  toLanguage: function () {
    tt.navigateTo({
      url: `/pages/language/language?from=rep`
    });
  },
  onClickCell: function (event) {
    var index = event.currentTarget.dataset.index;

    let urlPath = '/pages/rep-detail/rep-detail' +'?rep_login='+this.data.rows[index].owner.login+'&rep_avatar_url='+encodeURIComponent(this.data.rows[index].owner.avatar_url)+'&rep_name='+this.data.rows[index].name+'&rep_created_at='+this.data.rows[index].created_at+'&rep_description='+encodeURIComponent(this.data.rows[index].description);
    if (this.data.rows[index].homepage) {
      urlPath = urlPath+'&rep_homepage='+this.data.rows[index].homepage
    }
    tt.navigateTo({
      url: urlPath
    });
  }
})