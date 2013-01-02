(function($){

	$.fn.glare = function(options) {
	
        var width = $(window).width();
        var height = $(window).height();

		var settings = $.extend( {
			debug:false
		}, options);

        $(window).on("devicemotion", function(error){
	                   
	        //read accelerometer data, filter to reasonable numbers between 0 and 1
	        var backgroundPositionXOffset = 1 - ((event.accelerationIncludingGravity.x + 10)/20).toString().substring(0,4); //invert the x axis
	        var backgroundPositionYOffset = ((event.accelerationIncludingGravity.y + 10)/20).toString().substring(0,4);
	        var backgroundPositionZOffset = (((event.accelerationIncludingGravity.z + 10)/20) * 100).toString().substring(0,4);

	        //make it so that the x axis tends towards the center
	        var x = backgroundPositionXOffset;
	       	var modifiedX = (4 * x * x * x) 
	       		      - (6 * x * x) 
	       		      + (3 * x);

	       	//make it so the y axis tends towards the edges
	        var y = backgroundPositionYOffset;
			var modifiedY = (1/2) 
				      + (0.205 * ((2 * y) - 1)) 
				      * (4 - ((Math.pow(Math.pow((((14*y) -7) /10),2), (1/3)))) - (2 *((Math.pow(Math.pow(	(((14*y) -7) /10),8), (1/3))))));

			//determine percentage values for each gradient.
			//point 1 is always 0%, point 5 is always 100%;
			//the center point (a) is determined by the accelerometer + filtering above
			//the lower point (b) and the upper point (c) are a scaled value
			var modifiedXa = modifiedX;
			var modifiedXb = modifiedXa - ((3 * modifiedXa) / 3) * (1 - modifiedXa);
			var modifiedXc = modifiedXa + ((3 * modifiedXa) / 3) * (1 - modifiedXa);

			var modifiedYa = modifiedY;
			var modifiedYb = modifiedYa - ((3 * modifiedYa) / 3) * (1 - modifiedYa);
			var modifiedYc = modifiedYa + ((3 * modifiedYa) / 3) * (1 - modifiedYa);

			//eliminate extreme errant values of greater than 1 or less than 0 values
			modifiedXb = (modifiedXb < 0) ? 0 : modifiedXb;
			modifiedXc = (modifiedXc > 1) ? 1 : modifiedXc;
			modifiedYb = (modifiedYb < 0) ? 0 : modifiedYb;
			modifiedYc = (modifiedYc > 1) ? 1 : modifiedYc;


			//convenience to adjust gradient color
			//gradient should always be black, as it is used for a mask
	        var rgbString = "0,0,0";

	        //minimum alpha value
	        //set to 0 for complete masking
	        var stopAlpha = ".1";

	        //use device width and height to determine where the percentage-based intesection is of the two gradients
	        var intersectionX = width * modifiedX;
	        var intersectionY = height * modifiedY;
	        
	        //calculate the external stop radius of the radial mask, never exceeding 50% of the page
	        var stopRadialPercentage = ((modifiedX * 100) > 50) ? 100 - (modifiedX * 100) : (modifiedX * 100);

	        //apply the masks
	        //TODO: figure out why jquery sucks at gradients with line-breaks, to make this more legible
	        $("body").css(
	        	{
	        		'-webkitMaskImage': "-webkit-gradient(linear, left top, left bottom, color-stop(0, rgba("+rgbString+",0)), color-stop("+modifiedYb+", rgba("+rgbString+","+stopAlpha+")), color-stop("+modifiedYa+", rgba("+rgbString+",1)), color-stop("+modifiedYc+", rgba("+rgbString+","+stopAlpha+")), color-stop(1, rgba("+rgbString+",0))),-webkit-gradient(linear, left bottom, right bottom, color-stop(0, rgba("+rgbString+",0)), color-stop("+modifiedXb+", rgba("+rgbString+","+stopAlpha+")), color-stop("+modifiedX+", rgba("+rgbString+",1)), color-stop("+modifiedXc+", rgba("+rgbString+","+stopAlpha+")), color-stop(1, rgba("+rgbString+",0))), -webkit-radial-gradient("+intersectionX+"px "+intersectionY+"px, ellipse cover, rgba(0,0,0,1) 0%,rgba(0,0,0,0) "+stopRadialPercentage+"%,rgba(0,0,0,0) 100%)"
	        	}
	        );

	        //output some debug information
	        if(settings.debug === true) {
		        $("#data").html(
		        	"x-axis: " + modifiedX + "<br />" +
		        	"y-axis: " + modifiedY + "<br />" +
		        	"z-axis: " + backgroundPositionZOffset + "<br />" +
		        	"yb: " + modifiedYb + "<br />" +
		        	"ya: " + modifiedYa + "<br />" +
		        	"yc: " + modifiedYc + "<br />"
		        );
		    }

		});
		
	};

})(jQuery);
