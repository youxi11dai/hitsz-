// pages/xiugai/xiugai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    xuehao:'',
    beizhu:'',
    userinfo:[],
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  idinput(e){
    this.setData({
      id:e.detail.value
    })
  },

  beizhuinput(e){
    this.setData({
      beizhu:e.detail.value
    })
  },

  xuehaoinput(e){
    this.setData({
      xuehao:e.detail.value
    })
  },

  tijiao(){
    const db=wx.cloud.database();
    const a=this;

    wx.getStorage({
      key:"openid",
      success(res){
        console.log(res);
        db.collection('information').where({
          _openid:res.data
        }).update({
          data:{
            id:a.data.id,
            beizhu:a.data.beizhu,
            xuehao:a.data.xuehao
          },
          success:function (res1) {
            console.log(res1);
            wx.removeStorage({
              key: 'id',
              success(res2){
                wx.removeStorage({
                  key: 'xuehao',
                  success(res3){
                    wx.removeStorage({
                      key: 'beizhu',
                      success(res4){
                        wx.setStorageSync('id', a.data.id);
                        wx.setStorageSync('xuehao', a.data.xuehao);
                        wx.setStorageSync('beizhu', a.data.beizhu);
                        wx.redirectTo({
                          url: '../myimformation/index',
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})