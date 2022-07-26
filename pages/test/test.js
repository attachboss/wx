// pages/test/test.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude: 103.985,
        latitude: 30.765,
        scale: 13,
        markers: [{
            id: 1,
            longitude: 103.985,
            latitude: 30.765,
            name: "",
            description: "",
            iconPath: "",
            width: 40,
            height: 40,
        }],
        isPopup: false,
        clickId: 0,
        popupContent: {},


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getLocation({
            type: "wgs84",
            success: (res) => {
                this.setData({
                    longitude: res.longitude,
                    latitude: res.latitude
                })
            }
        });
        this.GetLocationArray();
    },
    GetLocationArray() {
        wx.request({
            url: 'http://43.142.31.47:8081/epidemicArea/query',
            method: "GET",
            success: (res) => {
                for (let index = 0; index < res.data.length; index++) {
                    var {
                        name,
                        latitude,
                        longitude,
                        description
                    } = res.data[index];
                    this.data.markers[index] = {
                        id: index,
                        name: name,
                        latitude: latitude,
                        longitude: longitude,
                        description: description,
                        iconPath: "../../statics/epidemicArea.png",
                        width: 40,
                        height: 40
                    }
                }
                this.drawLocation(this.data.markers);
            }
        })
    },

    drawLocation(obj) {
        this.wxc = wx.createMapContext("indexMap");
        this.wxc.addMarkers({
            markers: obj
        });
    },

    bindmarkertap(e) {
        this.setData({
            clickId: e.detail.markerId,
            isPopup: true,
            popupContent: this.data.markers[e.detail.markerId],
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


})