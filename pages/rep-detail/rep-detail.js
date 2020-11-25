// pages/rep-detail/rep-detail.js
import monkeyApi from '../../common/api.js';

Page({
  data: {
    rep_created_at:'',
    rep_login: '',
    rep_avatar_url: '',
    rep_name: '',
    rep_description: '',
    rep_homepage: '',
    rep_stargazers_count: '',
    rep_forks_count: '',
    rows:[],
    page3Rows:[],
    page3:1,
    page2Rows:[],
    page2:1,
    page1Rows:[],
    page1:1,
    currentIndex:1,
    lastSelectedIndex: 1,
    refreshing: false,
    loading: false,
    activeTab: 0,
  },
  
  onLoad: function (options) {
   
    var me = this;
    this.setData({
      tabPanelsStyle: `margin-left:${me.data.activeTab*-750}rpx`,
      selectedTabStyle: `color:#3D82C7`
    })

    let repCreatedAtParam = options?options.rep_created_at:null;
    if (repCreatedAtParam) {
      repCreatedAtParam = repCreatedAtParam.substring(0,10)
      this.setData({rep_created_at: repCreatedAtParam});
    }
    let repLoginParam = options?options.rep_login:null;
    if (repLoginParam) {
      this.setData({rep_login: repLoginParam});
    }
    let repAvatarUrlParam = options?options.rep_avatar_url:null;
    if (repAvatarUrlParam) {
      this.setData({rep_avatar_url: decodeURIComponent(repAvatarUrlParam)});
    }
    let repNameParam = options?options.rep_name:null;
    if (repNameParam) {
      this.setData({rep_name: repNameParam});
    }
    let repDescriptionParam = options?options.rep_description:null;
    if (repDescriptionParam) {
      this.setData({rep_description: decodeURIComponent(repDescriptionParam)});
    }
    let repHomepageParam = options?options.rep_homepage:null;
    if (repHomepageParam) {
      this.setData({rep_homepage: repHomepageParam});
    }
    this.setData({
      user_login: me.data.rep_login
    })
    this.requestData(function(state) {
    });
  },
  onReachBottom() {
    console.log('onReachBottom')
    this.loadMore();
  },
  onClickUrl: function () {
    
  },
  clickTab: function(event) {
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
    // vm.data.currentIndex = index;
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
          rows: vm.page1Rows
        })
      } else {
        vm.requestData(function(state) {
        });
      }
    } else if (index == 2) {
      if (vm.data.page2Rows.length > 0) {
        // vm.rows = vm.page2Rows;
        vm.setData({
          rows: vm.page2Rows
        })
      }else {
        vm.requestData(function(state) {
        });
      }
    } else {
      if (vm.data.page3Rows.length > 0) {
        // vm.rows = vm.page3Rows;
        vm.setData({
          rows: vm.page3Rows
        })
      } else {
        vm.requestData(function(state) {
        });
      }
    }
  },
  onLoading: function (e) {
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
    } else if (vm.data.currentIndex === 2){
      // vm.page2 = vm.page2 + 1;
      let nextPage2 = vm.page2 + 1;
      vm.setData({
        page2: nextPage2
      })
    } else {
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
    if (vm.data.currentIndex === 1) {
      // vm.page1 = 1;
      vm.setData({
        page1: 1
      })
    }else if (vm.data.currentIndex === 2){
      // vm.page2 = 1;
      vm.setData({
        page2: 1
      })
    }else {
      // vm.page3 = 1;
      vm.setData({
        page3: 1
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

  },
  requestData: function (callback) {
    var me = this;
    var pageNum;
    if (me.data.currentIndex === 1) {
      pageNum = me.data.page1;
      monkeyApi.requestRepoContributors(this.data.user_login, this.data.rep_name, pageNum, function(data){
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
        // modal.toast({
        //   message: '加载数据成功'
        // })
        callback(true);
      })
    }else if (me.data.currentIndex === 2) {

      pageNum = me.data.page2;
      monkeyApi.requestRepoForks(this.data.user_login, this.data.rep_name, pageNum, function(data){
        if (me.data.page2>1) {
          let nextPage2Rows = me.data.page2Rows;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextPage2Rows.push(item);
          }
          me.setData({
            page2Rows: nextPage2Rows
          })
        }else{
          // me.page2Rows=data;
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
    }else{
      pageNum = me.page3;
      monkeyApi.requestRepoStargazers(this.data.user_login,this.data.rep_name,pageNum,function(data){
        if (me.data.page3>1) {
          let nextPage3Rows = me.data.page3Rows;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextPage3Rows.push(item);
          }
          me.setData({
            page3Rows: nextPage3Rows
          })
        }else{
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