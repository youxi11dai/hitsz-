// pages/comflictadd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guanli:false,
    shiju:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const a=this;
    const db=wx.cloud.database();

    wx.getStorage({
      key:"openid",
      success(res){
        db.collection('comfilct').where({
          _openid:res.data
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

  reach(){
    wx.navigateTo({
      url: '../comflict/index',
    })
  },
  
  switch(){
    const guanli=this.data.guanli;
    this.setData({
      guanli:!guanli
    })
  },

  shanchu(e){
    let _id=e.target.dataset._id;
    console.log(_id);
    const db=wx.cloud.database();
    db.collection('comfilct').doc(_id).remove({
      success:function(res){
        console.log(res.data);
        wx.navigateTo({
          url: '../comfilctadd/index',
        })
      }
    })
  }
})