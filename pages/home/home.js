// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        correct: false,
        randomNum: "",
        guessNum: "",
        times: 0
    },
    // 点击生成随机数
    createRandNum() {
        // 1 - 100
        let randomNum = Math.floor(Math.random() * 100 + 1)
        this.setData({
            randomNum: randomNum
        })
        wx.showToast({
            title: '已生成新的随机数',
            icon: "none",
            duration: 1500
        })
        console.log("新的随机数: " + this.data.randomNum)
    },
    // 数据双向绑定 ( 猜的数 input )
    guessNum(e) {
        this.setData({
            guessNum: e.detail.value
        })
    },
    // 确定
    sure() {
        this.setData({
            times: this.data.times += 1
        })
        if (this.data.randomNum == "") {
            wx.showToast({
                title: '请先点击生成随机数',
                icon: "none",
                duration: 2000
            })
        } else {
            if (this.data.guessNum == "") {
                wx.showToast({
                    title: '请输入数字',
                    icon: "none"
                })
                return;
            }
            if (/^([1-9]|[1-9]\d|100)$/.test(this.data.guessNum)) {
                this.tellNum()
            } else {
                wx.showToast({
                    title: '请输入1-100的正整数',
                    icon: "none"
                })
            }
        }
    },
    // 判断猜的数偏大或偏小
    tellNum() {
        if (this.data.guessNum > this.data.randomNum) {
            wx.showToast({
                title: '换个小点的数试试',
                icon: "none",
                duration: 2000
            })
        } else if (this.data.guessNum < this.data.randomNum) {
            wx.showToast({
                title: '换个大点的数试试',
                icon: "none",
                duration: 2000
            })
        } else {
            this.setData({
                correct: true
            })
        }
    },
    // 重置
    reset() {
        let that = this
        wx.showModal({
            title: "提示",
            content: "重置随机数并清空输入",
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        randomNum: "",
                        guessNum: "",
                        times: 0
                    })
                } else {}
            }
        })
    },
    // 关闭回答正确后的提示框
    closeHint() {
        this.setData({
            correct: false
        })
    }
})