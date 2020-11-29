//logs.js

Page({
  data: {
    recordList: [],
    hadrecord: false
  },
  // onShow() 每次打开页面都会调用一次
  onShow: function (options) {
    this.setData({
      recordList: wx.getStorageSync('record')
    })
    if (this.data.recordList.length > 0) {
      this.setData({
        hadrecord: true
      })
      return;
    }
  },
  // 清空记录
  cleanRecord() {
    let that = this
    if (this.data.recordList.length == 0) {
      wx.showToast({
        title: '您还没有任何记录',
        icon: "none",
        duration: 1500
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "这将清空所有记录",
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync('record', [])
            that.setData({
              recordList: wx.getStorageSync('record')
            })
          } else {}
        }
      })
      this.setData({
        hadrecord: false
      })
    }
  }
  //
})