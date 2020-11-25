// pages/language/language.js
Page({
  data: {
    rows: [
      {name: 'All language'},
      {name: 'JavaScript'},
      {name: 'Java'},
      {name: 'PHP'},
      {name: 'Ruby'},
      {name: 'Python'},
      {name: 'CSS'},
      {name: 'C'},
      {name: 'CPP'},
      {name: 'Objective-C'},
      {name: 'Swift'},
      {name: 'Shell'},
      {name: 'R'},
      {name: 'Perl'},
      {name: 'Lua'},
      {name: 'HTML'},
      {name: 'Scala'},
      {name: 'Go'}
    ],
    source: ''
  },
  onLoad: function (options) {
    console.log('language')
    let fromParam = options?options.from:null;
    if (fromParam) {
      this.setData({source: fromParam});
    }
  },
  onClickCell: function (event) {
    var index = event.currentTarget.dataset.index;

    var isRep = this.data.source;
    if (isRep === 'rep') {
      if (index > 0) {
        tt.setStorageSync('rep-language', this.data.rows[index].name);
        tt.navigateBack();
      }
    }else {
      tt.setStorageSync('language', this.data.rows[index].name);
      tt.navigateBack();
    }
  }
})