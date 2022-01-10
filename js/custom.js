
/*
  [JS Index]

  ---

  Template:  beyond - Personal Portfolio Template.
  Template URL: http://beyond.bitballoon.com
  Author:  design_grid
  Version: 1.0
*/


$(function () {

  "use strict";

  var wind = $(window);


    /* scroll animate
    -------------------------------------------------------*/
    var links = $('a[href*="#"]:not([href="#"])');
    links.on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
        var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 75,
                }, 1000);
                return false;
            }
        }
    });

  /* navbar scrolling background and change logo
  -------------------------------------------------------*/
  wind.on("scroll",function () {

      var bodyScroll = wind.scrollTop(),
          navbar = $(".navbar");

      if(bodyScroll > 200){

          navbar.addClass("nav-scroll");
          $('.navbar-brand img').attr('src','img/logo.png');


      }else{

          navbar.removeClass("nav-scroll");
          $('.navbar-brand img').attr('src','img/logo-2.png');

      }

  });



  /* sections background image from data background
  -------------------------------------------------------*/
  $( ".cover-bg" ).each(function() {
    var attr = $(this).attr('data-image-src');

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background-image', 'url('+attr+')');
    }

  });


  /* progress bar
  -------------------------------------------------------*/
  wind.on('scroll', function () {
      $(".bar span").each(function () {
          var bottom_of_object =
          $(this).offset().top + $(this).outerHeight();
          var bottom_of_window =
          $(window).scrollTop() + $(window).height();
          var myVal = $(this).attr('data-width');
          if(bottom_of_window > bottom_of_object) {
              $(this).css({
              width : myVal
              });
          }
      });
  });


  /* drawsvg icon
  -------------------------------------------------------*/
  var anim = true ;
  wind.on('scroll', function () {
      var bodyScroll = wind.scrollTop();
      var _target = $('.services').offset().top - 700
      if(bodyScroll>= _target){
          if(anim){
              $(".svg-icon").each(function () {
                  var $svg = $('.svg-icon').drawsvg({
                      duration: 4000,
                  });
                  $svg.drawsvg('animate');

              });
              anim = false;
          }
      }
  });


  /* slick
  -------------------------------------------------------*/
  $('.testimonial .carousel-slick').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '5px',
                slidesToShow: 1,
                dots: true,
            }
        }
    ]
  });


    /* owl carousel
    -------------------------------------------------------*/
    $('.about .box-text .owl-carousel').owlCarousel({
      loop:true,
      items:1,
      margin:30,
      dots: false,
      nav: true,
      navText:['<span> <i class="jam jam-arrow-left"></i> </span>',
          '<span> <i class="jam jam-arrow-right"></i> </span>'],
  });


    /* owl carousel
    -------------------------------------------------------*/
    $('.services .owl-carousel').owlCarousel({
      loop:true,
      items:3,
      margin:30,
      dots: false,
      nav: true,
      navText:['<span> <i class="jam jam-arrow-left"></i> </span>',
          '<span> <i class="jam jam-arrow-right"></i> </span>'],
      responsiveClass:true,
      responsive:{
          0:{
            items:1,
          },
          991:{
            items:3,
          }
          
      }
  });


  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator

  $('#contact-form').validator();


  // when the form is submitted
  $('#contact-form').on('submit', function (e) {

      // if the validator does not prevent form submit
      if (!e.isDefaultPrevented()) {
          var url = "contact.php";

          // POST values in the background the the script URL
          $.ajax({
              type: "POST",
              url: url,
              data: $(this).serialize(),
              success: function (data)
              {
                  // data = JSON object that contact.php returns

                  // we recieve the type of the message: success x danger and apply it to the
                  var messageAlert = 'alert-' + data.type;
                  var messageText = data.message;

                  // let's compose Bootstrap alert box HTML
                  var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                  // If we have messageAlert and messageText
                  if (messageAlert && messageText) {
                      // inject the alert to .messages div in our form
                      $('#contact-form').find('.messages').html(alertBox);
                      // empty the form
                      $('#contact-form')[0].reset();
                  }
              }
          });
          return false;
      }
  });


});


$(window).on("load",function (){

  /* Preloader
  -------------------------------------------------------*/
  $("#preloader").fadeOut(500);


  /* isotope
  -------------------------------------------------------*/
  var $gallery = $('.gallery').isotope({});
  $('.gallery').isotope({

      // options
      itemSelector: '.item-img',
      transitionDuration: '0.5s',

  });


  $(".gallery .single-image").fancybox({
    'transitionIn'  : 'elastic',
    'transitionOut' : 'elastic',
    'speedIn'   : 600,
    'speedOut'    : 200,
    'overlayShow' : false
  });


  /* filter items on button click
  -------------------------------------------------------*/
  $('.filtering').on( 'click', 'button', function() {

      var filterValue = $(this).attr('data-filter');

      $gallery.isotope({ filter: filterValue });

      });

  $('.filtering').on( 'click', 'button', function() {

      $(this).addClass('active').siblings().removeClass('active');

  });


})

