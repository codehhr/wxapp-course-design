//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //
  onLoad: function () {},

  // 封面跳转至首页( index -> home )
  switchToTabbar() {
    wx.switchTab({
      url: "/pages/home/home"
    })
  }
})