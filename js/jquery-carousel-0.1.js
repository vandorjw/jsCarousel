/**
 * <jQueryCarousel> namespace.
 *
 * This JavaScript Application Makes use of jQuery 1.9.x
 * Earlier versions or previous versions may not work correctly.
 * 
 * The right to use this software is inherited and governt by the jQuery
 * licence, which at the time of writing this is the MIT Licence.
 * 
 * https://raw.github.com/jquery/jquery/master/MIT-LICENSE.txt
 */
 
if ( typeof jQueryCarousel === "undefined" ){

var jQueryCarousel = (function() {

	/*
	 *  Private Variables
	 */

	/** 
	 * -------------------APPLICATION SETTINGS-------------------------
	 * 
	 * Feel free to modify these settings but make sure 
	 * to give reasonable values. Do not input a string where the
	 * default value is a number.
	 * 
	 * */

	var directionOfRotarion = 0; //Clockwise:0 ; CounterClockWise:1
	var intervalTime = 5000; // time in Microseconds (5 sec default)

	/**
	 * -------------------APPLICATION INITIALIZERS --------------------
	 * 
	 * Do not make changes beyond this point. There are no presentation 
	 * values here, only program logic. If you wish to make changes to
	 * the way slides are displayed, please consult the ".css" file.
	 * 
	 * */

	//var slides = $(".slide");
	var slides = $('.slide');
	var pslides = $('.pslide');
	var ns = slides.length;
	var displayQueue = {
		prev:0,
		curr:0,
		next:0
	}; 

	/* 
	 * Private Functions
	 */

	function hideSlides () {
		//First hide the slides
		$(slides[displayQueue["prev"]]).hide();
		$(slides[displayQueue["curr"]]).hide();
		$(slides[displayQueue["next"]]).hide();
		//then remove their id's
		$(slides[displayQueue["prev"]]).attr("id", " ");
		$(slides[displayQueue["curr"]]).attr("id", " ");
		$(slides[displayQueue["next"]]).attr("id", " ");
	}

	function showSlides () {
		//First first set the id's
		console.log("Debug - slide prev: " + $(slides[displayQueue["prev"]]).src);
		console.log("Debug - slide curr: " + $(slides[displayQueue["curr"]]).src);
		console.log("Debug - slide next: " + $(slides[displayQueue["next"]]).src);
		
		
		$(slides[displayQueue["prev"]]).attr("id", "prev_slide");
		$(slides[displayQueue["curr"]]).attr("id", 'curr_slide');
		$(slides[displayQueue["next"]]).attr("id", 'next_slide');
		//then show the slides
		$(slides[displayQueue["prev"]]).show();
		$(slides[displayQueue["curr"]]).show();
		$(slides[displayQueue["next"]]).show();
	}

	function updateDisplayQueue () {
		// First check direction-of-rotation, to decide which slide
		// should become current slide. Then update next and prev,
		// which are based on current.
		
		if( directionOfRotarion = 0){
			displayQueue["curr"] = displayQueue["next"]; 
		} else{
			displayQueue["curr"] = displayQueue["prev"];
		}
		displayQueue["prev"] = (displayQueue["curr"] - 1 + ns) % ns;
		displayQueue["next"] = (displayQueue["curr"] + 1) % ns;
	}

	return {

		init: function () {

			console.log("::Start Init::");
			console.log("init should be aware of the following variables:");
			console.log("ns : " + ns);
			console.log("intervalTime: " + intervalTime);
			console.log("slides: " + slides);

			updateDisplayQueue();

			//Hide all the slide exept
			for (var i = 0; i < ns; i++) {
				console.log("Init debug, beging listing slide source.");
				console.log(slides[i].src);
				slides[i].hide();
			}
			
			showSlides();
			//call play
			console.log("::End Init::");
		},
		
		play : function () {
			// copy this to that to make it available to inner functions
			var that = this;
			
			//debugging statement
			console.log(that);
			
			//loop every 'intervalTime' microseconds
			setInterval(function () {
				//discover a method to "break out"
				that.hideSlides();
				that.updateDisplayQueue();
				that.showSlides();
			}, that.intervalTime);
		},
		
		pause: function () {
			//pass
		},
		
		stop: function () {
			//pass
		},
		
		start: function () {
			//pass
		}
		
	};
}()); 	// end jQueryCarousel

//run!
jQueryCarousel.init();

}	// end if
