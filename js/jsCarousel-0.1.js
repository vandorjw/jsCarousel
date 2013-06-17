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
    "use strict";
    if (window.jsCarousel === undefined) {
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
            // when passed as string , it is a possition 
            if( typeof newcurrent === "string"){
                displayQueue.curr = parseInt(newcurrent,10);
            }
            //when passed as number, it is direction of rotarion
            else if( typeof newcurrent === "number"){
                if( newcurrent === 1){
                    displayQueue.curr = displayQueue.next;
                } else{
                    displayQueue.curr = displayQueue.prev;
                }
            }
            else { 
                if( directionOfRotarion === 1){
                    displayQueue.curr = displayQueue.next;
                } else{
                        displayQueue.curr = displayQueue.prev;
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

                var player = setInterval(playEvents, intervalTime);

                document.body.onclick= function(evt){
                    evt = window.event ? evt.srcElement : evt.target;
                    if( evt.className === "jsCarousel-pslide"){
                        clearInterval(player);
                        hideSlides();
                        updateDisplayQueue(evt.alt);
                        showSlides();
                        player = setInterval(playEvents, intervalTime);
                    }
                    else if( evt.id==="jsCarousel-next"){
                       clearInterval(player);
                        hideSlides();
                        updateDisplayQueue(1);
                        showSlides();
                        player = setInterval(playEvents, intervalTime);
                    }
                    else if( evt.id==="jsCarousel-prev"){
                        clearInterval(player);
                        hideSlides();
                        updateDisplayQueue(0);
                        showSlides();
                        player = setInterval(playEvents, intervalTime);
                    }
                };
            }
        };
    }());
    jsCarousel.init();
    jsCarousel.play();
    }
};

