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
    },
    // 数据双向绑定( 猜的数 )
    guessNum(e) {
        this.setData({
            guessNum: e.detail.value
        })
    },
    // 点击确定事件
    sure() {
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
    },
    // 判断猜的数偏大或偏小
    tellNum() {
        this.setData({
            correct: true
        })
    },
    //
    closeHint() {
        console.log("666")
        this.setData({
            correct: false
        })
    }
})