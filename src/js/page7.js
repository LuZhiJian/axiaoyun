var pet = {
  //路径
  version: (new Date()).getTime(),
  weixinRequest: "http://www.yc.cn/",
  appId: 'wxf4466017457b72fa',
  wxData: {},
  //load js or css
  loadFile: function(url, callback) {
    var elem;
    if (url.match(/\.js/i)) {
      elem = document.createElement("script");
      elem.src = url + '?ver=' + pet.version;
      document.body.appendChild(elem);
    } else {
      elem = document.createElement("link");
      elem.href = url + '?ver=' + pet.version;
      elem.rel = "stylesheet";
      document.head.appendChild(elem);
    }
    elem.onload = elem.onreadystatechange = function() {
      if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
        if (callback) {
          callback();
        }
      }
    };
  },

  //获取UR参数
  queryString: function(key) {
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
  },

  //移动端环境判断
  ua: navigator.userAgent,
  url: window.location.href,
  isWeixin: function() {
    return this.ua.match(/MicroMessenger/i);
  },

  wxShare: function(wxData, type, cb) {
    var url = pet.url.split('#')[0],
      wxData = wxData || {};

    console.log(url)
    $.ajax({
      dataType: "json",
      url: "https://www.musikid.com/new/operate_all/wx_signpackage?url=" + url,
      success: function(data) {
        if (data.status == 200) {
          pet.loadFile("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
            var res = eval(data.result);
            console.log(res)
            //配置信息
            wx.config({
              debug: false,
              appId: res.appId,
              timestamp: res.timestamp,
              nonceStr: res.nonceStr,
              signature: res.signature,
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'chooseImage'
              ]
            });

            //分享到...
            wx.ready(function() {
    var localId;
    $(".btn_no").click(function(event) {
        // wx.startRecord();
        wx.chooseImage({
count: 1, // 默认9
sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
success: function (res) {
var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
}
});
    });
  $(".btn_yes").click(function(event) {
    wx.onMenuShareTimeline({
    title: '22', // 分享标题
    link: 'http://www.musikid.com/html/lixiaoyun/html/page7.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '../image/car.png', // 分享图标
    success: function () {
    alert(55)
}
});
        // wx.stopRecord({
        //     success: function (res) {
        //         localId = res.localId;
        //     }
        // });
    });
  $(".audio_btn").click(function(event) {
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
  });
            });
          })
        }
      },
      error: function(xhr, type) {
        console.log('Ajax error!')
      }
    });
  }
};

$(function() {
    pet.wxShare();
  //   var localId;
  // //   $(".audio_btn").mousedown(function(event) {
  // //       wx.startRecord();
  // //   });
  // // $(".audio_btn").mouseup(function(event) {
  // //       wx.stopRecord({
  // //           success: function (res) {
  // //               localId = res.localId;
  // //           }
  // //       });
  // //   });
  // $(".btn_no").click(function(event) {
  //       wx.playVoice({
  //           localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
  //       });
  // });
  // $(".audio_btn")[0].ontouchstart = function(){
  //       console.log("开始录音");
  //       $(".btn_no").text("1");
  // }

  // $(".audio_btn")[0].ontouchend = function(){
  //       console.log("停止录音");
  //       $(".btn_no").text("2");
  // }
});
document.oncontextmenu=function(e){
    //或者return false;
    e.preventDefault();
};