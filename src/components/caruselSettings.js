import $ from 'jquery';
import '../libs/OwlCarousel2-2.3.4/dist/owl.carousel';

export function initCaruselSettings() {
  const owl = $('.owl-carousel');
  owl.owlCarousel({
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1020: {
        items: 4,
      },
    },
  });

  $('.owl-next').click(function () {
    owl.trigger('next.owl.carousel');
  });
  $('.owl-prev').click(function () {
    owl.trigger('prev.owl.carousel');
  });
}
