(function ($) {
  'use strict';

  // global variables

  var win = $(window);

  // navigation fixed top
  win.on('scroll', function () {
    if ($(window).scrollTop() > 70) {
      $('.main-nav').addClass('nav-top');
    } else {
      $('.main-nav').removeClass('nav-top');
    }
  });


  $(".toggler").click(function () {
    $(".full-nav").toggleClass("show");
  });


  // clients slider
  $('.clients-wrap').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    dots: false,
    arrows: false,
    center: true,
    autoplay: true,
    padding: 20,
    autoplaySpeed: 6000,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }

    ]
  });


  // testimonial slider
  $('.testimonial-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [{
      breakpoint: 900,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }]
  });


  // testimonial slider 2
  $('.testimonial-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    nextArrow: '<button class="slide-arrow prev-arrow"><i class="fa-solid fa-arrow-right"></i></button>',
    prevArrow: '<button class="slide-arrow next-arrow"><i class="fa-solid fa-arrow-left"></i></button>',
    autoplay: true,
    autoplaySpeed: 6000
  });


  // magnific popup
  $('.recurso-gallery').each(function () {
    $(this).find('.popup-gallery').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });

  $(document).ready(function () {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });
  });



  win.on('load', function () { // makes sure the whole site is loaded

    // ----------------------- 
    // Progress Bar--------------------
    // 
    $('.progress-bar').each(function () {
      var width = $(this).data('percent');
      $(this).css({
        'transition': 'width 3s'
      });
      $(this).appear(function () {
        $(this).css('width', width + '%');
        $(this).find('.skill-number').countTo({
          from: 0,
          to: width,
          speed: 3000,
          refreshInterval: 50
        });
      });
    });
  }); //End On Load Function



  // search box
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });

  // Shuffle js filter and masonry. Supports optional per-container data-limit
  var containers = document.querySelectorAll('.shuffle-wrapper');
  if (containers && containers.length) {
    var Shuffle = window.Shuffle;

    function getGroups(el) {
      var groupsAttr = el.getAttribute('data-groups') || '[]';
      try {
        return JSON.parse(groupsAttr);
      } catch (e) {
        return [];
      }
    }

    containers.forEach(function (containerEl) {
      var myShuffle = new Shuffle(containerEl, {
        itemSelector: '.shuffle-item',
        buffer: 1
      });

      var limitAttr = containerEl.getAttribute('data-limit');
      var limit = limitAttr ? parseInt(limitAttr, 10) : 0;

      function applyFilter(value) {
        if (limit && limit > 0) {
          var shown = 0;
          myShuffle.filter(function (element) {
            var groups = getGroups(element);
            var matches = (value === 'all') || (groups.indexOf(value) > -1);
            if (!matches) return false;
            if (shown < limit) {
              shown++;
              return true;
            }
            return false;
          });
        } else {
          myShuffle.filter(value);
        }
      }

      // Scope filter inputs to the nearest section/container
      var scope = containerEl.closest('section') || containerEl.parentElement || document;
      var $inputs = $(scope).find('input[name="shuffle-filter"]');
      var initial = ($inputs.filter(':checked').val()) || 'all';
      applyFilter(initial);

      $inputs.on('change', function (evt) {
        var input = evt.currentTarget;
        if (input && input.checked) {
          applyFilter(input.value || 'all');
        }
      });
    });
  }



  // meta social link

  $('.share-btn').on('click', function (e) {
    e.preventDefault();
    $('.meta-share .social-links').toggleClass('open');

  });

  // Remove generic slice/show loader; handled by Shuffle limiting

  if ($("#search-input").length > 0) {
    var sjs = SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: '/search.json'
    });
  }


})(jQuery);
