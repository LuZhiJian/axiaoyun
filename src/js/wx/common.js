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

  wxShare: function(wxData, callback, audioId, bgm) {
    var url = pet.url.split('#')[0],
      wxData = wxData || {};
    $.ajax({
      dataType: "json",
      type: 'POST',
      url: "https://www.musikid.com/new/operate_all/wx_signpackage",
      data: { url: url, t: new Date().getTime() },
      success: function(data) {
        if (data.status == 200) {
          pet.loadFile("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
            var res = eval(data.result);
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
                'startRecord',
                'stopRecord',
                'chooseImage'
              ]
            });

            //分享到...
            wx.ready(function() {
              if (bgm) {
                document.getElementById(bgm).play()
              }
              if (callback) {
                document.getElementById(audioId).load()
                callback()
              }
              // wx.onMenuShareTimeline({
              //   title: shareTimeline,
              //   link: link,
              //   imgUrl: img,
              //   success: function() {
              //     if (cb) {
              //       cb()
              //     }
              //   },
              //   cancel: function() {}
              // });
              // wx.onMenuShareAppMessage({
              //   title: title,
              //   desc: desc,
              //   link: link,
              //   imgUrl: img,
              //   type: '',
              //   dataUrl: '',
              //   success: function() {
              //     if (cb) {
              //       cb()
              //     }
              //   },
              //   cancel: function() {}
              // });
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
