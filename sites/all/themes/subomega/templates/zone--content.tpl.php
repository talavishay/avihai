<?php 
if ($wrapper):	
	$output='';
	if (!empty($variables['elements']['sidebar_second']) && !empty($variables['elements']['sidebar_first']) ) {
		$output  .= ' two_sidebars ';
	} else {
		if (!empty($variables['elements']['sidebar_second'])) {
			$output = ' sidebar_second ';
		} 
		if (!empty($variables['elements']['sidebar_first'])) {
			$output = ' sidebar_first ';
		} 
	}
	$attributes = preg_replace('/class="/', 'class="'.$output, $attributes);
?>

<div <?php print $attributes; ?>><?php endif; ?>  
  <div  <?php print $content_attributes?>>
  <?php  print $content;   ?>
  </div>
<?php if ($wrapper): ?></div><?php endif; ?>
