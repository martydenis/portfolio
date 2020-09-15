$(document).ready(function(){
	$(window).on('orientationChange', function(){
		updateVhValue();
	});

	$('#hello .hello-anim > *').each(function(index, el){
		let $this = $(el),
		    $delay = $this.data('delay');
		$this.css('transition-delay', $delay+'ms');
	});

	let $menu = $('.menu').outerHTML();
	$('.section-white').each(function(){
		$(this).prepend($menu);
	});

	setTimeout(function(){
		$('#hello').addClass('play');
	}, 1600);

	$(".menu a").click(function(e){
		// Effectue l'animation du scroll quand cliqué sur un lien de la NAV.
		e.preventDefault();
		let $this = $(this),
			 $body = $('body, html'),
			 href = $this.attr('href');

		if($(href).length > 0){
			$body.stop().animate({
				scrollTop: $($this.attr('href')).offset().top
			}, 500, "swing");
		}

		// $('.menu .current').removeClass('current');
		// $('.menu a[href="'+href+'"]').parent().addClass('current');
	});

	/*************** SCROLL SPY ****************/

	let sections = [$("#hello"), $("#projects"), $("#contact")],
	    id = '',
	    sectionIndex = 0,
	    scrolled_id;

	// // Donne la classe current au lien de la NAV correspondant avec la section consultée.
	$(document).on('scroll', function(e){
		let scrollTop = $(this).scrollTop();
		let polygon = [[16, 11],[20, 14],[32, 14],[32, 34],[20, 34],[16, 38],[12, 34],[0, 34],[0, 14],[12, 14]];

		for (var i in sections){
			var section = sections[i];
			if(scrollTop + $(window).height()/2 >= section.offset().top ) {
				scrolled_id = section.attr("id");
				sectionIndex = i;
			}
		};

		if(scrolled_id != id){
			id = scrolled_id;
			$('.menu .current').removeClass("current");
			
			let newPath = '';
			for (let index = 0; index < polygon.length; index++) {
				let point = polygon[index];
				if(index != 0)
					newPath += ', '
				newPath += point[0]+ 'px ' + (point[1]+(48*sectionIndex)) + 'px';
			}

			$('.menu .clip-path').css('clip-path', 'polygon('+newPath+')');
			$(".menu a[href='#" + id + "']").parent().addClass("current");
		}
	});



	/************* FORM de VALIDATION *************/
	$("#form").on("submit", function(e) {
		var field, value = null;
		var valid = true;

		// Teste le nom.
		field = $("#nom");
		value = field.val();
		if ( value ) {
			field.parent().removeClass("erreur");
		} else {
			field.parent().addClass("erreur");
			valid = false;
		}

		// Teste l'email.
		field = $("#email");
		value = field.val();
		if ( isEmailValid(value) ) {
			field.parent().removeClass("erreur");
		} else {
			field.parent().addClass("erreur");
			valid = false;
		}

		// Teste le message.
		field = $("#message");
		value = field.val();
		if ( value ) {
			field.parent().removeClass("erreur");
		} else {
			field.parent().addClass("erreur");
			valid = false;
		}

		// Termine la validation.
		if (!valid) {
			e.preventDefault();
		}
	});
});

function updateVhValue(){
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function isEmailValid(email) { //compare l'email entré à l'expression régulière.
	var regExpPattern = /^[0-9a-zA-Z][-._a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,4}$/;
	return (email.match(regExpPattern)!=null);
}

jQuery.fn.outerHTML = function() {
	return jQuery('<div />').append(this.eq(0).clone()).html();
};