$(document).ready(function(){

	// $("#hamburger").click(function(e){
	// 	e.preventDefault();
	// 	$("body").toggleClass("with-sidebar");
	// });

	let $menuA = $("#menu a");
	$menuA.click(function(e){
		// Effectue l'animation du scroll quand cliqué sur un lien de la NAV.
		e.preventDefault();
		let $this = $(this),
			 $body = $('body, html');

		if($($this.attr('href')).length > 0){
			$body.stop().animate({
				scrollTop: $($this.attr('href')).offset().top
			}, 400, "swing");
		}

		$('#menu .current').removeClass('current');
		$this.addClass('current');

		// hash($(this).attr("href"));
	});

	/*************** SCROLL SPY ****************/

	// var sections = [$("#me"), $("#projets"), $("#contact")];
	// var id = false;
	// var scrolled_id;

	// // Donne la classe current au lien de la NAV correspondant avec la section consultée.
	// $("#body").scroll(function(e){
	// 	scrollTop = $(this).scrollTop();

	// 	for (var i in sections){
	// 		var section = sections[i];
	// 		if(scrollTop >= section.offset().top + $("#site-content").scrollTop() - $("#header").height() ) {
	// 			scrolled_id = section.attr("id")
	// 		}
	// 	};

	// 	if(scrolled_id != id){
	// 		id = scrolled_id;
	// 		$menuA.removeClass("current");
	// 		$("a[href='#" + id + "']").addClass("current");

	// 		if(scrolled_id == "contact" && $("#nom").val() == "" ){
	// 			$("#nom").focus();
	// 		}
	// 	}
	// });

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