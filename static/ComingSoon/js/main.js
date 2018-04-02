(function($) {
"use strict";


/*------------------------------------------------------------------
[Table of contents]

1. CUSTOM FUNCTION
2. JQUERY CENTER FOR CONTENT /.jquery-center
3. COUNTDOWN INIT / #countdown_text_layout
4. MAGNIFIC POPUP INIT / .single_popup
5. CONTENT ANIMATE FUNCTION
6. SCROLL TO CONTENT
7. CONTENT APPEAR ANIMATION INIT / #marshall-details
8. CONTENT CLOSE INITI / #marshall-close-content
9. NEWSLETTER FORM INIT / #marshall-form
10. PARTICLES INIT / #mrs_particles_can
11. SLDE SLIDER INIT - VEGAS / #mrs_bg_slider
12. FULLSCREEN BACKGROUND SLIDER INIT - VEGAS / body.mrs-body-slider
13. CONTACT FORM AJAXIFY INIT / #mrs-contactForm
14. CONTACT FORM INPUT INAMATION
15. TEXTAREA AUTOSIZE / #mrs_message
16. PLAX PARALLAX INIT / .js-plaxify
17. APP SLIDER INIT
18. RIPPLES CANVAS
19. PARTICLES CANVAS - STAR
20. MCUSTOMSCROLL INIT WHILE LOAD AND RESIZE EVENT
21. Preloader / .marshall-loading-screen
22. JQUERY CENTER REINIT WHILE WINDOW LOAD /.jquery-center
23. INSTAGRAM FEED AND MASONRY INIT / #instagram_feed
24. INSTAGRAM FEED AND OWL CAROUSEL INIT / #instagram_slider
25. JQUERY CENTER CONTENT REINITIALIZE / .jquery-center

-------------------------------------------------------------------*/

/*--------------------------------------------------------------
  1. CUSTOM FUNCTION
--------------------------------------------------------------*/

/* is_exist() */
jQuery.fn.is_exist = function(){return this.length>0;}

/* contentCenter() */
function contentCenter($content){
  var content = $($content),
  half = content.outerHeight() / 2,
  calc = "calc(50% - "+half+"px)";
  content.css({
    top: calc
  });
}


/**
 * START DOCUMENT READY EVENT
 * @param event
 */
$(function() {

/*--------------------------------------------------------------
  2. JQUERY CENTER FOR CONTENT
--------------------------------------------------------------*/
if ( $('.jquery-center').is_exist() ) {
  contentCenter('.jquery-center');
}


/*--------------------------------------------------------------
  3. COUNTDOWN INIT
--------------------------------------------------------------*/
if ( $("#countdown_text_layout").is_exist() ) {
  simplyCountdown('#countdown_text_layout', {
      year: 2018,
      month: 4,
      day: 11,
      inline: true,
      words: {
          days: 'days',
          hours: 'h',
          minutes: 'm',
          seconds: 's',
          pluralLetter: ''
      },
  });
}
if ( $('.simply-countdown-column').is_exist() ) {
  simplyCountdown('.simply-countdown-column', {
      year: 2018,
      month: 4,
      day: 11,
      enableUtc: false
  });
}


/*--------------------------------------------------------------
  4. MAGNIFIC POPUP INIT
--------------------------------------------------------------*/
if ( $('.single_popup').length > 0 ) {
  $('.single_popup').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
}


/*--------------------------------------------------------------
  5. CONTENT ANIMATE FUNCTION
--------------------------------------------------------------*/
function contentToggle($this){

  var self    = $this,
    details   = $('#marshall-details'),
    content   = $('#marshall-animate-area'),
    close     = $('#marshall-close-content'),
    hide      = content.data('hide'),
    animation = details.data('animation');

  if ( self.hasClass('marshall-animate-open') ) {
    close.hide(0);
    self.removeClass('marshall-animate-open');
    content.removeClass(hide).addClass(animation).addClass('mrs-active');
    details.removeClass(animation).addClass(hide);
  } else {
    close.delay(600).show(0);
    self.addClass('marshall-animate-open');
    content.removeClass(animation).addClass(hide);
    details.removeClass(hide).addClass(animation).addClass('mrs-active');
  }

}


/*--------------------------------------------------------------
  6. SCROLL TO CONTENT
--------------------------------------------------------------*/
function scrollToDiv(e){
  var href = "#marshall-details",
      offsetTop = href === "#" ? 0 : $(href).offset().top;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop,
    }, 500);
    e.preventDefault();
}


/*--------------------------------------------------------------
  7. CONTENT APPEAR ANIMATION INIT
--------------------------------------------------------------*/
$(document).on("click", ".marshall-animate-btn", function(e){
  e.preventDefault();
  var self    = $(this);

  if(window.matchMedia("(min-width: 1025px)").matches){
    contentToggle( self );
  } else {
    scrollToDiv(e);
  }

});


function clickToSlide($this){
  
  var self    = $this,
    content   = $('#marshall-details'),
    col   = $('.marshall-col-content'),
    close     = $('#marshall-close-content-slide'),
    animation = content.data('animation');


  if ( self.hasClass('marshall-animate-open') ) {
    close.hide(0);
    self.removeClass('marshall-animate-open');
    content.removeClass(animation);
    col.removeClass('mrs-default-content-off');
  } else {
    close.delay(600).show(0);
    self.addClass('marshall-animate-open');
    content.addClass(animation);
    col.addClass('mrs-default-content-off');
  }

}

$(document).on("click", ".marshall-content-view", function(e){
  e.preventDefault();
  var self = $(this);

  if(window.matchMedia("(min-width: 1025px)").matches){
    clickToSlide( self );
  } else {
    scrollToDiv(e);
  }

});


/*--------------------------------------------------------------
  8. CONTENT CLOSE INIT
--------------------------------------------------------------*/
$(document).on("click", "#marshall-close-content", function(e){

  e.preventDefault();

  var self    = $(this),
    details   = $('#marshall-details'),
    btn       = $('.marshall-animate-btn'),
    content   = $('#marshall-animate-area'),
    close     = $('#marshall-close-content'),
    hide      = content.data('hide'),
    animation = details.data('animation');

    close.hide();
    btn.removeClass('marshall-animate-open');
    content.removeClass(hide).addClass(animation).addClass('mrs-active');
    details.removeClass(animation).addClass(hide);
  
});

$(document).on("click", "#marshall-close-content-slide, .marshall-col-content.mrs-default-content-off", function(e){

  e.preventDefault();

  var self    = $(this),
    details   = $('#marshall-details'),
    btn       = $('.marshall-content-view'),
    close     = $('#marshall-close-content-slide'),
    col   = $('.marshall-col-content'),
    animation = details.data('animation');

    close.hide();
    btn.removeClass('marshall-animate-open');
    details.removeClass(animation);
    col.removeClass('mrs-default-content-off');
  
});



/*--------------------------------------------------------------
  9. NEWSLETTER FORM INIT
--------------------------------------------------------------*/

if ( $("#marshall-form").is_exist() ) {

  var mform = $("#marshall-form");
  mform.ajaxChimp({
      callback: callbackFunction,
      url: 'http://xyz.us14.list-manage.com/subscribe/post?u=3e624ea3457b50d638f1bd58b&id=bc67dbaebe'
  });
  function callbackFunction (resp) {
      if (resp.result === 'success') {
        $('#marshall-email').val('');
        mform.addClass('mform-success');
        if ( $('.marshall-newsletter-header').length > 0 ) {
          $('.marshall-newsletter-header').removeClass('mform-header-animate').addClass('mfrom-header-animate-close');
        }
        setTimeout(function(){
          mform.removeClass('mform-success').removeClass('mform-submitting').removeClass('mform-animate');
          if ( $('.marshall-newsletter-header').length > 0 ) {
            $('.marshall-newsletter-header').removeClass('mfrom-header-animate-close').addClass('mfrom-header-animate');
          }
          mform.find('label').html('');
        }, 2000);
      } else if (resp.result === 'error') {
        mform.removeClass('mform-submitting').removeClass('mform-animate').addClass('mform-error');
      }
  }
  if (!String.prototype.contains) {
      String.prototype.contains = function (arg) {
          return !!~this.indexOf(arg);
      };
  }
  $(document).ajaxSend(function(evt, request, settings) {
    if ( settings.url.contains('subscribe') && settings.url.contains('post') ) {
       mform.removeClass('mform-error').addClass('mform-submitting');
       setTimeout(function(){
        mform.addClass('mform-animate');
       }, 900);
    }
  });

}



/*--------------------------------------------------------------
  10. PARTICLES INIT
--------------------------------------------------------------*/
if ( $("#mrs_particles_can").is_exist() ) {
  $('#mrs_particles_can').particleground({
    dotColor: '#FFF',
    lineColor: '#FFF'
  });
}


/*--------------------------------------------------------------
  11. SLDE SLIDER INIT - VEGAS
--------------------------------------------------------------*/
if ( $("#mrs_bg_slider").is_exist() ) {
  $("#mrs_bg_slider").vegas({
      slides: [
          { src: "images/thumb/7.jpg" },
          { src: "images/thumb/8.jpg" },
          { src: "images/thumb/6.jpg" },
          { src: "images/thumb/9.jpg" },
          { src: "images/thumb/10.jpg" }
      ],
      overlay: 'images/pattern.png'
  });
}


/*--------------------------------------------------------------
  12. FULLSCREEN BACKGROUND SLIDER INIT - VEGAS
--------------------------------------------------------------*/
if ( $("body.mrs-body-slider").is_exist() ) {
  $("body.mrs-body-slider").vegas({
      transition: 'fade', 
      transitionDuration: 4000,
      delay: 10000,
      animation: 'random',
      animationDuration: 20000,
      slides: [
          { src: "images/thumb/1.jpg" },
          { src: "images/thumb/2.jpg" },
          { src: "images/thumb/3.jpg" },
          { src: "images/thumb/4.jpg" },
          { src: "images/thumb/5.jpg" }
      ],
      overlay: 'images/pattern.png'
  });
}


/*--------------------------------------------------------------
  13. CONTACT FORM AJAXIFY INIT
--------------------------------------------------------------*/
$( "#mrs-contactForm" ).on( "submit", function( e ) {
  
  //Stop form submission & check the validation
  e.preventDefault();
  
  // Variable declaration
  var error       = false,
    name          = $('#mrs_name').val(),
    email         = $('#mrs_email').val(),
    mail_fail     = $('#mail_fail'),
    mail_success  = $('#mail_success'),
    submit_btn    = $('#mrs_submit_btn');
  
  // Form field validation
  if(name.length <= 1){
      var error = true;
      $('#mrs_name').parent().addClass('filed_error');
  }else{
      $('#mrs_name').parent().removeClass('filed_error');
  }
  if(email.length <= 6 || email.indexOf('@') == '-1'){
      var error = true;
      $('#mrs_email').parent().addClass('filed_error');
  }else{
      $('#mrs_email').parent().removeClass('filed_error');
  }
  if (error == true) {
    $(mail_success).fadeOut(500);
    $(mail_fail).slideDown(800);
  };

  // If there is no validation error, next to process the mail function
  if(error == false){

      $('i.mrs-submit-spinner').fadeIn(350);
      $(mail_success).hide();
      $(mail_fail).hide();
      $.ajax({
      url: $(this).attr('action'),
      data: $(this).serialize(),
      type: 'POST',
      beforeSend: function(){
        $('.form_loader').addClass("mcform_submitting");
      },
      success: function( response ) {
        if ( response ) {
          $(mail_fail).fadeOut(500);
          $(mail_success).slideDown(800);
          $('.single-cform-item input, .single-cform-item textarea').val('');
          $('.filed_error').removeClass('filed_error');
          $('.filed_ok').removeClass('filed_ok');
          $('i.mrs-submit-spinner').fadeOut('fast');
          $('.form_loader').removeClass("mcform_submitting");
        } else {
          $(mail_success).fadeOut(500);
          $(mail_fail).slideDown(800);
          $('i.mrs-submit-spinner').fadeOut('fast');
          $('.form_loader').removeClass("mcform_submitting");
        }
      },
      error: function() {
        $(mail_success).fadeOut(500);
        $(mail_fail).slideDown(800);
        $('i.mrs-submit-spinner').fadeOut('fast');
        $('.form_loader').removeClass("mcform_submitting");
      }
      });

  }
});

/*--------------------------------------------------------------
 14. CONTACT FORM INPUT INAMATION
--------------------------------------------------------------*/
$('.single-cform-item input, .single-cform-item textarea').focus(function() {
  $(this).closest('.single-cform-item').addClass('active_item').siblings().removeClass('active_item');
}).focusout(function() {
  $('.single-cform-item').removeClass('active_item');
});


/*--------------------------------------------------------------
  15. TEXTAREA AUTOSIZE
--------------------------------------------------------------*/
if ( $('textarea#mrs_message').is_exist() ) {
  $('textarea#mrs_message').textareaAutoSize();
}


/*--------------------------------------------------------------
  16. PLAX PARALLAX INIT
--------------------------------------------------------------*/
if ( $('.js-plaxify').is_exist() ) {
  // Plaxify all `js-plaxify` element layers
  var layers = $('.js-plaxify')

  $.each(layers, function(index, layer){
    $(layer).plaxify({
      xRange: $(layer).data('xrange') || 0,
      yRange: $(layer).data('yrange') || 0,
      invert: $(layer).data('invert') || false
    })
  })

  $.plax.enable()
}


/*--------------------------------------------------------------
  17. APP SLIDER INIT
--------------------------------------------------------------*/
if ( $('#mrs_app_slider').is_exist() ) {
  $('#mrs_app_slider').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      items: 1,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:false
  });
}


/*--------------------------------------------------------------
  18. RIPPLES CANVAS
--------------------------------------------------------------*/
var ripple = $('body#mrs-ripples-canvas');
if (ripple.is_exist()) {
  ripple.ripples({
    resolution: 512,
    dropRadius: 10, //px
    perturbance: 0.04,
    interactive: false
  });
  setInterval(function () {
    var $el = ripple;
    var x = Math.random() * $el.outerWidth();
    var y = Math.random() * $el.outerHeight();
    var dropRadius = 20;
    var strength = 0.04 + Math.random() * 0.04;

    $el.ripples('drop', x, y, dropRadius, strength);
  }, 3000);
}



/*--------------------------------------------------------------
  19. PARTICLES CANVAS - STAR
--------------------------------------------------------------*/
if ( $('#particles-js').is_exist() ) {
  particlesJS('particles-js', {

    particles: {
        number: {
            value: 100,
            density: {
                enable: 1,
                value_area: 500
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "star",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: !1,
                width: !1,
                height: !1
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true ,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 10,
            random: true,
            anim: {
                enable: true,
                speed: 20,
                size_min: 5,
                sync: true
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "bounce",
            attract: {
                enable: !1,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window", /*anvas*/
        events: {
            onhover: {
                enable: false,
                mode: "grab"
            },
            onclick: {
                enable: !1,
                mode: "push"
            },
            resize: !0
        },
        modes: {
            grab: {
                distance: 312,
                line_linked: {
                    opacity: 0.7
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 312
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },

    /* Retina Display Support */
    retina_detect: true
  });
}



}); // end document ready


/*--------------------------------------------------------------
  20. MCUSTOMSCROLL INIT WHILE LOAD AND RESIZE EVENT
--------------------------------------------------------------*/
$(window).on("load resize",function(){

  if ( $(".marshall-main-content").is_exist() ) {

    var content = $(".marshall-main-content"),
        close   = $('#marshall-close-content');

    if(window.matchMedia("(min-width: 1025px)").matches){

         content.mCustomScrollbar({
          theme:"minimal-dark",
          scrollbarPosition: 'outside',
          callbacks:{
            whileScrolling: function(){
              var fixedElement = $('#works-heading');
              var fixedElementTop = fixedElement.offset().top;
              var fixedElementBottom = fixedElementTop + fixedElement.outerHeight();
              if( fixedElementTop < 40 && fixedElementBottom > 40 ){
                close.addClass("fixed_color_changed");
              } else {
                close.removeClass("fixed_color_changed");
              }
            }
          }
         });
        
    } else{
         content.mCustomScrollbar("destroy");
    }
  }

});



/**
 * START WINDOW LOAD EVENT
 * @param event
 */
$(window).on("load", function(){

/*--------------------------------------------------------------
  21. Preloader
--------------------------------------------------------------*/
$(".marshall-loading-screen").delay(200).fadeOut('slow');

/*--------------------------------------------------------------
  22. JQUERY CENTER REINIT WHILE WINDOW LOAD
--------------------------------------------------------------*/
if ( $('.jquery-center').is_exist() ) {
  contentCenter('.jquery-center');
}


/*--------------------------------------------------------------
  23. INSTAGRAM FEED AND MASONRY INIT
--------------------------------------------------------------*/
if ( $('#instagram_feed').is_exist() ) {

  var self = $( "#instagram_feed" ),
    accessToken = self.data('access-token'),
    clientID = self.data('client-id'),
    name = self.data('username'),
    limit = self.data('limit');

    $.fn.spectragram.accessData = {
      accessToken: accessToken,
      clientID: clientID
    };

    var feedlist = self.spectragram('getUserFeed', {
      query: name,
      size: 'small',
      max: limit,
      wrapEachWith: "<li class='in_item'></li>",
      complete: activeInstagramGrild
    });

    function activeInstagramGrild() {

      var $container = $('#instagram_feed'),
      colWidth = function () {
        var w = $(window).width(), 
          cw = $container.width(),
          columnNum = 1,
          columnWidth = 0;
        if (w > 1200) {
          columnNum  = 4;
        } else if (w > 900) {
          columnNum  = 4;
        } else if (w > 600) {
          columnNum  = 4;
        } else if (w > 450) {
          columnNum  = 3;
        } else if (w > 385) {
          columnNum  = 3;
        }
        columnWidth = Math.floor(cw/columnNum);
        $container.find('.in_item').each(function() {
          var $item = $(this),
            multiplier_w = $item.attr('class').match(/in_item-w(\d)/),
            multiplier_h = $item.attr('class').match(/in_item-h(\d)/),
            width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
            height = multiplier_h ? columnWidth*multiplier_h[1] : columnWidth*1;
          $item.css({
            width: width,
            height: height
          });
        });
        return columnWidth;
      },
      isotope = function () {
        var w = $container.width();
        $container.isotope({
          resizable: false,
          itemSelector: '.in_item',
          isFitWidth: true,
          masonry: {
            columnWidth: colWidth(),
            gutter: 0
          }
        });
      };
      isotope();
      $(window).on('resize', isotope);
      
    } // end of if exists
}


/*--------------------------------------------------------------
  24. INSTAGRAM FEED AND OWL CAROUSEL INIT
--------------------------------------------------------------*/
if ( $('#instagram_slider').is_exist() ) {

  var self = $( "#instagram_slider" ),
    accessToken = self.data('access-token'),
    clientID = self.data('client-id'),
    name = self.data('username'),
    limit = self.data('limit');

    $.fn.spectragram.accessData = {
      accessToken: accessToken,
      clientID: clientID
    };

    self.spectragram('getUserFeed', {
      query: name,
      size: 'small',
      max: limit,
      wrapEachWith: "<li class='in_item'></li>",
      complete: activeInstagramSlider
    });

    function activeInstagramSlider() {

      $("#instagram_slider").owlCarousel({
        loop:true,
        nav:false,
        dots: false,
        lazyLoad: false,
        items: 12,
        autoplay:true,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:4
            },
            480:{
                items:6
            },
            768:{
                items:8
            },
            991:{
                items:12
            }
        }
      });
      
    } // end of if exists
}

}); // end window load



/**
 * START WINDOW RESIZE EVENT
 * @param event
 */
$(window).on("resize", function(){

  /*--------------------------------------------------------------
    25. JQUERY CENTER CONTENT REINITIALIZE
  --------------------------------------------------------------*/
  if ( $('.jquery-center').is_exist() ) {
    contentCenter('.jquery-center');
  }
});




})(jQuery); // end anonymous function