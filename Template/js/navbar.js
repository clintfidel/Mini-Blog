$('.modal').on('shown.bs.modal', () => {
  $('.all-articles').css({ opacity: 0.1 });
});

// when modal closes
$('.modal').on('hidden.bs.modal', () => {
  $('.all-articles').css({ opacity: 1 });
});

