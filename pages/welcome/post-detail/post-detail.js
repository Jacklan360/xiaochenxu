// pages/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
Page({
  data:{
    isPlayIngMusic:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    // this.data.postData = postData;
    this.setData({
      postData: postData
    })
  
    // var postsCollected = {
    //   1:true
    // }
    var postsCollected = wx.getStorageSync('posts_collected');
    if(postsCollected){
      var postCollected = postsCollected[postId]
      this.setData({
        collected:postCollected
      })
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    var that = this;
    wx.onBackgroundAudioPlay(function(){
      console.log('开始')
      that.setData({
        isPlayIngMusic:true
      })
    })
    wx.onBackgroundAudioPause(function(){
      console.log('结束')
      that.setData({
        isPlayIngMusic:false
      })
    })
    wx.onBackgroundAudioStop(function () {
      console.log('结束了')
      that.setData({
          isPlayingMusic: false
      })
  });
  },

  onColletionTap:function(event){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否收藏的缓存
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，实现切换图片
    this.setData({
      collected:postCollected
    })
    wx.showToast({
      title: postCollected?'收藏成功':'取消成功',
    })
  },

  onSharTap:function(event){
    
  },

  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var isPlayIngMusic = this.data.isPlayIngMusic;
    var postData = postsData.postList[currentPostId].music
    if(isPlayIngMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayIngMusic:false
      })
    
    }else{
      wx.playBackgroundAudio({
        dataUrl:postData.url,
        title:postData.title,
        coverImgUrl:postData.coverImg
      })
      this.setData({
        isPlayIngMusic:true
      })
    }

    
    
  },

  setMusicMonitor:function(){
    // wx.onBackgroundAudioStop(function(){
    //   console.log("音乐停止")
    //   var i = 0;
    // })

    // wx.onBackgroundAudioPause(function(){
    //   console.log("音乐开始");
    //   var y = 20;
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})