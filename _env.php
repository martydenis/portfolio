<?php

define('IS_PROD', $_SERVER['SERVER_NAME'] === 'martindenis.be');
define('BASE_PATH', __DIR__ . '/');
define('PARTIALS_PATH', BASE_PATH . 'views/partials/');
define('DIST_PATH', BASE_PATH . 'dist/');
define('PAGES_PATH', BASE_PATH . 'views/pages/');
define('GAME_PATH', BASE_PATH . '../');

define('IMG_URL', '/static/img/');
define('DIST_URL', '/dist/');
define('GAME_URL', '/../');

define('LANG_ISO', 'en');
