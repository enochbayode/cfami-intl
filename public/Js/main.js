// number conter
$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
// number conuter ends

// -------------Gallery slides
var gallery = function() {
	$('.carousel-gallery').owlCarousel({
	loop:true,
	margin:25,
	nav:false,
	pagination: false,
	autoplay: 0.05,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		1000:{
			items:4
		}
	}
	})
};
gallery();
// -------------Gallery slides-------Ends---------


var pstgallery = function() {
	$('.pastor-carousel').owlCarousel({
	loop:true,
	margin:15,
	nav:false,
	pagination: false,
	autoplay: 0.05,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		1000:{
			items:3
		}
	}
	})
};
pstgallery();


var testimony = function() {
	$('.Testimony').owlCarousel({
	loop:true,
	margin:20,
	nav:false,
	pagination: true,
	autoplay: 0.04,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		800:{
			items:2
		},
		1000:{
			items:3
		}
	}
	})
};
testimony();