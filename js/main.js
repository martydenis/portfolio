jQuery.fn.outerHTML = function() {
	return jQuery('<div />').append(this.eq(0).clone()).html();
};

$(document).ready(function(){
	$('#hello .hello-anim > *').each(function(index, el){
		let $this = $(el),
		    $delay = $this.data('delay');
		$this.css('transition-delay', $delay+'ms');
	});

	let $menu = $('.menu').outerHTML();
	$('.section').each(function(){
		if($(this).attr('id') != 'hello'){
			$(this).prepend($menu);
		}
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

		// hash($(this).attr("href"));
	});

	/*************** SCROLL SPY ****************/

	let sections = [$("#hello"), $("#projects"), $("#contact")],
	    id = false,
	    scrolled_id;

	// // Donne la classe current au lien de la NAV correspondant avec la section consultée.
	$(document).on('scroll', function(e){
		scrollTop = $(this).scrollTop();

		for (var i in sections){
			var section = sections[i];
			if(scrollTop + $(window).height()/2 >= section.offset().top ) {
				scrolled_id = section.attr("id")
			}
		};

		if(scrolled_id != id){
			id = scrolled_id;
			$('.menu .current').removeClass("current");
			$(".menu a[href='#" + id + "']").parent().addClass("current");
		}
	});

	/************* FORM de VALIDATION *************/

	function isEmailValid(email){//compare l'email entré à l'expression régulière.
		var regExpPattern = /^[0-9a-zA-Z][-._a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,4}$/;
		return (email.match(regExpPattern)!=null);
	}

	$("#form").on("submit", function(e){
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

hash = function(h){ // conserve l'historique des #
	if(history.pushState){
		history.pushState(null, null, h)
	} else {
		location.hash = h
	}
}