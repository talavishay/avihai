Drupal.avishay = {};
Drupal.avishay.isMSIE = /*@cc_on!@*/0;

jQuery(document).ready(function(){
// #####    main search input behaviour
Drupal.settings.search_text = "חפשו";
var input = jQuery("#edit-search-block-form--2");

if(jQuery(input).val() === "" ){
     jQuery(input).val(Drupal.settings.search_text);
 }
jQuery(input).on("click focus", function(e){
    if(jQuery(e.currentTarget).val() === Drupal.settings.search_text){
        jQuery(input).val("");
    }
});
//jQuery("").bind("click", function(e){
  //  var input_text = jQuery("#views-exposed-form-search-api-solr-page #edit-text");
    //if(jQuery(input_text).val() === Drupal.settings.search_text){
      // jQuery(input_text).val("");
    //}
//});
	
	jQuery('[href^=http]').attr("target","_blank");

	var menu = jQuery("#block-system-main-menu");
	jQuery(menu).bind("click", function(e){
		if(jQuery("body").hasClass("responsive-layout-fluid")){
		e.preventDefault();
		        jQuery('.content', menu).toggle("slide");	
		return false;
		}	
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














