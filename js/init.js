(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });	
    $('.scrollspy').scrollSpy();
    $('.modal-trigger').leanModal();
    $('.slider').slider({full_width: true});
  }); // end of document ready
})(jQuery); // end of jQuery name space
