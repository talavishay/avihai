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
(function() {
  var $;

  $ = jQuery;

  $.widget("ui.dialogExtend", {
    version: "2.0.0",
    modes: {},
    options: {
      "closable": true,
      "dblclick": false,
      "titlebar": false,
      "icons": {
        "close": "ui-icon-closethick",
        "restore": "ui-icon-newwin"
      },
      "load": null,
      "beforeRestore": null,
      "restore": null
    },
    _create: function() {
      this._state = "normal";
      if (!$(this.element[0]).data("ui-dialog")) {
        $.error("jQuery.dialogExtend Error : Only jQuery UI Dialog element is accepted");
      }
      this._verifyOptions();
      this._initStyles();
      this._initButtons();
      this._initTitleBar();
      this._setState("normal");
      this._on("load", function(e) {
        return console.log("test", e);
      });
      return this._trigger("load");
    },
    _setState: function(state) {
      $(this.element[0]).removeClass("ui-dialog-" + this._state).addClass("ui-dialog-" + state);
      return this._state = state;
    },
    _verifyOptions: function() {
      var name, _ref, _results;

      if (this.options.dblclick && !(this.options.dblclick in this.modes)) {
        $.error("jQuery.dialogExtend Error : Invalid <dblclick> value '" + this.options.dblclick + "'");
        this.options.dblclick = false;
      }
      if (this.options.titlebar && ((_ref = this.options.titlebar) !== "none" && _ref !== "transparent")) {
        $.error("jQuery.dialogExtend Error : Invalid <titlebar> value '" + this.options.titlebar + "'");
        this.options.titlebar = false;
      }
      _results = [];
      for (name in this.modes) {
        if (this["_verifyOptions_" + name]) {
          _results.push(this["_verifyOptions_" + name]());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    _initStyles: function() {
      var name, style, _results;

      if (!$(".dialog-extend-css").length) {
        style = '';
        style += '<style class="dialog-extend-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-buttonpane>a { float: right; }';
        style += '.ui-dialog .ui-dialog-titlebar-restore { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-restore span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-restore:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-restore:focus { padding: 0; }';
        style += '.ui-dialog .ui-dialog-titlebar ::selection { background-color: transparent; }';
        style += '</style>';
        $(style).appendTo("body");
      }
      _results = [];
      for (name in this.modes) {
        _results.push(this["_initStyles_" + name]());
      }
      return _results;
    },
    _initButtons: function() {
      var buttonPane, mode, name, titlebar, _ref,
        _this = this;

      titlebar = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar");
      buttonPane = $('<div class="ui-dialog-titlebar-buttonpane"></div>').appendTo(titlebar);
      buttonPane.css({
        "position": "absolute",
        "top": "50%",
        "right": "0.3em",
        "margin-top": "-10px",
        "height": "18px"
      });
      titlebar.find(".ui-dialog-titlebar-close").css({
        "position": "relative",
        "float": "right",
        "top": "auto",
        "right": "auto",
        "margin": 0
      }).find(".ui-icon").removeClass("ui-icon-closethick").addClass(this.options.icons.close).end().appendTo(buttonPane).end();
      buttonPane.append('<a class="ui-dialog-titlebar-restore ui-corner-all ui-state-default" href="#"><span class="ui-icon ' + this.options.icons.restore + '">restore</span></a>').find('.ui-dialog-titlebar-restore').attr("role", "button").mouseover(function() {
        return $(this).addClass("ui-state-hover");
      }).mouseout(function() {
        return $(this).removeClass("ui-state-hover");
      }).focus(function() {
        return $(this).addClass("ui-state-focus");
      }).blur(function() {
        return $(this).removeClass("ui-state-focus");
      }).end().find(".ui-dialog-titlebar-close").toggle(this.options.closable).end().find(".ui-dialog-titlebar-restore").hide().click(function(e) {
        e.preventDefault();
        return _this.restore();
      }).end();
      _ref = this.modes;
      for (name in _ref) {
        mode = _ref[name];
        this._initModuleButton(name, mode);
      }
      return titlebar.dblclick(function(evt) {
        if (_this.options.dblclick) {
          if (_this._state !== "normal") {
            return _this.restore();
          } else {
            return _this[_this.options.dblclick]();
          }
        }
      }).select(function() {
        return false;
      });
    },
    _initModuleButton: function(name, mode) {
      var buttonPane,
        _this = this;

      buttonPane = $(this.element[0]).dialog("widget").find('.ui-dialog-titlebar-buttonpane');
      return buttonPane.append('<a class="ui-dialog-titlebar-' + name + ' ui-corner-all ui-state-default" href="#"><span class="ui-icon ' + this.options.icons[name] + '">' + name + '</span></a>').find(".ui-dialog-titlebar-" + name).attr("role", "button").mouseover(function() {
        return $(this).addClass("ui-state-hover");
      }).mouseout(function() {
        return $(this).removeClass("ui-state-hover");
      }).focus(function() {
        return $(this).addClass("ui-state-focus");
      }).blur(function() {
        return $(this).removeClass("ui-state-focus");
      }).end().find(".ui-dialog-titlebar-" + name).toggle(this.options[mode.option]).click(function(e) {
        e.preventDefault();
        return _this[name]();
      }).end();
    },
    _initTitleBar: function() {
      var handle;

      switch (this.options.titlebar) {
        case false:
          return 0;
        case "none":
          if ($(this.element[0]).dialog("option", "draggable")) {
            handle = $("<div />").addClass("ui-dialog-draggable-handle").css("cursor", "move").height(5);
            $(this.element[0]).dialog("widget").prepend(handle).draggable("option", "handle", handle);
          }
          return $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").find(".ui-dialog-title").html("&nbsp;").end().css({
            "background-color": "transparent",
            "background-image": "none",
            "border": 0,
            "position": "absolute",
            "right": 0,
            "top": 0,
            "z-index": 9999
          }).end();
        case "transparent":
          return $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").css({
            "background-color": "transparent",
            "background-image": "none",
            "border": 0
          });
        default:
          return $.error("jQuery.dialogExtend Error : Invalid <titlebar> value '" + this.options.titlebar + "'");
      }
    },
    state: function() {
      return this._state;
    },
    restore: function() {
      this._trigger("beforeRestore");
      this._restore();
      this._setState("normal");
      this._toggleButtons();
      return this._trigger("restore");
    },
    _restore: function() {
      if (this._state !== "normal") {
        return this["_restore_" + this._state]();
      }
    },
    _saveSnapshot: function() {
      if (this._state === "normal") {
        this.original_config_resizable = $(this.element[0]).dialog("option", "resizable");
        this.original_config_draggable = $(this.element[0]).dialog("option", "draggable");
        this.original_size_height = $(this.element[0]).dialog("widget").outerHeight();
        this.original_size_width = $(this.element[0]).dialog("option", "width");
        this.original_size_maxHeight = $(this.element[0]).dialog("option", "maxHeight");
        this.original_position_mode = $(this.element[0]).dialog("widget").css("position");
        this.original_position_left = $(this.element[0]).dialog("widget").offset().left - $('body').scrollLeft();
        this.original_position_top = $(this.element[0]).dialog("widget").offset().top - $('body').scrollTop();
        return this.original_titlebar_wrap = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").css("white-space");
      }
    },
    _loadSnapshot: function() {
      return {
        "config": {
          "resizable": this.original_config_resizable,
          "draggable": this.original_config_draggable
        },
        "size": {
          "height": this.original_size_height,
          "width": this.original_size_width,
          "maxHeight": this.original_size_maxHeight
        },
        "position": {
          "mode": this.original_position_mode,
          "left": this.original_position_left,
          "top": this.original_position_top
        },
        "titlebar": {
          "wrap": this.original_titlebar_wrap
        }
      };
    },
    _toggleButtons: function() {
      var mode, name, _ref, _ref1, _results;

      $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-restore").toggle(this._state !== "normal").css({
        "right": "1.4em"
      }).end();
      _ref = this.modes;
      for (name in _ref) {
        mode = _ref[name];
        $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-" + name).toggle(this._state !== mode.state && this.options[mode.option]);
      }
      _ref1 = this.modes;
      _results = [];
      for (name in _ref1) {
        mode = _ref1[name];
        if (mode.state === this._state) {
          _results.push($(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-restore").insertAfter($(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-" + name)).end());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modes: {
      "collapse": {
        option: "collapsable",
        state: "collapsed"
      }
    },
    options: {
      "collapsable": false,
      "icons": {
        "collapse": "ui-icon-triangle-1-s"
      },
      "beforeCollapse": null,
      "collapse": null
    },
    collapse: function() {
      var newHeight;

      newHeight = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").height() + 15;
      this._trigger("beforeCollapse");
      if (this._state !== "normal") {
        this._restore();
      }
      this._saveSnapshot();
      $(this.element[0]).dialog("option", {
        "resizable": false,
        "height": newHeight,
        "maxHeight": newHeight
      }).on('dialogclose', this._collapse_restore).hide().dialog("widget").find(".ui-dialog-buttonpane:visible").hide().end().find(".ui-dialog-titlebar").css("white-space", "nowrap").end().find(".ui-dialog-content");
      this._setState("collapsed");
      this._toggleButtons();
      return this._trigger("collapse");
    },
    _restore_collapsed: function() {
      var original;

      original = this._loadSnapshot();
      return $(this.element[0]).show().dialog("widget").find(".ui-dialog-buttonpane:hidden").show().end().find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end().find(".ui-dialog-content").dialog("option", {
        "resizable": original.config.resizable,
        "height": original.size.height,
        "maxHeight": original.size.maxHeight
      }).off('dialogclose', this._collapse_restore);
    },
    _initStyles_collapse: function() {
      var style;

      if (!$(".dialog-extend-collapse-css").length) {
        style = '';
        style += '<style class="dialog-extend-collapse-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-collapse { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-collapse span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-collapse:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-collapse:focus { padding: 0; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    },
    _collapse_restore: function() {
      return $(this).dialogExtend("restore");
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modes: {
      "maximize": {
        option: "maximizable",
        state: "maximized"
      }
    },
    options: {
      "maximizable": false,
      "icons": {
        "maximize": "ui-icon-extlink"
      },
      "beforeMaximize": null,
      "maximize": null
    },
    maximize: function() {
      var newHeight, newWidth;

      newHeight = $(window).height() - 11;
      newWidth = $(window).width() - 11;
      this._trigger("beforeMaximize");
      if (this._state !== "normal") {
        this._restore();
      }
      this._saveSnapshot();
      if ($(this.element[0]).dialog("option", "draggable")) {
        $(this.element[0]).dialog("widget").draggable("option", "handle", null).find(".ui-dialog-draggable-handle").css("cursor", "text").end();
      }
      $(this.element[0]).dialog("widget").css("position", "fixed").find(".ui-dialog-content").show().dialog("widget").find(".ui-dialog-buttonpane").show().end().find(".ui-dialog-content").dialog("option", {
        "resizable": false,
        "draggable": false,
        "height": newHeight,
        "width": newWidth,
        "position": {
          my: "left top",
          at: "left top"
        }
      });
      this._setState("maximized");
      this._toggleButtons();
      return this._trigger("maximize");
    },
    _restore_maximized: function() {
      var original;

      original = this._loadSnapshot();
      $(this.element[0]).dialog("widget").css("position", original.position.mode).find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end().find(".ui-dialog-content").dialog("option", {
        "resizable": original.config.resizable,
        "draggable": original.config.draggable,
        "height": original.size.height,
        "width": original.size.width,
        "maxHeight": original.size.maxHeight,
        "position": {
          my: "left top",
          at: "left+" + original.position.left + " top+" + original.position.top
        }
      });
      if ($(this.element[0]).dialog("option", "draggable")) {
        return $(this.element[0]).dialog("widget").draggable("option", "handle", $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle").length ? $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle") : ".ui-dialog-titlebar").find(".ui-dialog-draggable-handle").css("cursor", "move");
      }
    },
    _initStyles_maximize: function() {
      var style;

      if (!$(".dialog-extend-maximize-css").length) {
        style = '';
        style += '<style class="dialog-extend-maximize-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-maximize { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-maximize span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-maximize:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-maximize:focus { padding: 0; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modes: {
      "minimize": {
        option: "minimizable",
        state: "minimized"
      }
    },
    options: {
      "minimizable": false,
      "minimizeLocation": "left",
      "icons": {
        "minimize": "ui-icon-minus"
      },
      "beforeMinimize": null,
      "minimize": null
    },
    minimize: function() {
      var fixedContainer, newHeight, newWidth, overlay;

      newHeight = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").height() + 15;
      newWidth = 200;
      if ($("#dialog-extend-fixed-container").length) {
        fixedContainer = $("#dialog-extend-fixed-container");
      } else {
        fixedContainer = $('<div id="dialog-extend-fixed-container"></div>').appendTo("body");
      }
      fixedContainer.css({
        "position": "fixed",
        "bottom": 1,
        "left": 1,
        "right": 1,
        "z-index": 9999
      });
      overlay = $('<div/>').css({
        "float": this.options.minimizeLocation,
        "margin": 1
      });
      fixedContainer.append(overlay);
      $(this.element[0]).data("dialog-extend-minimize-overlay", overlay);
      this._trigger("beforeMinimize");
      this._saveSnapshot();
      if ($(this.element[0]).dialog("option", "draggable")) {
        $(this.element[0]).dialog("widget").draggable("option", "handle", null).find(".ui-dialog-draggable-handle").css("cursor", "text").end();
      }
      $(this.element[0]).dialog("option", {
        "resizable": false,
        "draggable": false,
        "height": newHeight,
        "width": newWidth
      }).on('dialogclose', this._minimize_removeOverlay).dialog("widget").css("position", "static").appendTo(overlay).find(".ui-dialog-content").dialog("widget").find(".ui-dialog-titlebar").each(function() {
        var buttonPane, titleText, titlebar;

        titlebar = $(this);
        buttonPane = titlebar.find(".ui-dialog-titlebar-buttonpane");
        titleText = titlebar.find(".ui-dialog-title");
        return titleText.css({
          'overflow': 'hidden',
          'width': titlebar.width() - buttonPane.width() + 10
        });
      }).end().find(".ui-dialog-content").hide().dialog("widget").find(".ui-dialog-buttonpane:visible").hide().end().find(".ui-dialog-titlebar").css("white-space", "nowrap").end().find(".ui-dialog-content");
      this._setState("minimized");
      this._toggleButtons();
      return this._trigger("minimize");
    },
    _restore_minimized: function() {
      var original;

      original = this._loadSnapshot();
      $(this.element[0]).dialog("widget").appendTo("body").css({
        "float": "none",
        "margin": 0,
        "position": original.position.mode
      }).find(".ui-dialog-content").dialog("widget").find(".ui-dialog-title").css("width", "auto").end().find(".ui-dialog-content").show().dialog("widget").find(".ui-dialog-buttonpane:hidden").show().end().find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end().find(".ui-dialog-content").dialog("option", {
        "resizable": original.config.resizable,
        "draggable": original.config.draggable,
        "height": original.size.height,
        "width": original.size.width,
        "maxHeight": original.size.maxHeight,
        "position": {
          my: "left top",
          at: "left+" + original.position.left + " top+" + original.position.top
        }
      }).off('dialogclose', this._minimize_removeOverlay);
      if ($(this.element[0]).dialog("option", "draggable")) {
        $(this.element[0]).dialog("widget").draggable("option", "handle", $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle").length ? $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle") : ".ui-dialog-titlebar").find(".ui-dialog-draggable-handle").css("cursor", "move");
      }
      $(this.element[0]).data("dialog-extend-minimize-overlay").remove();
      return $(this.element[0]).removeData("dialog-extend-overlay");
    },
    _initStyles_minimize: function() {
      var style;

      if (!$(".dialog-extend-minimize-css").length) {
        style = '';
        style += '<style class="dialog-extend-minimize-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-minimize { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-minimize span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-minimize:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-minimize:focus { padding: 0; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    },
    _verifyOptions_minimize: function() {
      var _ref;

      if (!this.options.minimizeLocation || ((_ref = this.options.minimizeLocation) !== 'left' && _ref !== 'right')) {
        $.error("jQuery.dialogExtend Error : Invalid <minimizeLocation> value '" + this.options.minimizeLocation + "'");
        return this.options.minimizeLocation = "left";
      }
    },
    _minimize_removeOverlay: function() {
      $(this).dialogExtend("restore");
      $(this).dialog("widget").appendTo($('body'));
      $(this).data("dialog-extend-minimize-overlay").remove();
      return $(this).removeData("dialog-extend-overlay");
    }
  });

}).call(this);
;
(function (jQuery) {
Drupal.behaviors.help_dialog = {
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
											Drupal.behaviors.help_dialog.attach();
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
;
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
};

})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
