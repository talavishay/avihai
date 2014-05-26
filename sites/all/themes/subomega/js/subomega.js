Drupal.avishay = {};
Drupal.avishay.isMSIE = /*@cc_on!@*/0;

jQuery(document).ready(function(){

// #####    side menu 
//window.setTimeout(function(){
var side_menu = jQuery('#block-block-6');
if(side_menu.length){
	var side_menu = jQuery('#nice-menu-1 > li.active-trail').clone();;
	if (!side_menu.length){
		side_menu = jQuery('.nice-menu a.active').parents(".active-trail").last().clone();
	} 
	if (!side_menu.length){
		side_menu = jQuery('.nice-menu a[href="/he/%D7%90%D7%95%D7%93%D7%95%D7%AA/%D7%A9%D7%9C%D7%99%D7%97%D7%95%D7%AA%D7%A0%D7%95"]').first().parents(".active-trail").last().clone();
	}
jQuery("ul, li, a",side_menu).attr("style","");
//jQuery('.content', side_menu).html(side_menu);
jQuery(".active", side_menu).parent("li").addClass("active-trail");
// replace block content
jQuery("body").addClass("block_menu_processed");
jQuery('#block-block-6').html(side_menu).css({overflow:"visible",width:"100%",height:"100%"});
//},2000);
}

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














