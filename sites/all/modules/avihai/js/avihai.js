
jQuery(document).ready(function () { 
var t1= 	window.setTimeout(function(){

		if(jQuery("body").hasClass("admin-menu")){		
			jQuery("#admin-menu [href*=\\/block\\/add]").attr("href",'/'+Drupal.settings.pathPrefix+"node/add/media-block"); 
		}
		


	},1000);

});
