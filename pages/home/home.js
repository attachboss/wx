// pages/home/home.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jurisdiction: -1,
        isEpidemicArea: false,
        swiperImgs: [],
        gridList: [],
        navBarText: ["未处理", "进行中"],
        currentBar: 0,
        destination: [],
        destination_next: [],
        height: 1000,

    },



    //点击切换页面
    switchBar(event) {
        if (event.target.dataset.current == this.data.currentBar) {
            return false;
        } else {
            this.setData({
                currentBar: event.target.dataset.current
            })
        }
    },
    //滑动切换页面
    swiperSwitchBar() {
        this.setData({
            currentBar: (this.data.currentBar == 0 ? 1 : 0)
        })
    },
    //导航到navi页面并传递终点信息
    startNavigate(event) {
        var desid = event.target.dataset.desid
        let endPoint = this.data.destination[desid];
        endPoint = JSON.stringify(endPoint);
        this.getRoute(endPoint);
    },
    getRoute(endPoint) {
        let plugin = requirePlugin('routePlan');
        let key = 'YRRBZ-YH6C4-VPCUV-DZ5UW-C4U3T-Y6FXB';
        let referer = 'wx07fd32edf3bf2140';
        wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        })
    },
    //动态设置页面高度
    setHeight(len) {
        if (len < 3) {
            return false;
        }
        this.setData({
            height: len * 450
        })
    },

    //志愿者点击接单
    receiveOrder(event) {
        var desid = event.target.dataset.desid;
        wx.showModal({
            title: "提示",
            content: "确认要接单吗？",
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: 'http://43.142.31.47:8081/order/update?Oid=' + this.data.destination_next[desid].id,
                        method: "GET",
                        complete: (res) => {
                            this.setData({
                                destination: [],
                                destination_next: []
                            })
                            if (res.data.affectedRows > 0) {
                                wx.showModal({
                                    title: "成功",
                                    content: "接单成功！",
                                })
                            }
                            this.refresh();
                        }
                    })
                } else {
                    console.log("取消接单");
                }
            }
        })
    },


    //向服务器请求订单信息
    refresh() {
        var that = this;
        var results = [],
            results_next = [];
        wx.showLoading({
            title: '加载中...',
        })
        wx.request({
            url: 'http://43.142.31.47:8081/order/query',
            method: "GET",
            success: function (res) {
                for (let index = 0; index < res.data.length; index++) {
                    var {
                        Odestination,
                        ODlat,
                        ODlon,
                        Oid
                    } = res.data[index];
                    if (res.data[index].Ostate == "待处理") {
                        results_next.push({
                            name: Odestination,
                            latitude: ODlat,
                            longitude: ODlon,
                            id: Oid
                        })
                    } else if (res.data[index].Ostate == "进行中") {
                        results.push({
                            name: Odestination,
                            latitude: ODlat,
                            longitude: ODlon,
                            id: Oid
                        })
                    }
                }
                that.setData({
                    destination_next: results_next,
                    destination: results
                });
                that.setHeight(results.length)
            },
            fail: (res) => {
                console.log(res);
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.cloudCheckJuris(app.dataParams.username)
    },

    //在云数据库中查询账户权限  并在页面中加载数据
    cloudCheckJuris(userName) {
        wx.request({
            url: "http://43.142.31.47:8081/Role/GetOne?user=" + userName,
            method: "GET",
            success: (res) => {
                for (let index = 0; index < res.data.length; index++) {
                    if (res.data[index] != null) {
                        this.setData({
                            jurisdiction: res.data[index].Rname == "志愿者" ? 0 : 1
                        })
                        if (this.data.jurisdiction == 0) {
                            //志愿者账户，打开接单页面
                            this.refresh();
                        } else {
                            //用户账户，打开商城页面
                            this.getSwiperImgs();
                        }
                    }

                }
            }
        })
    },

    //从云存储中获取首页轮播图数据
    getSwiperImgs() {
        this.setData({
            swiperImgs: [{
                imgUrl: "../../statics/640.gif",
            }]

        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.refresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})