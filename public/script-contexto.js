

$(document).ready(function() {
  
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
    $(".navbar").toggleClass("is-open");
  });
  
  // if they click on a navbar-item, close the navbar
  $(".navbar-item").click(function() {
    $(".navbar-burger").removeClass("is-active");
    $(".navbar-menu").removeClass("is-active");
    $(".navbar").removeClass("is-open");
  });
  
  // Make a function that when I click a section link, the site scrolls to that section
  $(".navbar-item").click(function() {
    var section = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(section).offset().top - ($(".navbar").height() + 20)
    }, 1000);
  });
  
  $('#myTimeline').verticalTimeline({
    startLeft: false,
    alternate: true,
    animate: "slide",
    arrows: false
  });
  // $('#myTimeline2').verticalTimeline({
  //   startLeft: false,
  //   alternate: true,
  //   animate: "slide",
  //   arrows: false
  // });

  $('.card-custom .the-header').on('click', function () {
    console.log('click')
    $(this).find('.icon-toggle').toggleClass('fa-angle-down fa-angle-up');
    $(this).parent().find('.the-content').slideToggle();
  });

});
