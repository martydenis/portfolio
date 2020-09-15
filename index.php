<?php
	$birthDate = "09/17/1993";
	//explode the date to get month, day and year
	$birthDate = explode("/", $birthDate);
	//get age from date or birthdate
	$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
	  ? ((date("Y") - $birthDate[2]) - 1)
	  : (date("Y") - $birthDate[2]));
?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<title>Portfolio - Martin Denis | Front-end developer & Webdesigner</title>
	<meta charset="UTF-8">
	<meta name="description" content="Webdesigner et webdeveloper à Gembloux - Namur. Je m'occuperai de la réalisation de votre site web de A à Z">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1"/>
	
	<!-- <link rel="icon" type="image/png" href="img/favicon.png"/> -->
	<link rel="stylesheet" type="text/css" href="css/reset.css"/>
	<link rel="stylesheet" type="text/css" href="css/style.css<?php echo '?'.time() ; ?>"/>
	<link rel="stylesheet" type="text/css" href="css/responsive.css<?php echo '?'.time() ; ?>"/>
</head>
<body>
	<header id="hello" class="section">
		<nav class="menu">
			<div class="clip">
				<ul>
					<li class="current">
						<a href="#hello"><span>Hello</span></a>
					</li>
					<li>
						<a href="#projects"><span>Projects</span></a>
					</li>
					<li>
						<a href="#contact"><span>Get in touch</span></a>
					</li>
				</ul>

				<div class="clip-path">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 144" style="enable-background:new 0 0 32 144;" xml:space="preserve">
						<polyline class="st0" points="16,36 4,24 16,12 28,24 16,36 16,60 4,72 16,84 28,72 16,60 4,72 16,84 16,108 4,120 16,132 28,120 16,108 "/>
					</svg>
				</div>
			</div>
		</nav>

		<div class="section-block">
			<div class="big-container">
				<div class="hello-anim">
					<h1 data-delay="0">Hi, I am Martin</h1>
					<p data-delay="1250">I'm a <?php echo $age; ?> years old front-end developer and webdesigner, <br class="hidden-sm">living in Louvain-la-Neuve, Belgium</p>
					<p data-delay="2000">I graduated from the <a href="http://www.infographie-sup.be/" target="_blank">ESIAJ</a> in 2015 <br class="hidden-sm">and have been working at <a href="https://www.e-net-b.be/" target="_blank">E-net Business</a> ever since.</p>
				</div>
			</div>
		</div>
	</header>
	<!-- FIN Hello -->

	<main class="section section-white">
		<section id="projects" class="section">
			<div class="section-block"></div>

		</section>
		<!-- FIN PROJECTS -->

		<section id="contact" class="section">
			<div class="section-block"></div>
		</section>
		<!-- FIN CONTACT -->
	</main>

	<footer id="footer">
		<div class="big-container">
			<p>Created with ❤️ by Martin Denis in Louvain-la-Neuve, Belgium</p>
		</div>
	</footer>

	<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@200..700&display=swap" rel="stylesheet">
	<script src="js/jquery.js"></script>
	<script src="js/main.js<?php echo '?'.time() ; ?>"></script>
</body>
</html>