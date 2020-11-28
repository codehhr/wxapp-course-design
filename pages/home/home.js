// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        correct: false,
        randomNum: "",
        guessNum: ""
    },
    // 生成随机数
    createRandNum() {
        // 1 - 100
        let randomNum = Math.floor(Math.random() * 100 + 1)
        this.setData({
            randomNum: randomNum
        })
        console.log("新的随机数: " + this.data.randomNum)
    },
    // 数据双向绑定 ( 猜的数 input )
    guessNum(e) {
        this.setData({
            guessNum: e.detail.value
        })
    },
    // 点击确定事件
    sure() {
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
    // 关闭回答正确后的提示框
    closeHint() {
        this.setData({
            correct: false
        })
    }
})