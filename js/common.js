$(document).ready(function() {

	$(document).on("click", function(){
		$(".js-menu").removeClass("is-active");
		$("html").removeClass("has-open-nav");
		$(".js-menu-toggle").removeClass("is-active");
		$(".js-popup").fadeOut(300);
	});

	function scrollFixedElements() {
	    var scroll_left = $(this).scrollLeft();
	    $(".menu").css({
	        left: -scroll_left
	    });
	}
	scrollFixedElements();
	$(window).scroll(function(){
	    scrollFixedElements()
	});

	function itemCustomHeight() {
		var item = $(".js-masonry-custom-height");
		item.each(function(){
			OriginHeight = $(this).attr("data-height"),
			OriginWidth = $(this).attr("data-width"),
			currentWidth = $(this).outerWidth(),
			k = OriginWidth/OriginHeight,
			height = currentWidth/k;
			$(this).css({
				height: height
			});
		});
			
		
	}
	itemCustomHeight();
	$(window).resize(function(){
		itemCustomHeight();
	});
// hover on border
	$(".js-hover").hover(
	  function() {
	    $(".js-hover").addClass("has-hover");
	  }, function() {
	    $(".js-hover").removeClass("has-hover");
	  }
	);

// fullpage.js plugin
	var lengthSections = $(".js-section").length;
	$(".js-nav-all").text(lengthSections);

	var fpage = $('.js-fullpage');
	if (fpage.length) {
		fpage.fullpage({
			anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'],
			// sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
			//navigation: true,
			//navigationPosition: 'right',
			//navigationTooltips: ['First page', 'Second page', 'Third and last page'],
			sectionSelector: '.js-section',
			controlArrows: true,
			verticalCentered: true,
			fixedElements: '.header, .footer',
			responsive: 1,
			easing: 'easeInQuart',
			easingcss3: 'ease-in-out',
			onLeave: function(index, nextIndex, direction){
				$(".js-nav-curent").text(nextIndex);
			},
			afterLoad: function(anchorLink, index){
	            //using index
	            if(index == 1){
	                $(".js-nav-prev").addClass("is-inactive");
	            }
	            else {
	            	$(".js-nav-prev").removeClass("is-inactive");
	            }
	            if(index == lengthSections){
	                $(".js-nav-next").addClass("is-inactive");
	            }
	            else {
	            	$(".js-nav-next").removeClass("is-inactive");
	            }

	            // //using anchorLink
	            // if(anchorLink == 'secondSlide'){
	            //     alert("Section 2 ended loading");
	            // }
	        }
		});

	}

	// function navBtn() {
	// 	var index = $(".js-section.active").index();
	// 	alert(index);
	// }
	//navBtn();

	$(".js-nav-prev").on("click", function(){
		fpage.fullpage.moveSectionUp();
		return false;
	});

	$(".js-nav-next").on("click", function(){
		fpage.fullpage.moveSectionDown();
		return false;
	});

// show/hide menu
	$(".js-menu-toggle").on("click", function(event){
		$(this).toggleClass("is-active");
		$(".js-menu").toggleClass("is-active");
		$("html").toggleClass("has-open-nav");
		event.stopPropagation();
		return false;
	});
	$(".js-menu").on("click", function(event){
		event.stopPropagation();
	});

// masonry init
 	// var $container = $('.js-masonry');
 	// if ($container.length) {
 	// 	$container.imagesLoaded( function() {
 	// 		// initialize
 	// 		$container.masonry({
 	// 			itemSelector: '.js-masonry-item',
 	// 			columnWidth: ".js-masonry-item",
 	// 			gutter: 0
 	// 		});
 	// 	});
 	// }
		
	

 	if ($("#js-masonry-animate").length) {
 		new AnimOnScroll( document.getElementById( 'js-masonry-animate' ), {
 			minDuration : 0.4,
 			maxDuration : 0.7,
 			viewportFactor : 0.2
 		} );
 	}
	
// popups
	$(".js-popup-link").on("click", function(){
		var popup = $(this).attr("href");
		$(".js-popup").fadeOut(300)
		$('[data-popup="'+popup+'"]').fadeIn(300);
		//$('html').addClass("has-open-popup");
		//$("textarea").val($(".item__info").text());
		return false; 
	});

	$(".js-popup-close").on("click", function(){
		$(this).parents(".js-popup").fadeOut(300);
		//$('html').removeClass("has-open-popup");
		return false;
	});
	$(".js-popup .popup__in").on("click", function(event){
		event.stopPropagation();
	});

// validation form
	function validate() {
		$('.js-validate').each(function(){
			if ($(this).length > 0) {
				$(this).validate({
					errorClass: 'has-error',
					rules: {
						username: {
							minlength: 2
						},
						any: {
							minlength: 2
						},
						password: {
							minlength: 5
						},
						confirm_password: {
							minlength: 5,
							equalTo: '#password'
						},
						email: {
							email: true
						},
						tel: {
							minlength: 2,
						},
						address: {
							minlength: 2
						},
						message: {
							minlength: 4
						},
						field: {
							required: true
						},
						// fruit: {
						//   required: true
						// }
					},
					messages: {
						firstname: 'Вас так зовут?',
						lastname: 'У вас такая фамилия?',
						fathername: 'У вас такое отчество?',
						password: {
							required: 'Введите пароль',
							minlength: 'Минимум 5 символов'
						},
						confirm_password: {
							 required: 'Пароли не совпадают',
							 minlength: 'Минимум 5 символов',
							 equalTo: 'Пароли не совпадают'
						},
						email: 'Неверный формат',
						address: 'Это Ваш адрес?',
						any: 'Заполните поле',
						company: 'Заполните поле',
						tel: {
							required: 'Заполните поле',
						},
						message: {
							required: 'Заполните поле',
							minlength: 'Заполните поле'
						}
					}
				});
			}
		});
	}
		
	validate();

// accordion
	$(".js-accordion-title").on("click", function(){
    	if ($(this).parents(".js-accordion").hasClass("is-active")) {
    		$(this).parents(".js-accordion").removeClass("is-active").find(".js-accordion-body").slideUp(200);
    	}
    	else {
    		$(".js-accordion").removeClass("is-active");
    		$(".js-accordion-body").slideUp(200);
    		$(this).parents(".js-accordion").toggleClass("is-active").find(".js-accordion-body").slideToggle(200);
    	}
    	
    	return false;
    });
  //   $(".js-accordion-title").hover(
		// function() {
		// 	$(".js-accordion").removeClass("is-active");
  //   		$(".js-accordion-body").slideUp();
  //   		$(this).parents(".js-accordion").toggleClass("is-active").find(".js-accordion-body").slideToggle();
		// }, function() {
		// 	$(this).parents(".js-accordion").removeClass("is-active").find(".js-accordion-body").slideUp();
		// }
  //   );

	$(".js-brand").on("click", function(){
		var top = $(this).offset().top,
			left = $(this).offset().left,
			win = $(this).attr("data-brand"),
			width = $("."+win).outerWidth(),
			height = $("."+win).outerHeight(),
			parent = $(".out");
		$(".js-window").hide().removeAttr("style");

		if (parent.width()-left < width) {

			$("."+win).css({
				top: top,
				left: 'auto',
				right: 0
			}).fadeIn(500);

			if (parent.width()-left < width && parent.height()-top < height) {
				$("."+win).css({
					top: 'auto',
					left: 'auto',
					right: 0,
					bottom: 0
				}).fadeIn(500);
			}
			
		}

		else if (parent.height()-top < height) {
			$("."+win).css({
				top: 'auto',
				left: left,
				right: 'auto',
				bottom: 0
			}).fadeIn(500);
		}
		
		else {
			$("."+win).css({
				top: top,
				left: left
			}).fadeIn(500);
		}
		
		return false;
	});
	$(".js-window-close").on("click", function(){
		$(".js-window").hide().removeAttr("style");
		return false;
	});

	$(window).scroll(function(){
		var scroll = $(document).scrollTop(),
			k1 = scroll/8,
			k2 = scroll/2,
			k3 = scroll/5;
		$(".js-col1").css({
			top: -k1,
		});
		$(".js-col2").css({
			top: -k2,
		});
		$(".js-col3").css({
			top: -k3,
		});
	});

	$(".js-hide-message").on("click", function(){
		$(this).parents(".js-message").fadeOut(300);
		return false;
	});

});