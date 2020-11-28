// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
    }
})