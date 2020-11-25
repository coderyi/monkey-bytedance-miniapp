// pages/users/users.js
import monkeyApi from '../../common/api.js';

Page({
  data: {
    rows:[],
    // rows:[{avatar_url:"https://vuejs.org/images/logo.png",login:"hello1"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world"},
    //   {avatar_url:"https://vuejs.org/images/logo.png",login:"hello3"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world"},
    //   {avatar_url:"https://vuejs.org/images/logo.png",login:"hello5"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world"},
    //   {avatar_url:"https://vuejs.org/images/logo.png",login:"hello7"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world8"}],
    worldRows:[],
    worldPage:1,
    countryRows:[],
    countryPage:1,
    cityRows:[],
    cityPage:1,
    currentIndex:1,
    lastSelectedIndex: 1,
    currentCity:'Beijing',
    currentCountry:'China',
    currentLanguage:'Objective-C',
    refreshing: false,
    loading: false,
    activeTab: 0,
  },
  onLoad: function (options) {
    this.setData({
      tabPanelsStyle: `margin-left:${this.data.activeTab*-750}rpx`,
      selectedTabStyle: `color:#3D82C7`
    });
    this.loadData();
  },
  onShow: function () {
    // Do something when page show.
    console.log('onShow')
    this.loadData();
  },
  onReachBottom() {
    console.log('onReachBottom')
    this.onLoading();
  },
  async loadData() {
    var isDiffData = false;
    var cityData = tt.getStorageSync('city');
     
    if (cityData && this.data.currentCity !== cityData) {
      isDiffData = true;
    }
    if (cityData && cityData != 'undefined') {
      // this.currentCity = cityData;
      this.setData({
        currentCity: cityData
      })
    }
    var countryData = tt.getStorageSync('country');
    if (this.data.currentCountry !== countryData) {
      isDiffData = true;
    }
    if (countryData && countryData != 'undefined') {
      // this.currentCountry = countryData;
      this.setData({
        currentCountry: countryData
      })
    }
    var languageData = tt.getStorageSync('language');;
    if (this.data.currentLanguage !== languageData) {
      isDiffData = true;
    }
    if (languageData && languageData != 'undefined') {
      // this.currentLanguage = languageData;
      this.setData({
        currentLanguage: languageData
      })
    }
    if (isDiffData) {
      this.requestData(function(state) {
      });
    }
  },
  clickTab: function(event) {
    // this.activeTab = i
    var i = event.currentTarget.dataset.index;

    this.setData({
      activeTab: i,
      tabPanelsStyle: `margin-left:${i*-750}rpx`
    })
    
    console.log('this.activeTab'+this.data.activeTab)
    this.onClickSegment(i + 1);
  },
  onClickRightItem:function(e) {
    tt.navigateTo({
      url: `/pages/language/language`
    });
  },
  onClickLeftItem:function(e) {
    tt.navigateTo({
      url: `/pages/country/country`
    });
  },
  onClickSegment : function (index) {
    var vm = this;
    vm.data.currentIndex = index ;
    if (vm.data.currentIndex === vm.data.lastSelectedIndex) {
      return;
    }
    // vm.lastSelectedIndex = index;
    this.setData({
      lastSelectedIndex: index
    })
    if (index === 1) {
      if (vm.data.cityRows.length > 0) {
        // vm.rows = vm.cityRows;
        this.setData({
          rows: vm.data.cityRows
        })
      }else {
        vm.requestData(function(state) {
        });
      }
    }else if (index == 2) {
      if (vm.data.countryRows.length > 0) {
        // vm.rows = vm.countryRows;
        this.setData({
          rows: vm.data.countryRows
        })
      }else {
        vm.requestData(function(state) {
        });
      }
    }else {
      if (vm.data.worldRows.length > 0) {
        // vm.rows = vm.worldRows;
        this.setData({
          rows: vm.data.worldRows
        })
      }else {
        vm.requestData(function(state) {
        });
      }
    }
  },
  onLoading: function () {
    var vm = this;
    // vm.data.loadinging = true;
    this.setData({
      loading: true
    })
    if (vm.data.currentIndex === 1) {
      let nextCityPage = vm.data.cityPage + 1;
      this.setData({
        cityPage: nextCityPage
      })
    } else if (vm.data.currentIndex === 2) {
      // vm.countryPage = vm.countryPage + 1;
      let nextCountryPage = vm.data.countryPage + 1;
      this.setData({
        countryPage: nextCountryPage
      })
    } else {
      // vm.worldPage = vm.worldPage + 1;
      let nextWorldPage = vm.data.worldPage + 1;
      this.setData({
        worldPage: nextWorldPage
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
      // vm.cityPage = 1;
      this.setData({
        cityPage: 1
      })
    } else if (vm.currentIndex === 2){
      // vm.countryPage = 1;
      this.setData({
        countryPage: 1
      })
    } else {
      // vm.worldPage = 1;
      this.setData({
        worldPage: 1
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

    let urlPath = '/pages/user-detail/user-detail' + '?login=' + this.data.rows[index].login + '&avataUrl=' + encodeURIComponent(this.data.rows[index].avatar_url)
    tt.navigateTo({
      url: urlPath
    });
  },
  requestData:function (callback){
    var me = this;
    var location = me.data.currentCity;
    var pageNum;
    if (me.data.currentIndex === 1) {
      if (!me.data.currentCity) {
        // me.currentCity = 'Beijing'
        me.setData({
          currentCity: 'Beijing'
        })
      }
      location = me.data.currentCity;
      pageNum = me.data.cityPage;
    } else if (me.data.currentIndex === 2) {
      if (!me.data.currentCountry) {
        // me.currentCountry = 'China'
        me.setData({
          currentCountry: 'China'
        })
      }
      location = me.data.currentCountry;
      pageNum = me.data.countryPage;
    } else {
      location = 'World';
      pageNum = me.data.worldPage;
    }
    if (!me.data.currentLanguage) {
      // me.currentLanguage = 'JavaScript';
        me.setData({
          currentLanguage: 'JavaScript'
        })
    }
    monkeyApi.requestUserRank(me.data.currentLanguage, location, pageNum, function(data) {
      if (me.data.currentIndex === 1) {
        if (me.data.cityPage > 1) {
          let nextCityRows = me.data.cityRows;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextCityRows.push(item);
          }
          me.setData({
            cityRows: nextCityRows
          })
        }else{
          // me.cityRows = data;
          me.setData({
            cityRows: data
          })
        }
        // me.rows = me.cityRows;
        me.setData({
          rows: me.data.cityRows
        })
        // modal.toast({
        //   message: '加载数据成功'
        // })
      } else if (me.data.currentIndex === 2) {
        if (me.data.countryPage > 1) {
          let nextCountryRows = me.data.countryRows;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextCountryRows.push(item);
          }
          me.setData({
            countryRows: nextCountryRows
          })
        } else {
          // me.countryRows = data;
          me.setData({
            countryRows: data
          })
        }
        // me.rows = me.countryRows;
        me.setData({
          rows: me.data.countryRows
        })
      }else {
        if (me.data.worldPage > 1) {
          let nextWorldRows = me.data.worldRows;

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            nextWorldRows.push(item);
          }
          me.setData({
            worldRows: me.data.worldRows
          })
        } else {
          // me.worldRows = data;
          me.setData({
            worldRows: data
          })
        }
        // me.rows = me.worldRows;
        me.setData({
          rows: me.data.worldRows
        })
      }
      callback(true);
    })
  }
})