$(function() {
  pet.wxShare('wxData', 1);

  var house = document.getElementById('house');
  function carRun() {
    $('#car').animate({
      left: 5
    }, {
      duration: 1500,
      easing: 'linear',
      complete: function() {
        $('#welcome').slideDown(500, 'easeOutElastic')
        setTimeout(function() {
          $('#car').find('.car-sw').addClass('open');
          $('#bottle').css({
            'opacity': 1
          });
          // creatTouchstartEventAndDispatch(house);
          bool.start();
        }, 500)
      }
    });
  }
  carRun()

  var bottleTop = $('#bottle').offset().top
  var bottleLeft = $('#bottle').offset().left
  var bool = new Parabola({
    el: "#bottle",
    offset: [180, 180],
    curvature: 0.02,
    duration: 4000,
    callback: function() {
      $('#bottle').addClass('swall');
      $('#control').fadeIn();
    },
    stepCallback: function(x, y) {
      $("<div>").appendTo(".top-part").css({
        "position": "absolute",
        "top": bottleTop + y,
        "left": bottleLeft + x
      });
    }
  });

  $('body').on('click', '#control .btn', function() {
    var id = $(this).data('id');
    if (id === 1) {
      alert('hello!')
    } else {
      location.href = "./index.html"
    }
  })


  house.addEventListener('touchstart', function() {
    $('#audio').trigger('play');
  });

  function creatTouchstartEventAndDispatch(el) {
    var event = document.createEvent('Events');
    event.initEvent('touchstart', true, true);
    el.dispatchEvent(event);
  }
});

// window.onload = function () {
//   var house = document.getElementById('house');
//   house.addEventListener('touchstart', function() {
//     $('#audio').trigger('play');
//   });
//
//   function creatTouchstartEventAndDispatch(el) {
//     var event = document.createEvent('Events');
//     event.initEvent('touchstart', true, true);
//     el.dispatchEvent(event);
//   }
//
// }
