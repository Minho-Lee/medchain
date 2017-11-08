$(document).ready(function() {
	$(".footer a").hover(
		//This is mouseover
		function() {
			// console.log($(this));
			$(this)[0].firstChild.style.color = '#F33259';
			$(this)[0].lastChild.style.color ='#F6F3F3';

		//This is mouseleave
		}, function() {
			$(this)[0].firstChild.style.color = '#F6F3F3';
			$(this)[0].lastChild.style.color ='#F33259';
	});
});



