$('.modal').on('shown.bs.modal', () => {
  $('.all-articles, .container-comment').css({ opacity: 0.1 });
});

// when modal closes
$('.modal').on('hidden.bs.modal', () => {
  $('.all-articles, .container-comment').css({ opacity: 1 });
});

$(document).ready(() => {
  $('.material-button-toggle').on('click', function () {
    $(this).toggleClass('open');
    $('.option').toggleClass('scale-on');
  });
});
