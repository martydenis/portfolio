<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=5, minimal-ui"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&family=Manrope:wght@200..800&display=swap" rel="stylesheet" media="screen">

<link rel="icon" type="image/svg" href="/favicon.svg" />
<?php if (!empty($route['meta_title'])): ?>
	<title><?php echo $route['meta_title'] ?></title>
<?php endif; ?>
<?php if (!empty($route['meta_description'])): ?>
	<meta name="description" content="<?php echo $route['meta_description'] ?>">
<?php endif; ?>

<?php if (file_exists(DIST_PATH . $route['name'] . '.css')) : ?>
	<link rel="stylesheet" type="text/css" href="<?php echo DIST_URL . $route['name'] . '.css'; ?>" media="screen" />
<?php endif; ?>

<?php if (file_exists(DIST_PATH . $route['name'] . '.bundle.js')) : ?>
	<script src="<?php echo DIST_URL . $route['name'] . '.bundle.js'; ?>" defer></script>
<?php endif; ?>

<noscript><style>.anim-appear { opacity: 1; }</style></noscript>
