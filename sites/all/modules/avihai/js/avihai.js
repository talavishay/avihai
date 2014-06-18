
jQuery(document).ready(function () { 
	
		jQuery("#edit-title-field input").bind("change blur keyup", function(e){
			jQuery("#edit-menu-link-title").val(jQuery(e.currentTarget).val());
		});
	
var t1= 	window.setTimeout(function(){

		if(jQuery("body").hasClass("admin-menu")){		
			jQuery("#admin-menu [href*=\\/block\\/add]").attr("href",'/'+Drupal.settings.pathPrefix+"node/add/media-block"); 
		}
		


	},1000);

});
