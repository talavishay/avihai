
Drupal.avishay = {};
Drupal.avishay.isMSIE = /*@cc_on!@*/0;

jQuery(document).ready(function(){
// #####    side menu 
//window.setTimeout(function(){
var page_people = jQuery("body").hasClass("page-people") ;
var node_type_people = jQuery("body").hasClass("node-type-people");

if(page_people || node_type_people) { 
	jQuery(".menu-544").addClass("active-trail");
}

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
if( node_type_people){
	var cat = jQuery("article .field-name-field-category a");
	var tid = cat.attr("href").replace(/(.*)term\/(.*)/, '$2');
	jQuery("article .field-name-field-category a").replaceWith('<div>'+cat.text()+'</div>');
	jQuery("#team_"+tid, people_menu).addClass("active").parent("li").addClass("active-trail");
}
//pepole page
if(page_people || node_type_people){

	var people_menu = jQuery(".view-teams > div ");
	jQuery("a", people_menu).each(function(i, val){
		if(jQuery(val).attr("href") ==	window.location.pathname){
			jQuery(val).addClass("active");
		}
	});
	jQuery(".menu-622").append(people_menu.html()).addClass("active-trail");
	jQuery("#block-views-teams-block").remove();
}

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

//	var menu = jQuery("#block-system-main-menu");
	jQuery("#menu_toggle").bind("click", function(e){
		        jQuery("#block-nice-menus-1 .content").toggle();	
	});

var menu = jQuery("#nice-menu-1");
var lang_switch = jQuery( ".language-switcher-locale-url li" );
jQuery('#en_switch').replaceWith(lang_switch.clone());
jQuery("#block-menu-menu-footer .menu").append(lang_switch.clone());
menu.append( lang_switch);
jQuery(".responsive-layout-fluid .menuparent a", menu).bind("click", function(e){
        if(jQuery(e.currentTarget).hasClass("clicked") || !jQuery(e.currentTarget).parent("li").hasClass("menuparent") ){
	        return true;
        }else { 
        	e.preventDefault();
	        jQuery(e.currentTarget).addClass("clicked");
        return false;
}
});
	
	//make all alt attribute of all images appear as a tooltip/
	//added jquery.ui.tooltip in theme template.php
/*	jQuery(document).tooltip({ items: "img[alt]",
              	content: function () { 
			return jQuery(this).attr("alt"); 
		} 
        });*/
});














	
