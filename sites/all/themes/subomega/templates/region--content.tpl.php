<div<?php print $attributes; ?>>
  <div<?php print $content_attributes; ?>>
    <a id="main-content"></a>
    <?php print render($title_prefix);?>	
<?php 
$node = menu_get_object(); 
$r = gettype($node);
$menuParent = menu_get_active_trail();
$sub_title = $title;
if($r != "NULL"){
	if ($node->type == "programs_israel"){
		$title = $menuParent[1]["title"];
	} elseif($node->type == "programs_overseas"){
		$title = $menuParent[2]["title"];	
	} 
}else {
	$node = new stdClass();
	$node->type = "null";
}
?>
<?php if ($node->type == "programs_israel" || $node->type == "programs_overseas" ): ?>
    <h1 class="title" id="page-title"><?php echo $title ?></h1>
    <?php if ($title): ?>
    <?php if ($title_hidden): ?><div class="element-invisible"><?php endif; ?>
    <h2 class="title" id="page-sub-title"><?php print $sub_title ; ?></h2>
    <?php if ($title_hidden): ?></div><?php endif; ?>
    <?php endif;?>
<?php endif;?>
<?php if ($node->type != "programs_israel" && $node->type != "programs_overseas" ): ?>
    <?php if ($title): ?>
    <?php if ($title_hidden): ?><div class="element-invisible"><?php endif; ?>
    <h1 class="title" id="page-title"><?php print $title ?></h1>
    <?php if ($title_hidden): ?></div><?php endif; ?>
    <?php endif; ?>
<?php endif; ?>

    <?php print render($title_suffix); ?>
    <?php if ($tabs && !empty($tabs['#primary'])): ?><div class="tabs clearfix"><?php print render($tabs); ?></div><?php endif; ?>
    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
    <?php print $content; ?>
    <?php if ($feed_icons): ?><div class="feed-icon clearfix"><?php print $feed_icons; ?></div><?php endif; ?>
  </div>
</div>
