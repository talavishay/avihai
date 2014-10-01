(function () {
Drupal.behaviors.avihai = {
	attach: function (context, settings) {
		var menu_target = null,title = jQuery("#edit-title-field input");
		
			if(jQuery("form.node-form [name=changed]").val() !== ""){
				title.attr("data-original-title", function(v,a){return this.value});
				jQuery("#multiple-node-menu-wrapper input.form-text").each(function(i, val){
					if(jQuery(val).val() === title.attr("data-original-title") ){
						jQuery(val).attr("data-target",1);
						menu_target = val;
					}
				});
			}
			title.bind("change blur keyup", function(e){
				if(window.location.toString().match(/edit/) === null || window.location.toString().match(/edit(.*)add/) !== null){
					jQuery("#edit-menu-link-title,#edit-multiple-node-menu-add-link-link-title").val(jQuery(e.currentTarget).val());
				}else{
					jQuery(menu_target).val(jQuery(e.currentTarget).val());
				}
			});
			
			jQuery("#edit-multiple-node-menu-enabled:not(:checked)").click();
			
			jQuery(".language-link[lang=en]").attr("href", function(a, b){
				return b.replace(/%D7%94%D7%90%D7%A0%D7%A9%D7%99%D7%9D/,"people");
			});
			jQuery(".language-link[lang=he]").attr("href", function(a, b){
				return b.replace(/people/,"האנשים");
			});
	}
}
})();

jQuery(document).ready(function () { 
	Drupal.behaviors.avihai.attach();
	var t1 = window.setTimeout(function(){
		if(jQuery("body").hasClass("admin-menu")){		
			jQuery("#admin-menu [href*=\\/block\\/add]").attr("href",'/'+Drupal.settings.pathPrefix+"node/add/media-block"); 
		}
	},1000);
});
;
Drupal.avishay = {"normal":[],"fluid":[],"prevLayout":"null", "isMSIE" : /*@cc_on!@*/0};
Drupal.avishay.BeforeCurrentLayoutReady = function(){


var menu = jQuery("ul.nice-menu"),
	lang_switch = jQuery( ".language-switcher-locale-url li" );
//insert menu icon to menu
//jQuery("ul",menu).prepend(jQuery( "#home" ));

// ##  language switcher 
jQuery('#en_switch').replaceWith(lang_switch.clone());
jQuery("#block-menu-menu-footer .menu").append(lang_switch.clone());
jQuery("#block-nodeblock-70 li:nth-child(8)").replaceWith(lang_switch.clone());
menu.append( lang_switch);
jQuery('#home').attr("href", "/"+Drupal.settings.pathPrefix);

// ## 	main search input behaviour
var input = jQuery("#edit-search-block-form--2"),
	lang = Drupal.settings.pathPrefix.replace(/\//,"");
Drupal.avishay.search_text= {"en" : "search","he" : "חפשו"};
if(jQuery(".page-search-node").length){
	var term =  decodeURI(window.location.pathname.replace(/(.*)\/node\/(.*)/, "$2"));
	if( term !== "" ){
		Drupal.avishay.search_text= {"en" : term, "he" : term};
		jQuery(input).val(term);
	}
}

if(jQuery(input).val() === "" ){
     jQuery(input).val(Drupal.avishay.search_text[lang]);
 }
jQuery(input).on("click focus", function(e){
    if(jQuery(e.currentTarget).val() === Drupal.avishay.search_text[lang]){
        jQuery(input).val("");
    }
});

// ##  outbound links behaviour   
jQuery('[href^=http]').attr("target","_blank");
jQuery('.i18n-he.node-type-people #page-title').text("האנשים שלנו");
jQuery('.i18n-en.node-type-people #page-title').text("Our People");

};
Drupal.avishay.AfterCurrentLayoutReady = function(){

	// ## 	teams menu adition to people link
	pepole_menu_head = (Drupal.settings.pathPrefix === "en/" )? jQuery(".menu-649") : jQuery(".menu-622") ;
	pepole_menu_head.once().append(Drupal.avishay._get_teams()).addClass("people");
	if(!jQuery("ul.hidden",pepole_menu_head).length){
		pepole_menu_head.each(function(i, val){
			jQuery(val).bind("click", function(e){
				jQuery("ul", val).slideDown();
				pepole_menu_head.unbind();			
			});
		});
	};
	//## # page_people || node_type_people
	var page_people = jQuery("body").hasClass("page-people") ,
		node_type_people = jQuery("body").hasClass("node-type-people"),
		side_menu_block = jQuery('#block-block-6');
	if(page_people || node_type_people){		jQuery(pepole_menu_head).addClass("active-trail");		}
	if( node_type_people){
		var cat = jQuery("article .field-name-field-category a"),
			tid = cat.attr("href").replace(/(.*)term\/(.*)/, '$2');
			
		jQuery("article .field-name-field-category a").replaceWith('<div data-tid="'+tid+'" >'+cat.text()+'</div>');
		jQuery('[data-tid="'+tid+'"]').addClass("active").parent("li").addClass("active-trail");
	}
	//####
	
	var	window_height = jQuery(window).height(),
		page_height =0;
	jQuery("#page > .section").each(function(i, val){page_height= page_height+jQuery(val).height()});
	
	if(window_height>page_height){
			jQuery("#zone-content").css("min-height",370+(window_height-page_height));
	}
}
Drupal.avishay._get_teams = function(){
	if(Drupal.settings.teams){
		var ul = jQuery("<ul></ul>");			
		
		jQuery(Drupal.settings.teams).each(function(i, val){
			var view_path = (Drupal.settings.pathPrefix === "he/") ? "האנשים/" : "people/";
			var href = '/'+Drupal.settings.pathPrefix+view_path+val.tid;
			var attr = {//"id": 'team_'+val.tid,
						"href": href,
						"data-tid": val.tid
						};
				// views - page people -- menu active stat
			var en_regexp = new RegExp('/people/'+val.tid, 'g');
			var he_regexp = new RegExp('/%D7%94%D7%90%D7%A0%D7%A9%D7%99%D7%9D/'+val.tid, 'g');
			
//			var link = jQuery('<li></li>').append(jQuery('<a></a>').attr(attr).text(val.name));
			var link = jQuery('<li></li>').append(jQuery('<a></a>').attr(attr).text(val.name.replace(/&quot;/i ,"\"")));
			
			if( window.location.pathname.match(en_regexp) ||  window.location.pathname.match(he_regexp)){
	
				//console.log("window.location.pathname.match(regexp)");
				jQuery(link).addClass("active-trail");
				jQuery("a", link).addClass("active");
				jQuery(ul).addClass("hidden");
			}		
			active = Drupal.avishay.teams;
			
			jQuery(ul).append(link);		
		});					
	return ul;
	} else {
	return false;
	}
};


jQuery(document).ready(function(){	

jQuery(window).bind('resize', function (a){
	var windowBodyDif = jQuery(window).height()-jQuery("html").height();
	if(Drupal.omega.getCurrentLayout() === "fluid" && windowBodyDif > 0  ){
		var prev_height = jQuery(".responsive-layout-fluid #block-nodeblock-6").height();
		jQuery(".responsive-layout-fluid #block-nodeblock-6").height(prev_height+windowBodyDif);
	};
});

//~ 
//~ (function(){//## MOBILE	#	field slideshow front --- responisive height -- 
//~ var field_slideshow_front_responisive_height = function(){
	//~ if(jQuery("body.front").length){
		//~ jQuery(window).bind('resize', function (a){
			//~ var windowBodyDif = jQuery(window).height()-jQuery("html").height();
			//~ 
		//~ });
	//~ }
//~ };
//~ Drupal.avishay.fluid.push(field_slideshow_front_responisive_height);
//~ })();


(function(){//## MOBILE	#	menu_toggle -- 
var menu_toggle = function(){
	jQuery("#menu_toggle").bind("click", function(e){
				jQuery(".block-nice-menus .content").toggle();	
//				jQuery(e.currentTarget).toggleClass("red");
	}).addClass("bind");
};
Drupal.avishay.fluid.push(menu_toggle);
})();
(function(){// ## 	side menu 
var side_menu_block = function(){
//	console.log("Drupal.avishay.normal.push(side_menu_block);");
if(Drupal.settings.pathPrefix === "en/")	{
	jQuery('#block-block-7').attr("id","block-block-6");
}

var peoplePageClass =  Drupal.settings.pathPrefix === "en/"  ? "page-people" : "page-האנשים";
var page_people = jQuery("body").hasClass(peoplePageClass) ,
	node_type_people = jQuery("body").hasClass("node-type-people"),
	side_menu_block = jQuery('#block-block-6');

	
	
	
if(page_people || node_type_people) { 	
	jQuery(".menu-544,.menu-646,.menu-622").addClass("active-trail");
}
if(side_menu_block.length){
	var side_menu = jQuery('ul.nice-menu > li.active-trail').clone();
	if (!side_menu.length){
		side_menu = jQuery('ul.nice-menu a.active').parents(".active-trail").last().clone();
		side_menu = jQuery('ul.nice-menu a[href="/he/%D7%90%D7%95%D7%93%D7%95%D7%AA/%D7%A9%D7%9C%D7%99%D7%97%D7%95%D7%AA%D7%A0%D7%95"]').first().parents(".active-trail").last().clone();
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
		jQuery(".menuparent a").bind("click",function(e){
			 menu_links_bind(e);
		});
	};	
	Drupal.avishay.fluid.push(touch_menu_links_bind);
})();

jQuery(window).bind('resize', function (a) {
	var CurrentLayout = Drupal.omega.getCurrentLayout();			
	
	if(CurrentLayout !== Drupal.avishay.prevLayout && Drupal.avishay.timestamp !== a.timeStamp){		
		if(CurrentLayout === "narrow"){
			jQuery("body").addClass("responsive-layout-normal");
		}
		Drupal.avishay.BeforeCurrentLayoutReady();

		if(CurrentLayout !== "narrow"){
			jQuery(Drupal.avishay[CurrentLayout]).each(function(i, val){val()});
		}else{
			jQuery(Drupal.avishay.normal).each(function(i, val){ val(); });  
		} 
		
		Drupal.avishay.AfterCurrentLayoutReady();
		
		
		Drupal.avishay.prevLayout = CurrentLayout;
		Drupal.avishay.timestamp = a.timeStamp;
	};
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
	if(typeof(e) !== "undefined"){
		if(jQuery(e.currentTarget).hasClass("clicked") || !jQuery(e.currentTarget).parent("li").hasClass("menuparent") ){
			return true;
		}else { 
			e.preventDefault();
			jQuery(e.currentTarget).addClass("clicked");
			return false;
		}
	}
};
;
