var i = 0;

$(document).ready(function() {
	
});

var myFunction = function() {
	// console.log('i: ' + i);
	if (i === 0) {
		$("#dots").html('.');	
		i++;		
	} else if (i === 1) {
		$("#dots").append('.');
		i++;
	} else if (i === 2) {
		$("#dots").append('.');
		i++;
	} else {
		$("#dots").html('');
		i = 0;
	}
}

var myFunction2 = function() {
	
};

window.setTimeout(function() {
	$("#section1").hide();
	$("#section2").attr('style', 'display:block !important');
	myFunction2();
}, 200);
// ^ Change number later

window.setInterval(function() {
	myFunction()
}, 700);