<?php require_once '../_includes.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo $language_iso; ?>">
	<head>
		<?php include_once '../_head.php'; ?>

		<title>Js experiments and personal projects | Martin Denis</title>
		<meta name="description" content="This is my sandbox, the place where I play around and try new stuff">

		<link rel="stylesheet" type="text/css" href="<?php echo $dist_path; ?>sandbox.css" media="screen" />
		<script defer src="<?php echo $dist_path; ?>sandbox.bundle.js"></script>
		<noscript><style> .anim-appear { opacity: 1; } </style></noscript>
	</head>

	<body id="body">
		<a href="<?php echo $home_url?>" id="back">Back</a>

		<div class="container-big">
			<h1>My personal projects</h1>
			<p>This is my playground, the place where I play around and try new stuff.</p>
			<p>Here you will find my <strike>latest</strike>, <strike>best</strike>, and most polished JavaScript experiments, as well as my latest personal work.</p>

			<ul id="projects">
				<li class="project anim-appear">
					<article>
						<a href="//wishy.martindenis.be" target="_blank">
							<div class="project-thumb-container">
								<img src="wishy/thumb.webp" alt="Wishy" width="588" height="420">
							</div>
							<h3>Wishy</h3>
							<p>Wishlist web application created for self-training purposes</p>
							<ul class="project-tags">
								<li class="tag-laravel">Laravel</li>
								<li class="tag-tailwind">Tailwind.css</li>
								<li class="tag-vue">Vue.js</li>
							</ul>
						</a>
					</article>
				</li>
				<li class="project anim-appear">
					<article>
						<a href="<?php echo $sandbox_path; ?>pewpew/">
							<div class="project-thumb-container">
								<img src="pewpew/thumb.png" alt="Pew Pew" width="588" height="420">
							</div>
							<h3>Pew Pew</h3>
							<p>Simulation of gravity, again. This time in space.</p>
							<ul class="project-tags">
								<li class="tag-js">JavaScript</li>
							</ul>
						</a>
					</article>
				</li>
				<li class="project anim-appear">
					<article>
						<a href="<?php echo $sandbox_path; ?>double-pendulum/">
							<div class="project-thumb-container">
								<img src="double-pendulum/thumb.png" alt="Double pendulum" width="588" height="420">
							</div>
							<h3>Double pendulum</h3>
							<p>Simulation of the physics behind a double pendulum</p>
							<ul class="project-tags">
								<li class="tag-js">JavaScript</li>
							</ul>
						</a>
					</article>
				</li>
				<li class="project anim-appear">
					<article>
						<a href="<?php echo $sandbox_path; ?>snake/">
							<div class="project-thumb-container">
								<img src="snake/thumb.png" alt="Snake" width="588" height="420">
							</div>
							<h3>Snake</h3>
							<p>Recreation of the famous Nokia game</p>
							<ul class="project-tags">
								<li class="tag-js">JavaScript</li>
							</ul>
						</a>
					</article>
				</li>
				<li class="project anim-appear">
					<article>
						<a href="<?php echo $sandbox_path; ?>gravity-circular/">
							<div class="project-thumb-container">
								<img src="gravity-circular/thumb.png" alt="Circular gravity" width="588" height="420">
							</div>
							<h3>Circular gravity</h3>
							<p>Simulation of gravity physics, but around a disc, not a plane</p>
							<ul class="project-tags">
								<li class="tag-js">JavaScript</li>
							</ul>
						</a>
					</article>
				</li>
				<li class="project anim-appear">
					<article>
						<a href="<?php echo $sandbox_path; ?>scratch-game/">
							<div class="project-thumb-container">
								<img src="scratch-game/thumb.jpg" alt="Scratch game" width="588" height="420">
							</div>
							<h3>Scratch game</h3>
							<p>Well, it's a scratch game</p>
							<ul class="project-tags">
								<li class="tag-js">JavaScript</li>
							</ul>
						</a>
					</article>
				</li>
				<li class="project anim-appear">
					<article>
						<a href="<?php echo $sandbox_path; ?>gravity/">
							<div class="project-thumb-container">
								<img src="gravity/thumb.png" alt="Gravity" width="588" height="420">
							</div>
							<h3>Gravity</h3>
							<p>Simulation of gravity physics. Click to throw the balls in the air</p>
							<ul class="project-tags">
								<li class="tag-js">JavaScript</li>
							</ul>
						</a>
					</article>
				</li>
			</ul>
		</div>

		<?php include '../_footer.php' ?>
	</body>
</html>