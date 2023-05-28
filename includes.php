<?php

   $is_prod = ($_SERVER['SERVER_NAME'] == 'martindenis.be');

   $favicon_path = $is_prod ? '/' : '/martindenis_v3/';
   $css_path = $is_prod ? '/css/' : '/martindenis_v3/css/';
   $js_path = $is_prod ? '/js/' : '/martindenis_v3/js/';
   $sandbox_path = $is_prod ? '/sandbox/' : '/martindenis_v3/sandbox/';
   $game_path = $is_prod ? '/sandbox/' : '/sandbox/';

?>