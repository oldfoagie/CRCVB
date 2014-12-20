<?php
$f = fopen('teams.txt', 'w');
fwrite  ($f, 'PHP is fun!!');
fclose($f);

$f = fopen('teams.txt', 'r');
$teams = fgets($f);
echo ($teams);
fclose($f);
?>
