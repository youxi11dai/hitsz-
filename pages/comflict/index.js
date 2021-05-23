// pages/comflict/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        img: [],
        userInfo:[],
        textvar: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        const a=this;
        wx.getStorage({
            key:'userInfo',
            success(res){
                console.log(res.data)
                a.setData({
                    userInfo:res.data,
                })
            },
            fail(res){
                wx.showToast({
                  title: '请先前往”我的“界面登录',
                  mask:true
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    handleTextInput(e) {
        this.setData({
            textvar: e.detail.value
        })
    },

    handleChooseImg(e) {
        wx: wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                this.setData({
                    img: [...this.data.img, ...result.tempFilePaths]
                })
            }
        })
    },

    deletephoto(e) {
        const { index } = e.currentTarget.dataset;
        let { img } = this.data;
        img.splice(index, 1);
        this.setData({
            img
        })
    },

    handlesubmit(e) {
        const { textvar, img } = this.data;
        const db=wx.cloud.database();
        const  userInfo=this.data.userInfo;
        var timestamp = Date.parse(new Date());

        if (!textvar.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                mask: true
            });
            return;
        }

        wx.showLoading({
            title: "正在上传中",
            mask: true
        });

        db.collection('comfilct').add({
            data:{
                userInfo:userInfo,
                textvar:textvar,
                fileid:[],
                fankui:false,
                huifu:'',
                gan:[]
            },success:function(res){
                if (img.length != 0) {
                    img.forEach((v, i) => {
                        console.log(i);
                        const cloudpath = 'complict' +' '+timestamp;
                        wx.cloud.uploadFile({
                            cloudPath: cloudpath + i,
                            filePath: img[i],
                            success: (res1) => {
                                console.log(res1);
                                
                                db.collection('comfilct').where({
                                    _id:res._id
                                }).update({
                                    data:{
                                        fileid:db.command.push(res1.fileID)
                                    }
                                })

                                if (i == img.length - 1) {
                                    wx.hideLoading();
        
                                    this.setData({
                                        img: [],
                                        textvar: ''
                                    })
        
                                    wx.redirectTo({
                                      url: '../comflictadd/index',
                                    })
                                }
                            },fail:(res1)=>{
                                wx.hideLoading();
                                wx.showToast({
                                    title: '上传失败',
                                    icon:'none',
                                    mask:true
                                  })
                                  this.setData({
                                      img: [],
                                      textvar: ''
                                  })
                                  wx.redirectTo({
                                      url: '../comflictadd/index',
                                  })
                            }
                        })
                    })
                } else {
                    wx.hideLoading();
                    this.setData({
                        img: [],
                        textvar: ''
                    })
                    wx.redirectTo({
                        url: '../comflictadd/index',
                      })
                }
            },fail:function(res){
                wx.hideLoading();
                wx.showToast({
                  title: '上传失败',
                  icon:'none',
                  mask:true
                })
                this.setData({
                    img: [],
                    textvar: ''
                })
                wx.redirectTo({
                    url: '../comflictadd/index',
                })
            }
        })
    }
})