<?php
//path to directory to scan
$directory = __DIR__."/docs/";

//get all text files with a .txt extension.
$texts = glob($directory . "*.html");
echo '<ul>';
//print each file name
foreach($texts as $text)
{
    echo '<li><a href="'.$text.'">'.$text.'</a></li>';
}
echo '</ul>';


