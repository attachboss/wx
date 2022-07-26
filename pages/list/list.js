// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        list: [],
        page: 1,
        pageSize: 10,
        totalPage: 0,
        isLoading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //动态设置list页面的标题
        this.setData({
            query: options,
        });
        this.getList()
    },

    getList(callback){
        this.data.isLoading = true;
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
            url: `http://43.142.31.47:8081/epidemicArea/query`,
            methods: "GET",
            // data:{
            //     _page: this.data.page,
            //     _limit: this.data.pageSize
            // },
            success: (res) => {
                this.setData({
                    list: [...this.data.list, ...res.data],
                    //减零是因为返回的是字符串类型
                    //total: res.header["X-Total-Count"] - 0
                });
            },
            complete: () => {
                wx.hideLoading({});
                this.setData({
                    isLoading: false
                });
                //当存在回调函数的参数时(即没有进行上拉触底刷新时)，执行回调关闭下拉刷新窗口
                callback && callback()
            }
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
        this.setData({
            page:1,
            list:[],
            total:0
        });
        this.getList(() => {
            wx.stopPullDownRefresh({});
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.page * this.pageSize >= this.data.total) {
            return wx.showToast({
              title: '没有更多了😅',
              icon:'none'
            })
        }
        if (this.data.isLoading) {
            return;
        }
        this.setData({
            page: this.data.page + 1
        });
        this.getList();  
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})