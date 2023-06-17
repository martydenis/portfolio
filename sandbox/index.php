<?php require_once '../includes.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Sandbox & experiments</title>
	<meta charset="UTF-8">
	<meta name="description" content="This is my sandbox, the place where I play around and try new stuff">
	<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=5, minimal-ui"/>

	<link rel="icon" type="image/svg" href="<?php echo $favicon_path; ?>favicon.svg" />
	<link rel="stylesheet" type="text/css" href="<?php echo $dist_path; ?>sandbox.css" media="screen" />

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&family=Manrope:wght@200..800&display=swap" rel="stylesheet" media="screen">
</head>

<body id="body">
	<a href="<?php echo $home_url?>" id="back">Back</a>

	<div class="container-big">
		<h1>My sandbox projects</h1>
		<p>This is my sandbox, the place where I play around and try new stuff.</p>
		<p>Here you will find my <strike>latest</strike>, <strike>best</strike>, and most polished JavaScript experiments.</p>

		<ul id="projects">
			<li>
				<article>
					<a href="<?php echo $game_path; ?>pewpew/">
						<div class="thumb-container">
							<img src="pewpew/thumb.png" alt="Pew Pew" width="588" height="420">
						</div>
						<h3>Pew Pew</h3>
						<p>Simulation of gravity, again. This time in space.</p>
					</a>
				</article>
			</li>	
			<li>
				<article>
					<a href="<?php echo $game_path; ?>double-pendulum/">
						<div class="thumb-container">
							<img src="double-pendulum/thumb.png" alt="Double pendulum" width="588" height="420">
						</div>
						<h3>Double pendulum</h3>
						<p>Simulation of the physics behind a double pendulum</p>
					</a>
				</article>
			</li>
			<li>
				<article>
					<a href="<?php echo $game_path; ?>snake/">
						<div class="thumb-container">
							<img src="snake/thumb.png" alt="Snake" width="588" height="420">
						</div>
						<h3>Snake</h3>
						<p>Recreation of the famous Nokia game</p>
					</a>
				</article>
			</li>
			
			<li>
				<article>
					<a href="<?php echo $game_path; ?>gravity-circular/">
						<div class="thumb-container">
							<img src="gravity-circular/thumb.png" alt="Circular gravity" width="588" height="420">
						</div>
						<h3>Circular gravity</h3>
						<p>Simulation of gravity physics, but around a disc, not a plane</p>
					</a>
				</article>
			</li>
			<li>
				<article>
					<a href="<?php echo $game_path; ?>scratch-game/">
						<div class="thumb-container">
							<img src="scratch-game/thumb.jpg" alt="Scrath game" width="588" height="420">
						</div>
						<h3>Scrath game</h3>
						<p>Well, it's a scratch game</p>
					</a>
				</article>
			</li>
			<li>
				<article>
					<a href="<?php echo $game_path; ?>gravity/">
						<div class="thumb-container">
							<img src="gravity/thumb.png" alt="Gravity" width="588" height="420">
						</div>
						<h3>Gravity</h3>
						<p>Simulation of gravity physics. Click to throw the balls in the air</p>
					</a>
				</article>
			</li>
			
		</ul>
	</div>

	<footer id="footer">
		<div class="container-small">
			<p>Created with ❤️ by Martin Denis in Belgium</p>
		</div>
	</footer>
</body>

</html>