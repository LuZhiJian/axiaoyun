$(function() {
  // $(".speed").click(function(event) {
  //     $("svg")[0].pauseAnimations();
  // });
  // $(".stop").click(function(event) {
  //     $("svg")[0].unpauseAnimations();
  // });
  pet.wxShare('wxData', false, false, 'bgm-1');
  var plus = minus = 0.02,
    timeDown, timeUp, stopDownTime;
  var ispause = false;
  $('.speed').on('touchstart', function() {
    $("#speed")[0].play();
    $('#hand').fadeOut();
    $("svg")[0].unpauseAnimations();
    // $('#map').attr('dur',20);
    timeDown = setInterval(function() {
      var getCurtime = Number($('#map').attr('dur'));
      // console.log(getCurtime);
      if (getCurtime > 10) {
        $('#map').attr('dur', getCurtime - plus);
      }
    }, 8);
  });
  $('.speed').on('touchend', function() {
    $("#speed")[0].load();
    clearInterval(timeDown);
  });

  $('.stop').on('touchstart', function() {
    $("svg")[0].pauseAnimations();
    park();
    // stopDownTime = 0;
    // timeUp = setInterval(function(){
    //     if(!ispause){
    //         stopDownTime += 50;
    //         var getCurtime = Number($('#map').attr('dur'));
    //         console.log(getCurtime);
    //         // if(getCurtime < 20 && getCurtime > 12.9){
    //             $('#map').attr('dur',(getCurtime + minus));
    //         // }
    //     }
    // },20);
    // timer = setTimeout(function(){
    //     console.log(stopDownTime);
    //     if(stopDownTime>=1000){
    //         $("svg")[0].pauseAnimations();
    //         park();
    //         ispause=true;
    //     }
    // },1100)
  });
  $('.stop').on('touchend', function() {
    ispause = false;
    clearInterval(timeUp);
  });

  $('.control-btn .btn').bind('contextmenu', function(e) {
    e.preventDefault();
  });

  window.ontouchstart = function(e) {
    e.preventDefault();
  };
});

// 漂移入库点
//第一个点 (190,167)(169,196)
//第二个点 (117,240)(77,259)
//第三个点 (15,206)(53,181)
//第四个点 (64,72)(97,41)
//第五个点 (132,-15)(162,18)
function park() {
  var carL = $("#car").offset().left - $(".maps-wrap").offset().left;
  var carT = $("#car").offset().top - $(".maps-wrap").offset().top;
  // console.log(carL + "," + carT)
  if (164 < carL && carL < 190 && 167 < carT && carT < 196) {
    location.href = "page2.html";
  }
  if (77 < carL && carL < 117 && 240 < carT && carT < 259) {
    location.href = "page3.html";
  }
  if (15 < carL && carL < 53 && 181 < carT && carT < 206) {
    location.href = "page4.html";
  }
  if (64 < carL && carL < 97 && 41 < carT && carT < 72) {
    location.href = "page5.html";
  }
  if (132 < carL && carL < 162 && -15 < carT && carT < 18) {
    location.href = "page6.html";
  }
}
