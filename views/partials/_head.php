<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=5, minimal-ui"/>
<?php if (!empty($route['meta_title'])): ?>
	<title><?php echo $route['meta_title'] ?></title>
<?php endif; ?>
<?php if (!empty($route['meta_description'])): ?>
	<meta name="description" content="<?php echo $route['meta_description'] ?>">
<?php endif; ?>

<!-- Load JS Assets -->
<?php if (file_exists(DIST_PATH . 'common.bundle.js')) : ?>
	<script src="<?php echo DIST_URL . "common.bundle.js"; ?>" defer></script>
<?php endif; ?>
<script src="<?php echo DIST_URL . "global.bundle.js"; ?>" defer></script>
<?php if (file_exists(DIST_PATH . $route['name'] . '.bundle.js')) : ?>
	<script src="<?php echo DIST_URL . $route['name'] . '.bundle.js'; ?>" defer></script>
<?php endif; ?>

<!-- Load CSS Assets -->
<link rel="stylesheet" type="text/css" href="<?php echo DIST_URL . "global.css"; ?>" media="screen" />
<?php if (file_exists(DIST_PATH . $route['name'] . '.css')) : ?>
	<link rel="stylesheet" type="text/css" href="<?php echo DIST_URL . $route['name'] . '.css'; ?>" media="screen" />
<?php endif; ?>

<link rel="icon" type="image/svg" href="/favicon.svg" />
