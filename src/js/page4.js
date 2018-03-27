$(function(){
  function carRun() {
    var bottleTop = $('#bottle').offset().top
    var bottleLeft = $('#bottle').offset().left
    var n = 0.1
    var bool = new Parabola({
      el: "#bottle",
      offset: [74, 132],
      curvature: 0.1,
      duration: 3500,
      callback: function() {
        $('#bottle').addClass('swall');
        $('#control').fadeIn();
      },
      stepCallback: function(x, y) {
        if (n > 1) {
          n = 1
        } else {
          n += 0.004
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
      left: 80
    }, {
      duration: 1500,
      easing: 'linear',
      complete: function() {
        $('#welcome').slideDown(500, 'easeOutElastic')
        setTimeout(function() {
          $('#car').find('.car-sw').addClass('open');
          $('#bottle').css({
            'opacity': 1,
            "transform": "scale(0.1)"
          });
          document.getElementById('audio').play()
          bool.start();
        }, 500)
      }
    });
  }
  pet.wxShare('wxData', carRun, 'audio', 'bgm-2');

  $('body').on('click', '#control .btn', function() {
    var id = $(this).data('id');
    $('#click-music').trigger('play');
    if (id === 1) {
      // alert('hello!')
    } else {
      location.href = "./index.html"
    }
  })
});
