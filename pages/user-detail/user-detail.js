// pages/user-detail/user-detail.js
import monkeyApi from '../../common/api.js';

Page({
  data: {
    user_login: 'mattt',
    user_avatar_url: '',
    userdetail: '',
    rows: [],
    page3Rows: [],
    page3: 1,
    page2Rows: [],
    page2: 1,
    page1Rows: [],
    page1: 1,
    currentIndex: 1,
    lastSelectedIndex: 1,
    refreshing: false,
    loading: false,
    activeTab: 0
  },
  onLoad: function (options) {
     this.setData({
      tabPanelsStyle: `margin-left:${this.data.activeTab*-750}rpx`,
      selectedTabStyle: `color:#3D82C7`
    });
    var me = this;
    let loginParam = options?options.login:null;
    if (loginParam) {
      this.setData({user_login: loginParam});
    }
    let avatarParam = options?options.avataUrl:null;
    if (avatarParam) {
      this.setData({user_avatar_url: decodeURIComponent(avatarParam)});
    }
    me.requestDetail(me.data.user_login)
    this.requestData(function(state) {
    });
  },
  onReachBottom() {
    console.log('onReachBottom')
    this.onLoading();
  },
  requestDetail: function (login) {
    var me = this;
    monkeyApi.requestUserDetail(login,function(data){
      data.created_at = data.created_at.substring(0,10)
      me.setData({
        userdetail: data
      })
    })
  },
  onClickBlog: function (e) {

  },
  clickTab(event) {
    var i = event.currentTarget.dataset.index;

    this.setData({
      activeTab: i,
      tabPanelsStyle: `margin-left:${i*-750}rpx`
    })
    // this.activeTab = i
    this.onClickSegment(i+1);
  },
  onClickSegment: function (index) {
    var vm = this;
    // vm.currentIndex = index ;
    vm.setData({
      currentIndex: index
    })
    if (vm.data.currentIndex === vm.data.lastSelectedIndex) {
      return;
    }
    // vm.lastSelectedIndex = index;
    vm.setData({
      lastSelectedIndex: index
    })
    if (index === 1) {
      if (vm.data.page1Rows.length > 0) {
        // vm.rows = vm.page1Rows;
        vm.setData({
          rows: vm.data.page1Rows
        })
      } else {
        vm.requestData(function(state) {
        });
      }
    }else if (index == 2) {
      if (vm.data.page2Rows.length > 0) {
        // vm.rows = vm.page2Rows;
        vm.setData({
          rows: vm.data.page2Rows
        })
      } else {
        vm.requestData(function(state) {
        });
      }
    }else {
      if (vm.data.page3Rows.length > 0) {
        // vm.rows = vm.page3Rows;
        vm.setData({
          rows: vm.data.page3Rows
        })
      } else {
        vm.requestData(function(state) {
        });
      }
    }
  },
  onLoading: function () {
    var vm = this;
    // vm.loadinging = true;
    vm.setData({
      loading: true
    })
    if (vm.data.currentIndex === 1) {
      let nextPage1 = vm.page1 + 1;
      vm.setData({
        page1: nextPage1
      })
    }else if (vm.currentIndex === 2){
      // vm.page2 = vm.page2 + 1;
      let nextPage2 = vm.page2 + 1;
      vm.setData({
        page2: nextPage2
      })
    }else{
      // vm.page3 = vm.page3 + 1;
      let nextPage3 = vm.page3 + 1;
      vm.setData({
        page3: nextPage3
      })
    }
    setTimeout(function () {
      // vm.loadinging = false;
      vm.setData({
        loading: false
      })
    }, 10000)
    vm.requestData(function(state) {
      // vm.loadinging = false;
      vm.setData({
        loading: false
      })
    });
  },
  handleRefresh: function (e) {
    var vm = this;
    // vm.refreshing = true
    vm.setData({
      refreshing: true
    })
    if (vm.currentIndex === 1) {
      // vm.page1 = 1;
      let nextPage1 = 1;
      vm.setData({
        page1: nextPage1
      })
    }else if (vm.currentIndex === 2){
      // vm.page2 = 1;
      let nextPage2 = 1;
      vm.setData({
        page2: nextPage2
      })
    }else {
      // vm.page3 = 1;
      let nextPage3 = 1;
      vm.setData({
        page3: nextPage3
      })
    }
    timer = setInterval(function () {
      // vm.refreshing = false
      vm.setData({
        refreshing: false
      })
    }, 10000)
    vm.requestData(function(state) {
      // vm.refreshing = false
      vm.setData({
        refreshing: false
      })
    });
  },
  onClickCell: function (event) {
    var index = event.currentTarget.dataset.index;
  },
  requestData:function (callback){
    var me = this;
    var pageNum;

    if (me.data.currentIndex === 1) {
      pageNum = me.data.page1;
      monkeyApi.requestUserReps(this.data.user_login, pageNum, function(data){
        if (me.data.page1 > 1) {
          let nextPage1Rows = me.data.page1Rows;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextPage1Rows.push(item);
          }
            me.setData({
            page1Rows: nextPage1Rows
          })
        }else{
          // me.page1Rows = data;
          me.setData({
            page1Rows: data
          })
        }
        // me.rows = me.page1Rows;
        me.setData({
          rows: me.data.page1Rows
        })
        
        callback(true);
      })

    } else if (me.data.currentIndex === 2) {

      pageNum = me.data.page2;
      monkeyApi.requestUserFollowing(this.data.user_login, pageNum, function(data){
        if (me.data.page2 > 1) {
          let nextPage2Rows = me.data.page2Rows;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextPage2Rows.push(item);
          }
          me.setData({
            page2Rows: nextPage2Rows
          })
        } else{
          // me.page2Rows = data;
          me.setData({
            page2Rows: data
          })
        }
        // me.rows = me.page2Rows;
        me.setData({
          rows: me.data.page2Rows
        })
        callback(true);
      })
    } else {
      pageNum = me.data.page3;
      monkeyApi.requestUserFollowers(this.data.user_login, pageNum, function(data){
        if (me.data.page3 > 1) {
          let nextPage3Rows = me.data.page3Rows;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextPage3Rows.push(item);
          }
          me.setData({
            page3Rows: nextPage3Rows
          })
        } else{
          // me.page3Rows = data;
          me.setData({
            page3Rows: data
          })
        }
        // me.rows = me.page3Rows;
          me.setData({
            rows: me.data.page3Rows
          })
        callback(true);
      })
    }
  }
    
})