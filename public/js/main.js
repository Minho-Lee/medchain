$(document).ready(function() {
	$('.nav li a').click(function(e) {
      //var $btn = $('.nav li button');
      var $parent = $(this).parent();
      //var $hash = $(this)[0].hash;
      $('.nav li').removeClass('active');
      
      // console.log($parent);
      // console.log($parent.parent());

      if (!$parent.hasClass('active')) {
         if ($parent.parent().hasClass('dropdown-menu')) {
            //adding active class to the list which is a direct child of ul navbar
            $parent.parent().parent().addClass('active');
            
         } else {
            $parent.addClass('active');
         }
      }
      e.preventDefault();
   });
}); //document.ready



