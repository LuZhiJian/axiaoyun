$(function(){
  function carRun() {
    var bottleTop = $('#bottle').offset().top
    var bottleLeft = $('#bottle').offset().left
    var n = 1
    var bool = new Parabola({
      el: "#bottle",
      offset: [-36, -230],
      curvature: 0.5,
      duration: 2000,
      callback: function() {
        $('#bottle').css({opacity: 0});
        setTimeout(function(){
          $('#car').find('.car-sw').removeClass('open').addClass('close');
          $('#car').animate({
            left: 600
          }, {
            duration: 3000,
            easing: 'linear',
            complete: function() {
              location.href="./page9.html"
            }
          })
        },500);
      },
      stepCallback: function(x, y) {
        if (n < 0) {
          n = 0
        } else {
          n -= 0.004
        }
        $("<div>").appendTo(".top-part").css({
          "position": "absolute",
          "top": bottleTop + y,
          "left": bottleLeft + x
        });
        $('#bottle').css({
          "transform": "scale(" + n + ")"
        })
      }
    });
    $('#car').animate({
      left: 100
    }, {
      duration: 3000,
      easing: 'linear',
      complete: function() {
        $('#welcome').slideDown(500, 'easeOutElastic')
        setTimeout(function() {
          $('#car').find('.car-sw').addClass('open');

          // document.getElementById('audio').play()
          bool.start();
        }, 500)
      }
    });
  }
  pet.wxShare('wxData', carRun, 'audio');
});
