$(function(){
  function carRun() {
    $('#car').animate({
      left: 5
    },{
      duration: 1500,
      easing: 'linear',
      complete: function() {
        $('#welcome').slideDown(500, 'easeOutElastic')
        setTimeout(function(){
          $('#car').find('.car-sw').addClass('open');
          $('#audio').trigger('play');
        }, 500)
      }
    });
  }
  carRun()

});
