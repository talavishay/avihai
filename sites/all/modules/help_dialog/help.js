(function (jQuery) {
Drupal.behaviors.exampleModule = {
	attach: function (context, settings) {
		jQuery("a[data-help]").once().on("click",function(e){
			e.preventDefault();			
			var title = jQuery(e.currentTarget).text();
			var data_help = jQuery(e.currentTarget).attr("data-help");
			/* here you can specify the url */
			var url = '/sites/all/modules/help_dialog/docs/'+data_help;		 
			/* show the image loader */
			//jQuery('#imgLoader').show();			 
			jQuery.ajax({
				url: url,
				success: function( data ) {
					jQuery("<div></div>").html(data).dialog({
						title: title,
						width: '80%',
						height: 400,
					}).dialog('open').dialogExtend({
						"dblclick" : "maximize",
						"icons" : { "maximize" : "ui-icon-arrow-4-diag" },
						"minimizable" : true,
						"maximizable" : true,
						"maximize" : 	function(evt, dlg){ 
											jQuery(this).parent(".ui-dialog").css("top","50px") ;
										},
						"load" : function(evt, dlg){ 
											Drupal.behaviors.exampleModule.attach();
										},
					});
		//          jQuery('#imgLoader').hide();            /* hide the image loader */
				}
			});
			return false;
		});

	}
};
})(jQuery);
