<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */
drupal_add_js(drupal_get_path("theme", "subomega").'/js/subomega.js');

// drupal_add_library('system', 'ui.tooltip');
//drupal_add_library('system', 'effect.slide');
/*
 function subomega_preprocess_html(&$variables){
if (!empty($variables['page']['content']['sidebar_second']) && !empty($variables['page']['content']['sidebar_first'])) {
	$variables['classes_array'][] = 'two_sidebars';
}
elseif (!empty($variables['page']['content']['sidebar_first'])) {
	$variables['classes_array'][] = 'one_sidebar sidebar_first';
}
elseif (!empty($variables['page']['content']['sidebar_second'])) {
	$variables['classes_array'][] = 'one_sidebar sidebar_second';
}
else {
	$variables['classes_array'][] = 'no_sidebars';	
}

}

function subomega_module_implements_alter(&$implementations, $hook) {
	//~ dpm($hook);
	// make this module form alter run last..( after biblio)
	if ( ($hook == 'css_alter' && isset($implementations['e_scholar_module'])) ||($hook == 'form_alter' && isset($implementations['e_scholar_module'])) || ($hook == 'menu_alter' && isset($implementations['e_scholar_module']))) {
		$group = $implementations['e_scholar_module'];
		unset($implementations['e_scholar_module']);
		$implementations['e_scholar_module'] = $group;
	}
}
*/