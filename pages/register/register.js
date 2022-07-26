// pages/zhuce/zhuce.js
// pages/zhuce/zhuce.js
let username=''
let password=''
let password1=''
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onReady: function () {

  },
  //获取输入值
  username(e){
    username=e.detail.value
  },
  password(e){
    password=e.detail.value
  },
  password1(e){
    password1=e.detail.value
  },
  goZhuce(){
    if(username==''){
      wx.showToast({
        icon:'error',
        title: '学号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'error',
        title: '密码不能为空',
      })
    }else if(password!==password1){
      wx.showToast({
        icon:'error',
        title: '密码前后不一致',
      })
    }else{
      wx.cloud.database().collection('user').add({
        data:{
          username:username,
          password:password
        }
      })
      wx.showToast({
        icon:'success',
        title: '注册成功',
      })
      wx.switchTab({
        url: '/pages/me/me',
      })
    }
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
})

