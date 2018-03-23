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
          // $('#audio').trigger('play');
        }, 500)
      }
    });
  }
  carRun()

  $('body').on('click', '#control .btn', function() {
    var id = $(this).data('id');
    if (id === 1) {
      alert('hello!')
    } else {
      location.href="./index.html"
    }
  })
});
