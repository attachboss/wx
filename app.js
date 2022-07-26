// app.js
App({
    onLaunch() {
        wx.cloud.init({
            env: "cloud1-0gkls4mn91487477"
        })
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null
    }

})