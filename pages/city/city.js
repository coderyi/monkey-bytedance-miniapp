// pages/city/city.js
Page({
  data: {
    rows: [],
    datas: [
      [{name:"San Francisco"},{name:"New York"},{name:"Seattle"},{name:"Chicago"},{name:"Los Angeles"},{name:"Boston"},{name:"Washington"},{name:"San Diego"},{name:"San Jose"},{name:"Philadelphia"}],
      [{name:"London"},{name:"Cambridge"},{name:"Manchester"},{name:"Edinburgh"},{name:"Bristol"},{name:"Birmingham"},{name:"Glasgow"},{name:"Oxford"},{name:"Newcastle"},{name:"Leeds"}],
      [{name:"Berlin"},{name:"Munich"},{name:"Hamburg"},{name:"Cologne"},{name:"Stuttgart"},{name:"Dresden"},{name:"Leipzig"}],
      [{name:"Beijing"},{name:"Shanghai"},{name:"Shenzhen"},{name:"Hangzhou"},{name:"Guangzhou"},{name:"Chengdu"},{name:"Nanjing"},{name:"Wuhan"},{name:"Suzhou"},{name:"Xiamen"},{name:"Tianjin"},{name:"Chongqing"},{name:"Changsha"}],
      [{name:"Toronto"},{name:"Vancouver"},{name:"Montreal"},{name:"ottawa"},{name:"Calgary"},{name:"Quebec"}],
      [{name:"Chennai"},{name:"Pune"},{name:"Hyderabad"},{name:"Mumbai"},{name:"New Delhi"},{name:"Noida"},{name:"Ahmedabad"},{name:"Gurgaon"},{name:"Kolkata"}],
      [{name:"paris"},{name:"Lyon"},{name:"Toulouse"},{name:"Nantes"}],
      [{name:"sydney"},{name:"Melbourne"},{name:"Brisbane"},{name:"Perth"}],
      [{name:"Tokyo"},{name:"Moscow"},{name:"Singapore"},{name:"Seoul"}]
    ]
  },
  onLoad: function (options) {
    var me = this;
    let countryIndexParam = options.countryIndex;
    if (countryIndexParam > -1) {
      let dataRows = me.data.datas[countryIndexParam];
      this.setData({
        rows: dataRows
      });
    }
  },
  onClickCell: function (event) {
    var index = event.currentTarget.dataset.index;

    var cityName = this.data.rows[index].name

    tt.setStorageSync('city', cityName);
    tt.navigateBack();
  }
})