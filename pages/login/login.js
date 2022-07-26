// pages/login/login.js
import md5 from "md5"
//获取应用实例
const app = getApp()
let username = ''
let password = ''
Page({
    data: {
        isDisplay: false,
        isAgreeProtocol: false,
    },
    onLoad: {

    },
    //协议
    goxieyi() {
        wx.navigateTo({
            url: '/pages/oppoint/oppoint',
        })
    },
    //获取输入款内容
    getContent(e) {
        username = e.detail.value
    },
    getPassword(e) {
        password = e.detail.value
    },
    changeAgreeprotocol(e) {
        let checked = e.detail.value.length;
        if (checked == 1) {
            this.setData({
                isAgreeProtocol: true
            })
        } else {
            this.setData({
                isAgreeProtocol: false
            })
        }
    },
    //登录事件
    goadmin() {
        if (!this.data.isAgreeProtocol) {
            wx.showModal({
                content: "请勾选协议！"
            })
            return;
        }
        if (username == '') {
            wx.showToast({
                icon: 'none',
                title: '账号不能为空',
            })
        } else if (password == '') {
            wx.showToast({
                icon: 'none',
                title: '密码不能为空',
            })
        } else {
            wx.request({
                url: 'http://43.142.31.47:8081/Admin/Login',
                method: "GET",
                data: {
                    userName: username,
                    password: md5(password)
                },
                complete: (res) => {
                    if (res.data.status == "2") {
                        app.dataParams = {
                            username: username,
                        }
                        wx.switchTab({
                            url: '../../pages/home/home'
                        })
                    } else {
                        wx.showModal({
                            content: res.data.message
                        })
                    }
                }

            })
        }
    }

})