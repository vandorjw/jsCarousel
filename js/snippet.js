function set_slide_value(slideArray, ns) {
    /*
     * SlideArray keeps track of which image should be in which possition.
     * The modulus operator in JS is broken and cannot do negative numbers
     * properly. That is why we add an extra 'ns' to avoid going negative.
     * Notice: I do no error checking. current should already be set.
     * 
     * ns = number of slides we are working with (Integer)
     * slideArray = NOT what contains all the slides.
     *            \-> Instead, it contains the current, the next, and previous. 
     */
        slideArray.visiprev = (slideArray.current - 1 + ns) % ns;
        slideArray.visinext = (slideArray.current + 1) % ns;

    
    return slideArray;
    }

    $(document).ready(function () {
    
        (function () {
            //dictionary of all the slides elements
            var slides = $('.slide');
            //dictionary of all the thumbnails elements
            var pslides = $('.pslide');
            //key-value index keeping track of current, prev and next.
            var associativeSlideArray = {};
            associativeSlideArray.visiprev = 0;
            associativeSlideArray.current = 0;
            associativeSlideArray.visinext = 0;

            //Value is used very often and is expensive to recalc.
            var num_slides = slides.length;

            //Ain't no one got time for a slide-show without slides...
            if (num_slides > 0) {

                //Quickly, hide yo kids, hide yo wife, hide yo pictures!
                for (var i = 0; i < num_slides; i++) {
                    $(slides[i]).hide();
                }
                
                //Grab the correct display order
                associativeSlideArray = set_slide_value(associativeSlideArray, num_slides);
                //Set the proper attributes on the first 
                
                $(slides[associativeSlideArray.visiprev]).attr("id", "prev_slide");
                $(slides[associativeSlideArray.current]).attr("id", 'curr_slide');
                $(slides[associativeSlideArray.visinext]).attr("id", 'next_slide');

                //Display those slides we want to see.
                $(slides[associativeSlideArray.visiprev]).show();
                $(slides[associativeSlideArray.current]).show();
                $(slides[associativeSlideArray.visinext]).show();
                

                setInterval(function () {
                    /*
                     * Currently we only loop in the forward direction.
                     * To loop backwards, we should place some fancy math in set_slide_value()
                     * This currently fails spectacularly when we have less than 3 slides!
                     */

                    $(slides[associativeSlideArray.visiprev]).hide();
                    $(slides[associativeSlideArray.current]).hide();
                    $(slides[associativeSlideArray.visinext]).hide();
                    
                    //need to remove attributes AFTER we HIDE, or we glitch!
                    $(slides[associativeSlideArray.visinext]).attr("id", " ");
                    $(slides[associativeSlideArray.visiprev]).attr("id", " ");
                    $(slides[associativeSlideArray.current]).attr("id", " ");

                    //Quick, update the slide order!
                    associativeSlideArray.current = associativeSlideArray.visinext;
                    associativeSlideArray = set_slide_value(associativeSlideArray, num_slides);

                    //need to set attributes BEFORE we SHOW, or we glitch!
                    $(slides[associativeSlideArray.visiprev]).attr("id", "prev_slide");
                    $(slides[associativeSlideArray.current]).attr("id", 'curr_slide');
                    $(slides[associativeSlideArray.visinext]).attr("id", 'next_slide');

                    $(slides[associativeSlideArray.visiprev]).show();
                    $(slides[associativeSlideArray.current]).show();
                    $(slides[associativeSlideArray.visinext]).show();

                }, 5000); // The last value is the microseconds on how often we repeat 

                $(".pslide").click(function (evt) {
                    for (var ii = 0; ii < num_slides; ii++) {
                        if (pslides[ii].src == evt.currentTarget.src) {
                        
                            $(slides[associativeSlideArray.visiprev]).hide();
                            $(slides[associativeSlideArray.current]).hide();
                            $(slides[associativeSlideArray.visinext]).hide();
                    
                            //need to remove attributes AFTER we HIDE, or we glitch!
                            $(slides[associativeSlideArray.visinext]).attr("id", " ");
                            $(slides[associativeSlideArray.visiprev]).attr("id", " ");
                            $(slides[associativeSlideArray.current]).attr("id", " ");
                        
                        
                            associativeSlideArray.current = ii;
                            associativeSlideArray = set_slide_value(associativeSlideArray, num_slides);
                            
                            //need to set attributes BEFORE we SHOW, or we glitch!
                            $(slides[associativeSlideArray.visiprev]).attr("id", "prev_slide");
                            $(slides[associativeSlideArray.current]).attr("id", 'curr_slide');
                            $(slides[associativeSlideArray.visinext]).attr("id", 'next_slide');

                            $(slides[associativeSlideArray.visiprev]).show();
                            $(slides[associativeSlideArray.current]).show();
                            $(slides[associativeSlideArray.visinext]).show();
                        }
                    }
                });
            }
        })();
    });
