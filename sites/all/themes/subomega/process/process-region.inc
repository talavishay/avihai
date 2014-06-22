<?php
/**
 * Turn a menu tree into an active trail.
 *
 * This function turns a menu tree data structure into an active trail data
 * structure. This is quite a lot like menu_get_active_trail(), except it uses
 * the tree of menu links rather than menu routers.
 *
 *     // Current.
 *     $menu = menu_tree_page_data(menu_get_active_menu_name());
 *     $new_breadcrumb = display_trail($menu);
 *
 */
function _display_trail($tree) {
	$trail = array();
	$trail[] = array(
			'title' => t('Home'),
			'href' => '',
			'localized_options' => array(),
			'type' => 0
	);

	// Iterate over the levels of the tree, looking for active links.
	$level = $tree;
	while ($level) {
		// Don't descend (unless we choose to below).
		$iter = $level;
		$level = FALSE;

		// For each link in the current level...
		foreach ($iter as $id => $node) {
			// If if's active...
			if ($node['link']['in_active_trail']) {
				// ...add the link to the trail
				$trail[] = array(
						'title' => $node['link']['title'],
						'href' => $node['link']['href'],
						'localize_options' => $node['link']['localize_options'],
						'type' => $node['link']['type'],
				);
				// ...descend to it's children.
				$level = $node['below'];
				continue;
			}
		}

	};

	return  $trail;
}
function subomega_alpha_process_region(&$vars){
	global $language;
	if($vars["region"] == "content"){		
		// Get the menu you'd like a trail for...
		$menu = menu_tree_page_data("menu-main-menu-en");
		// ...and build the trail.
		$en_display_trail = _display_trail($menu);
		
		$vars["node"] = menu_get_object(); 
		$r = gettype($vars["node"]);
//		menu_set_active_menu_names(array('menu-main-menu-en'));
		if($language->language === "he"){
			$menuParent =  menu_get_active_trail();
		} else {
			$menuParent =  $en_display_trail ;
		}
		$vars["sub_title"] = $vars["title"];
		if($r != "NULL"){
			if ($vars["node"]->type == "programs_israel"){
				$vars["title"] = $menuParent[1]["title"];
			} elseif($vars["node"]->type == "programs_overseas"){
				$vars["title"]= $menuParent[2]["title"];	
			} 
		}else {
			$node = new stdClass();
			$node->type = "null";
		}
			
	}	

}