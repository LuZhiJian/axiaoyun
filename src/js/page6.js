$(function(){
  function carRun() {
    var bottleTop = $('#bottle').offset().top
    var bottleLeft = $('#bottle').offset().left
    var n = 0.1
    var deg = 0
    var bool = new Parabola({
      el: "#bottle",
      offset: [73, 136],
      curvature: 0.1,
      duration: 1000,
      callback: function() {
        $('#bottle').addClass('swall');
        $('#control').fadeIn();
      },
      stepCallback: function(x, y) {
        if (n > 1) {
          n = 1
        } else {
          n += 0.02
        }
        if (deg > 1440) {
          deg = 1440
        } else {
          deg += 15
        }
        $("<div>").appendTo(".top-part").css({
          "position": "absolute",
          "top": bottleTop + y,
          "left": bottleLeft + x
        });
        $('#bottle').css({
          "transform": "scale(" + n + ") rotate(" + deg + "deg)"
        })
      }
    });
    $('#car').animate({
      left: 100
    }, {
      duration: 1500,
      easing: 'linear',
      complete: function() {
        $('#welcome').slideDown(500, 'easeOutElastic')
        setTimeout(function() {
          $('#car').find('.car-sw').addClass('open');
          document.getElementById('open').play()
          setTimeout(function(){
            $('#bottle').css({
              'opacity': 1,
              "transform": "scale(0.1)"
            });
            document.getElementById('audio').play()
            bool.start();
          }, 500)
        }, 500)
      }
    });
  }
  pet.wxShare('open', carRun, 'audio', 'bgm-2');

  $('body').on('click', '#control .btn', function() {
    var id = $(this).data('id');
    $('#click-music').trigger('play');
    if (id === 1) {
      $('#yes').trigger('play');
      setTimeout(function(){
        window.location.href = "page7.html?topic=5"
      }, 500)
    } else {
      $('#no').trigger('play');
      setTimeout(function(){
        window.location.href = "./index.html"
      }, 500)
    }
  })
});
