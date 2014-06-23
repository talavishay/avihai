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
