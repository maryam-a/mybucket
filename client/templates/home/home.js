$(document).ready(function() {
	var offset = $('.top').height() + 100;

	$('.arrow').show();

	$(window).scroll(function() {
		if ($(window).scrollTop() > offset) {
			$('.arrow').hide();
		} else {
			$('.arrow').show();
		}
	});
});