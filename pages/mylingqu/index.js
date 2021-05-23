// pages/mylingqu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shiju:[],
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const a=this;
    wx.getStorage({
      key:"userInfo",
      success(res){
        a.setData({
          userInfo:res.data
        })
      },
      fail(res){
        wx.showToast({
          title: '请先前往“我的”登录',
          mask:true
        })
      }
    });

    const db=wx.cloud.database();
    
    wx.getStorage({
      key:'openid',
      success(res){
        console.log(res.data);
        db.collection('lost').where({
          lingquren:res.data
        }).get({
          success:function(res1){
            var rrrr=res1;
            a.setData({
              shiju:rrrr
            })
            console.log(res1)
          }
        })
      }
    })
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

  },

  chuandi(e){
    console.log(e.currentTarget.dataset.itt);
    var itt=e.currentTarget.dataset.itt;
    wx.cloud.getTempFileURL({
      fileList:itt.fileid,
      success:res=>{
        console.log(res.fileList);
        wx.setStorageSync('ls', res.fileList);
      }
    })
  }
})