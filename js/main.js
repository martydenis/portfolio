var anchors = $('.section__anchor'),
    currentSection = 0;

$(document).ready(function(){
   /************ Scroll Magic ***********/
   let scrollController = new ScrollMagic.Controller();
   
   new ScrollMagic.Scene({
         duration: "150%",
      })
      .setPin("#hello")
      .addTo(scrollController);

   new ScrollMagic.Scene({
         triggerElement: "#hello",
         triggerHook: 0,
         duration: "60%",
      })
      .setTween("#hello-anim-1", {
         color: '#a4a4a4',
         fontWeight: '100',
         scale: '1',
         y: 0
      })
      .addTo(scrollController);

   $(".hello-anim-p").each(function(index){
      new ScrollMagic.Scene({
         triggerElement: "#hello",
         triggerHook: 0,
         offset: 50+(150*(index+1)),
         duration: "60%",
      })
      .setTween(this, {y: 0, opacity: 1})
      .addTo(scrollController);
   });
   
   // Hello to projects - Black to White
   new ScrollMagic.Scene({
         triggerElement: "#projects",
         triggerHook: 1,
         duration: 500,
         // offset: -600
      })
      .addTo(scrollController)
      .setTween(
         new TimelineMax({delay: 1})
            .add([
               TweenMax.to('#overlay, #projects__intro', 1, {opacity: 1}),
               TweenMax.to('#hello', 1, {opacity: 0})
            ])
      );

   // PROJECTS Mask intro
   let maskTween = new TimelineMax()
      .add([
         TweenMax.to("#projects .pin-wrapper", 1, {
            webkitMaskSize:70000+'px',
            webkitMaskPosition: 46.5+'% ' + 70+'%',
            maskSize:60000+'px',
            maskPosition: 46.5+'% ' + 70+'%',
            ease:Power2.easeIn,
         }),
         TweenMax.to("#projects .pin-wrapper", 1, {
            webkitFilter:'brightness('+1+')',
            filter:'brightness('+1+')',
            ease:Power2.easeOut,
         })
      ]);

   new ScrollMagic.Scene({
         triggerElement: "#projects",
         triggerHook: 0,
         duration: "100%",
      })
      .setTween(maskTween)
      .addTo(scrollController);

   $('.project').each(function(index){
      let text = $(this).find('.section__content'),
          hook = 1,
          pinDuration = '',
          pushFollowers = false,
          wrapper = '#' + $(this).attr('id') + ' .pin-wrapper' ;
      
      //Firstproject
      if(index == 0) {
         hook = 0;
         pinDuration = "200%";
         pushFollowers = true;
      }
      
      // PIN projects
      new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: hook,
            duration: pinDuration,
         })
         .setPin(wrapper, {pushFollowers: pushFollowers})
         .addTo(scrollController);
   
      // Projects text parallax
      new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: hook,
            duration: "200%"
         })
         .setTween(text, {y: -50})
         .addTo(scrollController);
   });

   // DATAVIZ lines
   let dataLines = TweenMax.staggerFromTo(".data-line", 2, {scaleY: 0}, {scaleY: 1, ease:Power2.easeOut}, 0.15);
   new ScrollMagic.Scene({
         triggerElement: "#project__datakillers",
         triggerHook: 1,
         duration: "110%",
      })
      .setTween(dataLines)
      .addTo(scrollController);

   /************* Misc **************/
   // let oldHeight = 0;
   // $(window).on('orientationChange', function(){
      
   //    if(oldHeight != $(window).outerHeigth()){
   //       updateVhValue();
   //    }
   // });

   // updateVhValue();

   $("#menu a").click(function(e){
      // Effectue l'animation du scroll quand cliqué sur un lien de la NAV.
      e.preventDefault();
      let $this = $(this),
          $body = $('body, html'),
          href = $this.attr('href');

      if($(href).length > 0){
         $body.stop().animate({
            scrollTop: $(href).offset().top
         }, 500, "swing");
      }

      // $('.menu .current').removeClass('current');
      // $('.menu a[href="'+href+'"]').parent().addClass('current');
   });

   /*************** SCROLL TROTTLE ****************/
   
   // let now = new Date().getTime();
   // $(window).on('scroll', function() {
   //    if (new Date().getTime() - now > 100) {
   //       updateWithScroll();
   //       now = new Date().getTime();
   //    }
   // });

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

// Update l'état du menu en fonction du scroll
function updateWithScroll() {
   let scrollTop = $(this).scrollTop(),
       sectionsPassed = -1,
       polygon = [[16, 11],[20, 14],[32, 14],[32, 34],[20, 34],[16, 38],[12, 34],[0, 34],[0, 14],[12, 14]];

   anchors.each(function() {
      if(scrollTop + $(window).height()/2 >= $(this).offset().top) {
         sectionsPassed ++;
      }
   });

   if(currentSection != sectionsPassed){
      currentSection = sectionsPassed;
      $('#menu .current').removeClass("current");
      
      let newPath = '';
      for (let index = 0; index < polygon.length; index++) {
         let point = polygon[index];
         if(index != 0)
            newPath += ', '
         newPath += point[0]+ 'px ' + (point[1]+(48*currentSection)) + 'px';
      }

      $('#menu .clip-path').css('clip-path', 'polygon('+newPath+')');
      $("#menu a[href='#" + $(anchors[currentSection]).attr('id') + "']").parent().addClass("current");
   }
}

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