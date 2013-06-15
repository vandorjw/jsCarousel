/**
 * <jsCarousel> namespace.
 * Author: Joost Vandorp (vandorjw)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 */

/*
 *  TODO/BUG list:
 * 
 * - Currently 'MUST' have at least 3 'slides' in order to work.
 * - Implement a 'pause'/'stop' method.
 * - Implement a 'unpause'/'start' method.
 * - Decide how to style. Likely done using css.
 * - Make touch friendly.  ?? element.event("touch") ??
 * 
 */


window.onload = function() {
	
if ( typeof jsCarousel === "undefined" ){
var jsCarousel = (function() {

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
	var intervalTime = 3500; // time in Microseconds (3.5 sec default)

	/**
	 * -------------------APPLICATION INITIALIZERS --------------------
	 * 
	 * Do not make changes beyond this point. There are no presentation 
	 * values here, only program logic. If you wish to make changes to
	 * the way slides are displayed, please consult the ".css" file.
	 * 
	 * */


	var slides = document.getElementsByClassName('jsCarousel-slide');
	var pslides = document.getElementsByClassName('jsCarousel-pslide');
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
		slides[displayQueue["prev"]].style.display = "none";
		slides[displayQueue["curr"]].style.display ="none";
		slides[displayQueue["next"]].style.display = "none";
		//then remove their id's
		slides[displayQueue["prev"]].setAttribute("id", " ");
		slides[displayQueue["curr"]].setAttribute("id", " ");
		slides[displayQueue["next"]].setAttribute("id", " ");
	}

	function showSlides () {
		//First first set the id's
		slides[displayQueue["prev"]].setAttribute("id", "prev_slide");
		slides[displayQueue["curr"]].setAttribute("id", 'curr_slide');
		slides[displayQueue["next"]].setAttribute("id", 'next_slide');
		//then show the slides
		slides[displayQueue["prev"]].style.display = "inline";
		slides[displayQueue["curr"]].style.display ="inline";
		slides[displayQueue["next"]].style.display = "inline";
	}

	function updateDisplayQueue () {
		// First check direction-of-rotation, to decide which slide
		// should become current slide. Then update next and prev,
		// which are based on current.
		
		if( directionOfRotarion = 1){
			displayQueue["curr"] = displayQueue["next"]; 
		} else{
			displayQueue["curr"] = displayQueue["prev"];
		}
		displayQueue["prev"] = (displayQueue["curr"] - 1 + ns) % ns;
		displayQueue["next"] = (displayQueue["curr"] + 1) % ns;
	}
		  
	return {

		init: function () {
			// hide all slides.
			for (var i = 0; i < ns; i++) {slides[i].style.display ="none";}
			// update the queue
			updateDisplayQueue();
			// show select elements
			showSlides();
		},
		
		play : function () {
			setInterval(function () {
				hideSlides();
				updateDisplayQueue();
				showSlides();
			}, intervalTime);
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
		
	};//return
	
}());// end jsCarousel

jsCarousel.init();
jsCarousel.play();
}// end if
};// window.onload();
