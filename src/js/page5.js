$(function(){
  function carRun() {
    $('#car').animate({
      left: 100
    },{
      duration: 1500,
      easing: 'linear',
      complete: function() {
        setTimeout(function(){
          $('#car').find('.car-sw').addClass('open');
          // $('#audio').trigger('play');
        }, 500)
      }
    });
  }
  carRun();
});
