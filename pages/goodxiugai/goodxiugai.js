// pages/goodxiugai/goodxiugai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scimg:[],
    name:'',
    fl:[],
    description:'',
    conversation:'',
    shifou:false,
    _id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const db=wx.cloud.database();
    const a=this;

    var _id=options._id;

    a.setData({
      _id:_id
    })

    db.collection('lost').where({
      _id:_id
    }).get({
      success:function(res){
        console.log(res)
        a.setData({
          shifou:res.data[0].shifou,
          conversation:res.data[0].conversation,
          name:res.data[0].name,
          description:res.data[0].description,
          fl:res.data[0].fileid
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
    const fl=this.data.fl;
    const _id=this.data._id;
    const a=this;

    wx.showLoading({
      title:"正在上传",
      mask:true
    })

    if(!scimg.length){
      wx.showToast({
        title: '请至少上传一张图片',
        mask:true,
        icon:'none'
      })

      return;
    }

    db.collection('lost').where({
      _id:_id
    }).update({
      data:{
        conversation:conversation,
        shifou:shifou,
        name:name,
        description:description,
        sousuo:name+description+conversation,
        fileid:[]
      },success:function(res){
        console.log(res);
        wx.cloud.deleteFile({
          fileList:fl,
          success:res1=>{
            scimg.forEach((v,i)=>{
              const cloudpath = 'lost' +' '+timestamp;
              wx.cloud.uploadFile({
                cloudPath:cloudpath+i,
                filePath:scimg[i],
                success:(res2)=>{
                  db.collection('lost').where({
                    _id:_id
                  }).update({
                    data:{
                      fileid:db.command.push(res2.fileID)
                    }
                  })

                  if (i == img.length - 1) {
                    wx.hideLoading();

                    a.setData({
                      scimg:[],
                      name:'',
                      description:'',
                      conversation:'',
                      shifou:false,
                    })

                    wx.redirectTo({
                      url: '../comflictadd/index',
                    })
                  }
                },fail:(res2)=>{
                  wx.hideLoading();
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
                    wx.redirectTo({
                        url: '../comflictadd/index',
                    })
                }
              })
            })
          },fail:res1=>{
            wx.hideLoading();
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
              wx.redirectTo({
                  url: '../comflictadd/index',
              })
          }
        })
      },fail:function(res){
        wx.hideLoading();
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
          wx.redirectTo({
              url: '../comflictadd/index',
          })
      }
    })

    wx.hideLoading()

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