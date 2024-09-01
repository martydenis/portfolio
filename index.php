<?php

require_once './_functions.php';
require_once './_config.php';

$routes = require_once '_routes.php';

run($_SERVER['REQUEST_URI'], $routes);
