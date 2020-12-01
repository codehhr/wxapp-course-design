var util = require("../../utils/util")
// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicimg: "../../imgs/music.png", //背景音乐符号图片
        isplay: false,
        correct: false,
        randomNum: "",
        guessNum: "",
        times: 0
    },
    /**
     * 生命周期函数--监听页面加载
     * 页面初始化
     */
    onLoad: function () {
        // 控制背景音乐 ( 可取消注释 => 加载时自动播放 )
        // this.ctrlMusic();
    },
    // 点击生成随机数
    createRandNum() {
        // 先重置 ( 重置随机数并清空输入和次数 )
        this.resetNoHint()
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
    // 数据双向绑定 ( input )
    guessNum(e) {
        this.setData({
            guessNum: e.detail.value
        })
    },
    // 确定
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
            // 匹配 1-100 的正整数
            if (/^([1-9]|[1-9]\d|100)$/.test(this.data.guessNum)) {
                // 判断大小
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
        // 大了
        if (this.data.guessNum > this.data.randomNum) {
            wx.showToast({
                title: '换个小点的数试试',
                icon: "none",
                duration: 2000
            })
            this.count()
        }
        // 小了 
        else if (this.data.guessNum < this.data.randomNum) {
            wx.showToast({
                title: '换个大点的数试试',
                icon: "none",
                duration: 2000
            })
            this.count()
        }
        // 猜对了
        else {
            // 弹窗提示答对啦
            this.setData({
                correct: true,
            })
            this.count()
            // 写入记录
            this.recordToStorage()
            this.resetNoHint()
        }
    },
    // 写入记录
    recordToStorage() {
        // 最近一次的记录
        var currentRecord = {
            randomNum: this.data.randomNum,
            times: this.data.times,
            time: util.formatTime(new Date())
        }
        // 获取已有的记录
        var record = Array.from(wx.getStorageSync('record'))
        // 把最近一次的记录加进去
        record.push(currentRecord)
        // 写入存储
        wx.setStorageSync('record', record)
    },
    // 重置
    reset() {
        let that = this
        wx.showModal({
            title: "提示",
            content: "重置 随机数 并 清空输入 和 次数",
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
    // 计数一次
    count() {
        this.setData({
            times: this.data.times += 1,
        })
    },
    //
    resetNoHint() {
        this.setData({
            randomNum: "", // 随机数
            guessNum: "", // 猜的数
            times: 0 // 猜的次数
        })
    },
    // 关闭回答正确后的提示框
    closeHint() {
        this.setData({
            correct: false
        })
    },
    // 控制背景音乐
    ctrlMusic: function () {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.title = 'New Life'
        backgroundAudioManager.epname = 'New Life'
        backgroundAudioManager.singer = 'Peter Jeremias'
        backgroundAudioManager.coverImgUrl = "https://ae01.alicdn.com/kf/Ud08f63ccb57b41988e5921036e61bca2r.jpg"
        backgroundAudioManager.src = "https://codehhr.gitee.io/musics/new_life.mp3"
        // 播放
        if (!this.data.isplay) {
            this.setData({
                isplay: !this.data.isplay,
            })
            console.log("music playing !")
            // 结束时循环
            backgroundAudioManager.onEnded(() => {
                console.log("music end !")
                this.setData({
                    isplay: !this.data.isplay
                })
                console.log("music replay !")
                this.ctrlMusic()
            })
        }
        // 暂停
        else {
            this.setData({
                isplay: !this.data.isplay,
            })
            backgroundAudioManager.pause();
            backgroundAudioManager.onPause(() => {
                console.log("music stop !");
            });
        }
    },
})