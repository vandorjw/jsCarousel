/**
 * <jsCarousel> namespace.
 * Author: Joost Vandorp (vandorjw)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
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

    var directionOfRotarion = 1;
    var intervalTime = 3500;
    
    /**
     * -------------------APPLICATION INITIALIZERS --------------------
     * 
     * Do not make changes beyond this point. There are no presentation 
     * values here, only program logic. If you wish to make changes to
     * the way slides are displayed, please consult the ".css" file.
     * 
     * */

    var slides = document.getElementsByClassName('jsCarousel-slide');
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
        slides[displayQueue.prev].style.display = "none";
        slides[displayQueue.curr].style.display ="none";
        slides[displayQueue.next].style.display = "none";
        slides[displayQueue.prev].setAttribute("id", " ");
        slides[displayQueue.curr].setAttribute("id", " ");
        slides[displayQueue.next].setAttribute("id", " ");
    }

    function showSlides () {
        slides[displayQueue.prev].setAttribute("id", "prev_slide");
        slides[displayQueue.curr].setAttribute("id", 'curr_slide');
        slides[displayQueue.next].setAttribute("id", 'next_slide');
        slides[displayQueue.prev].style.display = "inline";
        slides[displayQueue.curr].style.display ="inline";
        slides[displayQueue.next].style.display = "inline";
    }

    function updateDisplayQueue (newcurrent) {
        if(typeof newcurrent === "number" && newcurrent >= 0 && newcurrent <= ns){
            console.log("newcurrent: " + newcurrent);
            displayQueue.curr = newcurrent;
            console.log("displayQueue.curr: " + displayQueue.curr);
        } 
        else {
            if( directionOfRotarion === 1){
                displayQueue.curr = displayQueue.next;
                console.log("Forward Current: " + newcurrent);
            } else{
                displayQueue.curr = displayQueue.prev;
                console.log("Backwards Current: " + newcurrent);
            }
        }
        displayQueue.prev = (displayQueue.curr - 1 + ns) % ns;
        displayQueue.next = (displayQueue.curr + 1) % ns;
    }
          
    return {

        init: function () {
            var i;
            
            for (i = 0; i < ns; i=i+1) {
                slides[i].style.display = "none";
            }
            updateDisplayQueue();
            showSlides();
        },

        play : function () {
            function playEvents() {
                hideSlides();
                updateDisplayQueue();
                showSlides();}

            var i, timeout, player = setInterval(playEvents, intervalTime);

            document.body.onclick= function(evt){
                evt=window.event? event.srcElement: evt.target;
                if( evt.className && evt.className.indexOf('jsCarousel-pslide')!=-1){
                    clearInterval(player);
                    hideSlides();
                    updateDisplayQueue(parseInt(evt.alt,10));
                    showSlides();
                    player = setInterval(playEvents, intervalTime);
                }
            }
        }
    };
}());
jsCarousel.init();
jsCarousel.play();

pslides = document.getElementsByClassName('jsCarousel-pslide');
pslides[0].click();
}
};

