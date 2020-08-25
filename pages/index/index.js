//index.js
//获取应用实例
const app = getApp()

Page({
  onTap:function(){
    // wx.navigateTo({
    //   url: '../welcome/welcome',
    // })
    wx.redirectTo({
      url: '../welcome/welcome',
    })
  }
})
