// components/nav-bar/nav-bar.js
Component({
  data: {
    platform: 'ios'
  },
  properties: {
    showBack: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    rightTitle: {
      type: String,
      required: false
    },
    leftTitle: {
      type: String,
      required: false
    }
  },
  methods: {
    onBack () {
      tt.navigateBack();
    },
    onLeft () {
      this.triggerEvent('onLeft', { })
    },
    onRight () {
      this.triggerEvent('onRight', { })
    }
  }
})