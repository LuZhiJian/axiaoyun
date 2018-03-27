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
      type: 'POST',
      url: "https://www.musikid.com/new/operate_all/wx_signpackage",
      data: { url: url, t: new Date().getTime() },
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
                'startRecord',
                'stopRecord',
                'playVoice',
                'uploadVoice'
              ]
            });

            //分享到...
            wx.ready(function() {
                $("#mymusic")[0].play();
                var time = parseInt($("#mymusic")[0].duration);
                $(".myMusicTime").text(time);
                var interval = setInterval(function(){
                    if($("#mymusic")[0].ended){
                        $(".info2").fadeIn("400");
                        clearInterval(interval);
                    }
                },500);
                  var localId;
                  var time;
                  $(".audio_btn")[0].ontouchstart = function(){
                        time = 0
                        $(this).text("松开结束");
                        wx.startRecord();
                        var timer = setInterval(function(){
                            time++;
                        },1000);
                  }
                  $(".audio_btn")[0].ontouchend = function(){
                        $(this).text("按住录音");
                       wx.stopRecord({
                            success: function (res) {
                                localId = res.localId;
                               $(".info3").show();
                               $(".com_btn").show();
                               clearInterval(timer);
                               $(".voiceTime").text(time);
                            }
                        });
                  }
                  $(".reListen").click(function(event) {
                        if(localId==null) return;
                        wx.playVoice({
                            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                        });
                  });
                  $("#again").click(function(event) {
                        $(".voiceTime").text("0");
                        localId = null;
                  });
                   $("#sure").click(function(event) {
                        wx.uploadVoice({
                            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                // var serverId = res.serverId; // 返回音频的服务器端ID
                            }
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
     $('.bz').textillate({ in: { effect: 'bounceIn ' } });
});
document.oncontextmenu=function(e){
    //或者return false;
    e.preventDefault();
};