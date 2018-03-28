var pet = {
  //路径
  version: (new Date()).getTime(),
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
    var url = pet.url.split('#')[0], wxData = wxData || {};

    $.ajax({
      dataType: "json",
      type: 'POST',
      url: "https://www.musikid.com/new/operate_all/wx_signpackage",
      data: {
        url: url,
        t: new Date().getTime()
      },
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
                'playVoice',
                'uploadVoice'
              ]
            });

            //分享到...
            wx.ready(function() {
              var topicList = ['#你喜欢/留在这座城市的理由#', '#你最想要删除的记忆#', '#你最想对前任说的一句话#', '#你当下最有冲动想做的事情#', '#十年之后，你想要做的事情#'];
              var tpIndex = pet.queryString('topic');
              $("#write").text(topicList[tpIndex - 1]).delay(500).typewriter(300);
              var localId;
              var time;
              $(".audio_btn")[0].ontouchstart = function() {
                time = 0
                $(this).text("松开结束");
                wx.startRecord();
                var timer = setInterval(function() {
                  time++;
                }, 1000);
              }
              $(".audio_btn")[0].ontouchend = function() {
                $(this).text("按住录音");
                wx.stopRecord({
                  success: function(res) {
                    localId = res.localId;
                    $(".info3").show();
                    $(".com_btn").show();
                    clearInterval(timer);
                    $(".voiceTime").text(time);
                  }
                });
              }
              $(".reListen").click(function(event) {
                if (localId == null) return;
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
                  success: function(res) {
                    // var serverId = res.serverId; // 返回音频的服务器端ID
                  }
                });
              });
            })
          });
        }
      },
      error: function(xhr, type) {
        console.log('Ajax error!')
      }
    });
  }
};

$(function() {
  var tpIndex = pet.queryString('topic');
  $('#mymusic').find('source').attr('src', '../media/story/t' + tpIndex + '.mp3');
  $("#mymusic")[0].load();
  setTimeout(function(){
    var time = $("#mymusic")[0].duration;
    console.log(time);
    $(".myMusicTime").text(time);
  }, 500);


  pet.wxShare();
  $('#topic-talk').click(function(){
    $("#mymusic").trigger('play');
    var interval = setInterval(function() {
      if ($("#mymusic")[0].ended) {
        $(".info2").fadeIn("400");
        clearInterval(interval);
      }
    }, 500);
  });



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
  $('.audio_btn').bind('contextmenu', function(e) {
    e.preventDefault();
  });
  window.ontouchstart = function(e) { e.preventDefault(); };
});
document.oncontextmenu = function(e) {
  //或者return false;
  e.preventDefault();
};
