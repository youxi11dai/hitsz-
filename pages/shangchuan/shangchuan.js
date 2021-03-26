// pages/shangchuan/shangchuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scimg:[],
    name:'',
    description:'',
    conversation:'',
    shifou:false
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

  gaininformation1(e){
    this.setData({
      name:e.detail.value
    })
  },

  gaininformation2(e){
    this.setData({
      description:e.detail.value
    })
  },

  gaininformation3(e){
    this.setData({
      conversation:e.detail.value
    })
  },

  shifou(e){
    const shifou=this.data.shifou;
    this.setData({
      shifou:!shifou
    })
  },

  delete(e){
    const {index}=e.currentTarget.dataset;
    let {scimg}=this.data;
    scimg.splice(index,1);
    this.setData({
      scimg
    })
  },

  //选择图片
  handleChooseImg(e){
    wx:wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          scimg:[...this.data.scimg,...result.tempFilePaths]
        })
      }
    })
  },

  tijiao(){
    //设置时间戳
    var timestamp=Date.parse(new Date());

    //获取数据
    const db=wx.cloud.database();
    const name=this.data.name;
    const description=this.data.description;
    const conversation=this.data.conversation;
    const shifou=this.data.shifou;
    const {scimg}=this.data;
    
    //判断物品名称是否为空
    if (!name.trim()) {
      wx.showToast({
        title: '请输入物品名称',
        icon: 'none',
        mask: true
      });
      return;
    }

    //判断联系方式或放置地点是否为空
    if (!conversation.trim()) {
      wx.showToast({
        title: '请输入您的联系方式',
        icon: 'none',
        mask: true
      });
      return;
    }

    //判断上传的图片集合是否为空

    wx.showLoading({
      title:"正在上传",
      mask:true
    })
    
    if(scimg){
      scimg.forEach((v,i)=>{
        const cloudpath='lost'+timestamp;
        wx.cloud.uploadFile({
          cloudPath:cloudpath+i,
          filePath:scimg[i],
          success:(res)=>{
            console.log(res)
          }
        })
      })
    }

    //上传物品的相关信息
    db.collection('lost').add({
      data:{
        name:name,
        description:description,
        conversation:conversation,
        shifou:shifou,
        scimg:scimg
      },
      success:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
          mask:true
        })
        this.setData({
          scimg:[],
          name:'',
          conversation:'',
          description:'',
          shifou:false
        });
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  }
})