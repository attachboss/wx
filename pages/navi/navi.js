// pages/test/test.js
var QQMapWX = require("../../tool/qqmap-wx-jssdk.min.js");
var qqmapsdk = new QQMapWX({
    key: "YRRBZ-YH6C4-VPCUV-DZ5UW-C4U3T-Y6FXB"
})
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userPos: {
            longitude: 103.985,
            latitude: 30.765,
        },
        destiPos: {
            longitude: 103.985,
            latitude: 30.765,
        },
        scale: 13,
        markers: [{
            id: 1,
            longitude: 103.985,
            latitude: 30.765,
            name: 'rnm+',
            description: "",
            iconPath: "../../statics/location-red.png"
        }],
        isPopup: false,
        clickId: 0,
        popupContent: {},
        showSearchBar: false,
        keyword: "",
        backFill: "",
        suggestion: {},
    },
    regionchange(e) {
        //console.log(e)
    },
    markertap(e) {
        this.setData({
            clickId: e.detail.markerId,
            isPopup: true,
            showSearchBar: false,
            popupContent: this.data.markers[e.detail.markerId],
            destiPos: {
                latitude: this.data.markers[e.detail.markerId].latitude,
                longitude: this.data.markers[e.detail.markerId].longitude,
            }
        })
    },
    closePopup() {
        this.setData({
            isPopup: false
        })

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.GetLocationArray(options.part)
        var that = this;
        wx.getLocation({
            type: "wgs84",
            success: function (res) {
                that.setData({
                    userPos: {
                        longitude: res.longitude,
                        latitude: res.latitude
                    }
                })
            }
        });
    },

    getResult(e) {
        qqmapsdk.getSuggestion({
            keyword: e.detail.value,
            region: "成都市",
            page_size: 5,
            success: (res) => {
                let suggestion = [];
                for (let i = 0; i < res.data.length; i++) {
                    suggestion.push({
                        title: res.data[i].title,
                        id: res.data[i].id,
                        addr: res.data[i].address,
                        city: res.data[i].city,
                        district: res.data[i].district,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng
                    })
                    this.setData({
                        keyword: e.detail.value,
                        showSearchBar: true,
                        isPopup: false,
                        suggestion: suggestion,
                    })
                }
            },
            fail: (res) => {
                console.log(res);
            }
        })
    },
    tapFill(e) {
        this.setData({
            showSearchBar: true,
        });
        let id = e.currentTarget.id;
        for (let index = 0; index < this.data.suggestion.length; index++) {
            if (id == index) {
                this.setData({
                    backFill: this.data.suggestion[index].addr,
                    destiPos: {
                        latitude: this.data.suggestion[index].latitude,
                        longitude: this.data.suggestion[index].longitude,
                    },
                    scale: 15,
                    showSearchBar: false,
                })
                this.nearbySearch();
                return;
            }

        }

    },
    nearbySearch() {
        qqmapsdk.search({
            keyword: this.data.keyword,
            location: this.data.destiPos.latitude + ',' + this.data.destiPos.longitude,
            region: "成都市",
            pageSize: 5,
            pageIndex: 1,
            success: (res) => {
                var sug = [];
                for (var index = 0; index < res.data.length; index++) {
                    sug.push({
                        title: res.data[index].title,
                        id: res.data[index].id,
                        addr: res.data[index].address,
                        province: res.data[index].ad_info.province,
                        city: res.data[index].ad_info.city,
                        district: res.data[index].ad_info.district,
                        latitude: res.data[index].location.lat,
                        longitude: res.data[index].location.lng
                    });
                    var wxc = wx.createMapContext("mapView");
                    wxc.addGroundOverlay({
                        id: index,
                        src: "../../statics/location-red.png",
                        bounds: {
                            southwest: {
                                latitude: sug[index].latitude,
                                longitude: sug[index].longitude
                            },
                            northeast: {
                                latitude: sug[index].latitude + 0.001,
                                longitude: sug[index].longitude + 0.001
                            }
                        }
                    })
                }
                this.setData({
                    // selectedId: 0,
                    // nearList: sug,
                    suggestion: sug
                });
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    GetLocationArray(option) {
        wx.request({
            url: 'http://43.142.31.47:8081/' + option + '/query',
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
                        iconPath: "../../statics/" + option + ".png",
                        width: 40,
                        height: 40
                    }
                }
                this.drawLocation(this.data.markers);
            }
        })
    },

    drawLocation(obj) {
        this.wxc = wx.createMapContext("mapView");
        this.wxc.addMarkers({
            markers: obj
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.drawLocation(this.data.markers);
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