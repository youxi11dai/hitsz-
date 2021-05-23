// pages/wod/wod.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const a=this;
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../comflict/index',
      })
      wx.showToast({
        title: '无法使用云函数',
        icon:'none',
        mask:true
      })
      return;
    }
    wx.getStorage({
      key:"userInfo",
      success(res){
        a.setData({
          userInfo:res.data
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

  information(){
    wx.navigateTo({
      url: '../myimformation/index',
    })
  },

  onsc(){
    wx.navigateTo({
      url: '../myshangchuan/index',
    })
  },
  
  onlingqu(){
    wx.navigateTo({
      url: '../mylingqu/index',
    })
  },
  
  oncomflict(){
    wx.navigateTo({
      url: '../comflictadd/index',
    })
  },

  getUserProfile(e){
    const db=wx.cloud.database('information');

    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        this.setData({
          userInfo: res.userInfo
        })
        wx.setStorageSync('userInfo', res.userInfo);
        wx.cloud.callFunction({
          name:'openid',
          complete:res1=>{
            this.setData({
              openid:res1.result.openid
            })
            wx.setStorageSync('openid', res1.result.openid);
    
            db.collection('information').where({
              _openid:res1.result.openid
            }).count({
              success:res2=>{
                console.log(res2);
                if(res2.total==0){
                  db.collection('information').add({
                    data:{
                      userInfo:res.userInfo,
                      id:'',
                      xuehao:'',
                      beizhu:''
                    },
                    success:function(res3){
                      console.log(res3);
                      wx.setStorageSync('id', res3.id);
                      wx.setStorageSync('xuehao', res3.xuehao);
                      wx.setStorageSync('beizhu', res3.beizhu);
                    }
                  })
                }
                else if(res2.total==1){
                  db.collection('information').where({
                    _openid:res1.result.openid
                  }).get({
                    success:res4=>{
                      wx.setStorageSync('id', res4.data[0].id);
                      wx.setStorageSync('xuehao', res4.data[0].xuehao);
                      wx.setStorageSync('beizhu', res4.data[0].beizhu);
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  }
})