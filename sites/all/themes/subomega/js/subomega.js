Drupal.avishay = {};
Drupal.avishay.isMSIE = /*@cc_on!@*/0;

jQuery(document).ready(function(){
	
	jQuery('[href^=http]').attr("target","_blank");
	var menu = jQuery("#block-system-main-menu");
	jQuery(menu).bind("click", function(e){
			e.preventDefault();
	        jQuery('.content', menu).toggle("slide");	
			return false;
	});

	jQuery(".menu",menu).append( jQuery( ".language-switcher-locale-url li" ));
	
	//make all alt attribute of all images appear as a tooltip/
	//added jquery.ui.tooltip in theme template.php
/*	jQuery(document).tooltip({ items: "img[alt]",
              	content: function () { 
			return jQuery(this).attr("alt"); 
		} 
        });*/
});














