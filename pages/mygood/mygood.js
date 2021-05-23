// pages/mygood/mygood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gan:[],
    lingqu:false,
    name:'',
    conversation:'',
    description:'',
    _id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const a=this
    wx.getStorage({
      key:'ls',
      success(res){
        a.setData({
            gan:res,
            name:options.name,
            conversation:options.conversation,
            description:options.description,
            _id:options._id,
            lingqu:options.lingqu
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

  }
})