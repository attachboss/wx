// pages/me/me.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfoList: {     //商品信息
     first: [{
        icon: '../../statics/coupon.png',
        text: '账户余额',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
      {
        icon: '../../statics/welfare.png',
        text: '福利社',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
      {
        icon: '../../statics/friend.png',
        text: '加入志愿者',
        alreadRead: false,
        unreadNum: 0,
        mes: "+18335952110",
      }, ],

     second:[
       {
        icon: '../../statics/yinhangka.png',
        text: '银行卡',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
      {
        icon: '../../statics/dianziquan.png',
        text: '电子券',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
      {
        icon: '../../statics/lipinka.png',
        text: '礼品卡',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      },
      {
        icon: '../../statics/duihuan.png',
        text: '兑换优惠码',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
      {
        icon: '../../statics/kefu.png',
        text: '客服电话',
        alreadRead: false,
        unreadNum: 0,
        mes: "18259952663",
      }, 
      {
        icon: '../../statics/pingjia.png',
        text: '评价',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
    ],
    third: [
      {
        icon: '../../statics/mendian.png',
        text: '加入店铺',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
      {
        icon: '../../statics/shezhi.png',
        text: '设置',
        alreadRead: false,
        unreadNum: 0,
        mes: "",
      }, 
    ]
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据

    // console.log(app.globalData.userInfo);
    if (!app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else {
      console.log("failed");
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log("首次从global对象获取失败");
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  //button按钮 设置bindgetuserinfo可以加载用户信息  现在没加
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.data.userInfo);
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
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