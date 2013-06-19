/**
 * <jsCarousel> namespace.
 * Author: Joost Vandorp (vandorjw)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * Jslint Validation: set 'assume... a browser to true'
 */

window.onload = function() {
    "use strict";
    if (window.jsCarousel === undefined) {

        var jsCarousel = (function() {
            var directionOfRotarion = 1, // 1 count-up, 0 count-down
                intervalTime = 3500, // time in microseconds
                slides = document.getElementsByClassName('jsCarousel-slide'),
                containerSlides = document.getElementById('pslidescontainer'),
                containerPSlides = document.getElementById('pslidescontainer'),
                ns = slides.length,
                displayQueue = {
                    prev: 0, // stores slide ids.
                    curr: 0, // managed by updateDisplayQueue
                    next: 0
                };

            function hideSlides() {
                //hide, then remove attribute to avoid display glitch
                slides[displayQueue.prev].style.display = "none";
                slides[displayQueue.curr].style.display = "none";
                slides[displayQueue.next].style.display = "none";
                slides[displayQueue.prev].setAttribute("id", " ");
                slides[displayQueue.curr].setAttribute("id", " ");
                slides[displayQueue.next].setAttribute("id", " ");
            }

            function showSlides() {
                //set proper attribute, then display slide to avoid glitch
                slides[displayQueue.prev].setAttribute("id", "prev_slide");
                slides[displayQueue.curr].setAttribute("id", 'curr_slide');
                slides[displayQueue.next].setAttribute("id", 'next_slide');
                slides[displayQueue.prev].style.display = "inline";
                slides[displayQueue.curr].style.display = "inline";
                slides[displayQueue.next].style.display = "inline";
            }

            function updateDisplayQueue(newcurrent) {
                if (typeof newcurrent === "string") {
                    // when passed as string , it is a possition
                    displayQueue.curr = parseInt(newcurrent, 10);
                } else if (typeof newcurrent === "number") {
                    //when passed as number, it is direction of rotarion
                    if (newcurrent === 1) {
                        displayQueue.curr = displayQueue.next;
                    } else {
                        displayQueue.curr = displayQueue.prev;
                    }
                } else {
                    if (directionOfRotarion === 1) {
                        //forward or counting up
                        displayQueue.curr = displayQueue.next;
                    } else {
                        //count backwards
                        displayQueue.curr = displayQueue.prev;
                    }
                }
                //extra ns on prev is required. number is wrong when negative
                displayQueue.prev = (displayQueue.curr - 1 + ns) % ns;
                displayQueue.next = (displayQueue.curr + 1) % ns;
            }

            return {
                init: function () {
                    var i;

                    for (i = 0; i < ns; i = i + 1) {
                        slides[i].style.display = "none";
                    }

                    containerPSlides.style.display = "block";
                    containerSlides.style.display = "block";
                    updateDisplayQueue();
                    showSlides();
                },

                play : function () {
                    function playEvents() {
                        hideSlides();
                        updateDisplayQueue();
                        showSlides();
                    }

                    var player = setInterval(playEvents, intervalTime);

                    document.body.onclick = function(evt) {
                        evt = window.event ? evt.srcElement : evt.target;
                        if (evt.className === "jsCarousel-pslide") {
                            clearInterval(player);
                            hideSlides();
                            updateDisplayQueue(evt.alt);
                            showSlides();
                            player = setInterval(playEvents, intervalTime);
                        } else if (evt.id === "jsCarousel-next") {
                            clearInterval(player);
                            hideSlides();
                            updateDisplayQueue(1);
                            showSlides();
                            player = setInterval(playEvents, intervalTime);
                        } else if (evt.id === "jsCarousel-prev") {
                            clearInterval(player);
                            hideSlides();
                            updateDisplayQueue(0);
                            showSlides();
                            player = setInterval(playEvents, intervalTime);
                        }
                    };
                }
                //add aditional functions as required.
            };
        }());
        jsCarousel.init();
        jsCarousel.play();
    }
};
