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
    shifou:false,
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
    var tupian=0;
    //获取数据
    const db=wx.cloud.database();
    const name=this.data.name;
    const description=this.data.description;
    const conversation=this.data.conversation;
    const shifou=this.data.shifou;
    const {scimg}=this.data;
    const a=this;
    
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
    if(scimg.length == 0){
      wx.showToast({
        title: '请上传至少一张图片',
        icon:'none',
        mask:true
      });
      return;
    }

    wx.showLoading({
      title:"正在上传",
      mask:true
    })
    
    db.collection('lost').add({
      data:{
        name:name,
        description:description,
        conversation:conversation,
        shifou:shifou,
        lingqu:false,
        fileid:[],
        sousuo:description+conversation+name,
        gan:[],
        lingquzhe:''
      },success:function(res1){
        console.log(res1);
        scimg.forEach((v,i)=>{
          const cloudpath='lost'+timestamp;
          wx.cloud.uploadFile({
            cloudPath:cloudpath+i,
            filePath:scimg[i],
            success:(res2)=>{
              console.log(res2);
              db.collection('lost').where({
                _id:res1._id
              }).update({
                data:{
                  fileid:db.command.push(res2.fileID)
                },success:function(res3){
                  console.log(res);
                }
              })
            },
            fail:(err)=>{
              wx.showToast({
                title: '上传失败',
                icon:'none',
                mask:true
              })

              a.setData({
                scimg:[],
                name:'',
                description:'',
                conversation:'',
                shifou:false,
              })

              return;
            }
          })
        })
      }
    })

    wx.hideLoading();

    a.setData({
      scimg:[],
      name:'',
      description:'',
      conversation:'',
      shifou:false,
    })

    wx.redirectTo({
      url: '../myshangchuan/index',
    })
  }
})