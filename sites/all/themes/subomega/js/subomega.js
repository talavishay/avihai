Drupal.avishay = {"normal":[],"fluid":[]};Drupal.avishay.isMSIE = /*@cc_on!@*/0;

jQuery(document).ready(function(){	
//console.log("AFTER Drupal.avishay.ready");

var menu = jQuery("#nice-menu-1"),
	lang_switch = jQuery( ".language-switcher-locale-url li" );
// ##  language switcher 
jQuery('#en_switch').replaceWith(lang_switch.clone());
jQuery("#block-menu-menu-footer .menu").append(lang_switch.clone());
menu.append( lang_switch);


(function(){//## MOBILE	#	menu_toggle -- 
var menu_toggle = function(){
	jQuery("#menu_toggle").bind("click", function(e){
				jQuery("#block-nice-menus-1 .content").toggle();	
	});
};
Drupal.avishay.fluid.push(menu_toggle);
})();
(function(){// ## 	main search input behaviour
var input = jQuery("#edit-search-block-form--2"),
	lang = Drupal.settings.pathPrefix.replace(/\//,"");
Drupal.avishay.search_text= {"en" : "search","he" : "חפשו"};

if(jQuery(input).val() === "" ){
     jQuery(input).val(Drupal.avishay.search_text[lang]);
 }
jQuery(input).on("click focus", function(e){
    if(jQuery(e.currentTarget).val() === Drupal.avishay.search_text[lang]){
        jQuery(input).val("");
    }
});
})();   
(function(){// ## 	side menu 
var side_menu_block = function(){
//	console.log("Drupal.avishay.normal.push(side_menu_block);");

var page_people = jQuery("body").hasClass("page-people") ,
	node_type_people = jQuery("body").hasClass("node-type-people"),
	side_menu_block = jQuery('#block-block-6');
	
	
	
	
if(page_people || node_type_people) { 	jQuery(".menu-544").addClass("active-trail");}
if(side_menu_block.length){
	var side_menu = jQuery('#nice-menu-1 > li.active-trail').clone();;
	if (!side_menu.length){
		side_menu = jQuery('.nice-menu a.active').parents(".active-trail").last().clone();
		side_menu = jQuery('.nice-menu a[href="/he/%D7%90%D7%95%D7%93%D7%95%D7%AA/%D7%A9%D7%9C%D7%99%D7%97%D7%95%D7%AA%D7%A0%D7%95"]').first().parents(".active-trail").last().clone();
	}
	// set styling and states
	jQuery("ul, li, a",side_menu).attr("style","");
	jQuery(".active", side_menu).parent("li").addClass("active-trail");
	
	// 	replace block content
	side_menu_block.html(side_menu).css({overflow:"visible",width:"100%",height:"100%"});
	jQuery("body").addClass("block_menu_processed");

}


};
Drupal.avishay.normal.push(side_menu_block);
})();// ## 	END
(function(){// ## 	touch menu behaviour	
	var touch_menu_links_bind = function(){
		jQuery(".menuparent a", menu).bind("click", menu_links_bind());
	};	
	Drupal.avishay.fluid.push(menu_links_bind);
})();
// ## 	END	
Drupal.avishay._get_teams = function(){
	if(Drupal.settings.teams){
		var ul = jQuery("<ul></ul>");			
		
		jQuery(Drupal.settings.teams).each(function(i, val){
			var href = '/people/'+val.tid,
				link = jQuery('<li><a id="team_'
								+val.tid+'" href="/" '
								+'data-tid="'+val.tid+'" '
								+Drupal.settings.pathPrefix.replace(/\//,"")
								+href+'">'
								+val.name+'</a></li>'),
				active = Drupal.avishay.teams;
			
			jQuery(ul).append(link);		
		});					
	return ul;
	} else {
	return false;
	}
};
Drupal.avishay.ready = function(){
	
//console.log("Drupal.avishay.ready => Drupal.avishay.timestamp ");

// ##  outbound links behaviour   
jQuery('[href^=http]').attr("target","_blank");
jQuery('.i18n-he.node-type-people #page-title').text("האנשים");
jQuery('.i18n-en.node-type-people #page-title').text("People");

//## # page_people || node_type_people
var page_people = jQuery("body").hasClass("page-people") ,
	node_type_people = jQuery("body").hasClass("node-type-people"),
	side_menu_block = jQuery('#block-block-6');
if(page_people || node_type_people){		jQuery(".menu-622").addClass("active-trail");		}
if( node_type_people){
	var cat = jQuery("article .field-name-field-category a"),
		tid = cat.attr("href").replace(/(.*)term\/(.*)/, '$2'),
		people_menu = jQuery("");		
	jQuery("article .field-name-field-category a").replaceWith('<div>'+cat.text()+'</div>');	
	jQuery("#team_"+tid, people_menu).addClass("active").parent("li").addClass("active-trail");
}

(function(){// ## 	teams menu adition to people link

pepole_menu_head = jQuery(".menu-622");
pepole_menu_head.append(Drupal.avishay._get_teams());
var hidden = true;

jQuery("a", pepole_menu_head).each(function(i, val){
	var tid = jQuery(val).attr("data-tid");
	var href = '/people/'+tid;
	var regexp = new RegExp(href, 'g');
	if( window.location.pathname.match(regexp)){
		jQuery("a", link).addClass("active").parent("li").addClass("active-trail");
		hidden = false;
	}
});

if(hidden){
	pepole_menu_head.each(function(i, val){
		jQuery(val).bind("click", function(e){
			jQuery("ul", val).slideDown();
			pepole_menu_head.unbind();			
		});
	});
};

})();
//##	END		## teams menu adition to people link ## 
}

jQuery(window).bind('resize', function (a) {
	var CurrentLayout = Drupal.omega.getCurrentLayout();		
	console.log("resize  TO => "+CurrentLayout);
	if(CurrentLayout === "narrow"){
		jQuery("body").addClass("responsive-layout-normal");
	}
	
	jQuery(Drupal.avishay[CurrentLayout]).each(function(i, val){		
		//console.log("resize  TO => "+CurrentLayout);			
	//	console.log(a);
		if(Drupal.avishay.timestamp !== a.timeStamp){			
			val();
			Drupal.avishay.ready();
//			console.log("AFTER Drupal.avishay.ready");
		}
		Drupal.avishay.timestamp = a.timeStamp;
	});
});
jQuery(window).trigger('resize');	




});// ## 	 jQuery document ready END










//make all alt attribute of all images appear as a tooltip/
	//added jquery.ui.tooltip in theme template.php
/*	jQuery(document).tooltip({ items: "img[alt]",
              	content: function () { 
			return jQuery(this).attr("alt"); 
		} 
        });*/
function menu_links_bind(e){
//				e.preventDefault();
	
	if(jQuery(e.currentTarget).hasClass("clicked") || !jQuery(e.currentTarget).parent("li").hasClass("menuparent") ){
		return true;
	}else { 
		e.preventDefault();
		jQuery(e.currentTarget).addClass("clicked");
		return false;
	}
};
