// pages/myimformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    xuehao:'',
    beizhu:'',
    userInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const a=this;
    const db=wx.cloud.database();
    wx.getStorage({
      key:"userInfo",
      success(res){
        a.setData({
          userInfo:res.data
        })
        wx.getStorage({
          key:'openid',
          success(res1){
            db.collection('information').where({
              _openid:res1.data
            }).get({
              success:function(res2){
                console.log(res2);
                a.setData({
                  id:res2.data[0].id,
                  beizhu:res2.data[0].beizhu,
                  xuehao:res2.data[0].xuehao
                })
              }
            })
          }
        })
      },
      fail(res){
        wx.showToast({
          title: '请先前往“我的”登录',
          mask:true
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

  xiugai(){
    wx.redirectTo({
      url: '../xiugai/xiugai',
    })
  }
})