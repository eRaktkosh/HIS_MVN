/**
 * Developer : Aadil
 * Date		 : Apr-2014 
 * USAGE	 : For Writing textBox and textArea text on tooltip having class "tooltipClass".
 */

$(document).ready(function(){
	$('.tooltipClass').tooltip({

		  // tweak the position
		  offset: [10, 2],

		  // use the "slide" effect
		  effect: 'slide'

		// add dynamic plugin with optional configuration for bottom edge
		}).dynamic({ bottom: { direction: 'down', bounce: true } });


		$('.tooltipClass').keyup(function(event){
			$('.tooltip').html($(this).val());
		});

		$('.tooltipClass').focus(function(event){
			$('.tooltip').html($(this).val());
		});
});

