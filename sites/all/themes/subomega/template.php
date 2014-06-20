<?php
function subomega_entity_translation_unavailable($variables){
	drupal_goto();
}
// drupal_add_library('system', 'ui.tooltip');
//drupal_add_library('system', 'effect.slide');
/*
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
function subomega_node_form_alter(&$form, &$form_state){
                $form['#attached']['css'][] = drupal_get_path("theme", "holy").'/css/programs_israel_node_form.css';
}
function subomega_breadcrumb($breadcrumb) {
   if (!empty($breadcrumb)) {
       $length = count($breadcrumb["breadcrumb"]);
       if(isset($breadcrumb["breadcrumb"][$length-1])){
        $breadcrumb["breadcrumb"][$length-1] = '<span class="last">'.$breadcrumb["breadcrumb"][$length-1].'</span>';
       }
     return '<div class="breadcrumb">'. implode(' <span class="breadcrumb_sep">>></span> ', $breadcrumb["breadcrumb"]) .'</div>';
   }
}
function subomega_preprocess_html(&$variables) {
/**
* Add information about the number of sidebars
*/
drupal_add_js(drupal_get_path("theme", "subomega").'/js/subomega.js');
//drupal_set_message("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  // Code borrowed/adapted from D7 core.
  // Classes originally added by D7 core, then removed by Omega 4 and now put back (ish) by this function.
  // NOTE: D7 core used hyphens in class names, we need to use different classes so we're
  // replacing hyphens with underscores (make sure your CSS is expecting this).
  if (!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['classes_array'][] = 'two_sidebars';
  }
  elseif (!empty($variables['page']['sidebar_first'])) {
    $variables['classes_array'][] = 'one_sidebar sidebar_first';
  }
  elseif (!empty($variables['page']['sidebar_second'])) {
    $variables['classes_array'][] = 'one_sidebar sidebar_second';
  }
  else {
    $variables['classes_array'][] = 'no_sidebars';
  }
return     $variables;
}
function subomega_preprocess_search_results(&$vars) {
  // search.module shows 10 items per page (this isn't customizable)
  $itemsPerPage = 10;

  // Determine which page is being viewed
  // If $_REQUEST['page'] is not set, we are on page 1
  $currentPage = (isset($_REQUEST['page']) ? $_REQUEST['page'] : 0) + 1;

  // Get the total number of results from the global pager
  $total = $GLOBALS['pager_total_items'][0];

  // Determine which results are being shown ("Showing results x through y")
  $start = (10 * $currentPage) - 9;
  // If on the last page, only go up to $total, not the total that COULD be
  // shown on the page. This prevents things like "Displaying 11-20 of 17".
  $end = (($itemsPerPage * $currentPage) >= $total) ? $total : ($itemsPerPage * $currentPage);

  // If there is more than one page of results:
    $vars['search_totals'] = t('!total results found', array(      '!total' => $total  ));
}
