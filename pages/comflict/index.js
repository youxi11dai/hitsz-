// pages/comflict/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    textvar:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  handleTextInput(e){
    this.setData({
      textvar: e.detail.value
    })
  },

  handleChooseImg(e){
    wx:wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          img:[...this.data.img,...result.tempFilePaths]
        })
      }
    })
  },

  deletephoto(e){
    const {index}=e.currentTarget.dataset;
    let {img}=this.data;
    img.splice(index,1);
    this.setData({
      img
    })
  },

  handlesubmit(e){
    const {textvar,img}=this.data;
    var timestamp = Date.parse(new Date());
    if(!textvar.trim ()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      });
      return;
    }

    wx.showLoading({
      title: "正在上传中",
      mask: true
    });

    if(img.length != 0){
      img.forEach((v,i) =>{
        console.log(i);
        const cloudpath = 'complict'+timestamp;
        wx.cloud.uploadFile({
          cloudPath:cloudpath+i,
          filePath:img[i],
          formData:{textvar},
          success:(result)=>{
            console.log(result);

            if(i==img.length-1){
              wx.hideLoading();

              this.setData({
                img:[],
                textvar:''
              })
              
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      })
    } 
    else{
      wx.hideLoading();
      this.setData({
        img:[],
        textvar:''
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
