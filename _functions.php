<?php

function dd($value): void
{
    echo "<pre>";
    var_dump($value);
    echo "</pre>";

    die();
}

function run(string $url, array $routes): void
{
	$uri = parse_url($url);
	$path = $uri['path'];

    if (false === array_key_exists($path, $routes)) {
        $path = '/404';
    }

	$route = $routes[$path];
    $filePath = get_page_file_path($route);

    if (file_exists($filePath)) {
        render_page($route);
    } else {
        echo "File not found";
    }
}

function get_page_file_path(array $route): string
{
    if (!empty($route['path'])) {
        return BASE_PATH . $route['path'] . 'index.php';
    }

    return PAGES_PATH . $route['name'] . '.php';
}

function render_page(array $route): void
{
    include get_page_file_path($route);
}
