<?php

   $language_iso = 'en';
   $is_prod = ($_SERVER['SERVER_NAME'] == 'martindenis.be');

   $home_url = $is_prod ? '/' : '/martindenis_v3/';
   $favicon_path = $is_prod ? '/' : '/martindenis_v3/';
   $dist_path = $is_prod ? '/dist/' : '/martindenis_v3/dist/';
   $css_path = $is_prod ? '/dist/' : '/martindenis_v3/dist/';
   $js_path = $is_prod ? '/dist/' : '/martindenis_v3/dist/';
   $sandbox_path = $is_prod ? '/sandbox/' : '/martindenis_v3/sandbox/';
   // $game_path = $is_prod ? '/sandbox/' : '/martindenis_v3/sandbox/';

?>