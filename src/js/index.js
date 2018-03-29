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
  if (144 < carL && carL < 210 && 147 < carT && carT < 216) {
    location.href = "page2.html";
  }
  if (57 < carL && carL < 137 && 220 < carT && carT < 279) {
    location.href = "page3.html";
  }
  if (-5 < carL && carL < 73 && 161 < carT && carT < 226) {
    location.href = "page4.html";
  }
  if (44 < carL && carL < 117 && 21 < carT && carT < 112) {
    location.href = "page5.html";
  }
  if (112 < carL && carL < 182 && -35 < carT && carT < 38) {
    location.href = "page6.html";
  }
}
