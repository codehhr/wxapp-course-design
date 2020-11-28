//logs.js

Page({
  data: {
    recordList: []
  },
  // onShow() 每次打开页面都会调用一次
  onShow: function (options) {
    this.setData({
      recordList: wx.getStorageSync('record')
    })
    console.log(this.data.recordList)
  },
  // 清空记录
  cleanRcord() {
    wx.setStorageSync('record', [])
    this.setData({
      record: wx.getStorageSync('record')
    })
  }
})