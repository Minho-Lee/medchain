var i = 0;
var $rect1 = $("#rect1"), $rect2 =$("#rect2");
var rect1_left = 0, rect2_left = 1000;
var timer1, timer2;
var addingDotsTimer;

$(document).ready(function() {
	addingDotsTimer = setInterval(function() {
		addDots("loading")
	}, 700);
});

var checkPosition = function() {
	rect1_left = $rect1.offset().left;
	rect2_left = $rect2.offset().left;
};

var changeColor = function() {
	if (rect1_left + $rect1.width() > rect2_left) {
		console.log('CRASHED!');
		clearInterval(timer1);
		// $rect1.width(300).css({'background-color': 'green'});
		timer2 = setInterval(function() {
			slowMerge();
			completeMerge();
		}, 60);
	}
}

var initialEnter = true;
var slowMerge = function() {
	$rect1.offset({ left: rect1_left });
	$rect2.offset({ left: rect2_left });
	rect1_left += 0.5;
	rect2_left -= 0.5;
	if (initialEnter) {
		$("#section2 h1").text('Fixing').append('<span class="dots"></span>');
		initialEnter = false;
		i = 0;
		addingDotsTimer = setInterval(function() {
			addDots('section2');	
		}, 700);
	}
	
}

var completeMerge = function() {
	if (Math.abs(rect1_left - rect2_left) < 1) {
		// The red rect won't merge perfectly ( <1px difference)
		$rect2.offset({ left : rect2_left - 0.5 });
		console.log(rect1_left+ ' / ' + rect2_left);
		console.log('MERGED');
		clearInterval(timer2);
		clearInterval(addingDotsTimer);
		$("#section2 h1").text('Problem Resolved');
	}
}


var addDots = function(id) {
	
	if (i === 0) {
		$("#" + id + " .dots").html('.');
		i++;		
	} else if (i === 1) {
		$("#" + id + " .dots").append('.');
		i++;
	} else if (i === 2) {
		$("#" + id + " .dots").append('.');
		i++;
	} else {
		$("#" + id + " .dots").html('');
		i = 0;
	}
}



window.setTimeout(function() {
	$("#section1").hide();
	$("#section2").attr('style', 'display:block !important');
	clearInterval(addingDotsTimer);
	timer1 = setInterval(function() {
		checkPosition();
		changeColor();
	}, 500);
}, 3000);
// ^ Change time accordingly
