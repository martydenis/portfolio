<?php
/*
	MON PREMIER FORMULAIRE DE CONTACT EN PHP.
	
	auteur: alexandre AT pixeline.be (le script fonctionne. Aucun support n'est fourni, cherche sur internet)
	pour: étudiants DWM
	version: 03.02.2013
	
*/


// POUR VERIFIER CE QU'ENVOIE TON FORMULAIRE, DECOMMENTE LES LIGNES SUIVANTES: (décommenter = enlever les double-slash // et/ou les /* et */ )

/*
echo '<pre>';
print_r($_SERVER);
echo '</pre>';
exit;
*/

error_reporting(0);
// touche pas à ceci
$config = array();

/*
:::::::::::   INSTRUCTIONS    :::::::::::

1.// Dans ton formulaire html, utiliser les champs aux attributs name= "message", "nom", "courriel"
Ces 3 champs seront vérifiés pour validation.

Tout autre champs sera ajouté, sans vérification.


2.// changer les valeurs des variables ci-dessous.
*/

$config['email']= 'martin.2nis@gmail.com';
$config['sujet']= "Formulaire du PORTFOLIO";
// Messages d'erreur
$config['no_name']="Entrez votre nom.";
$config['no_email']="Entrez votre adresse email.";
$config['wrong_email']="Votre addresse email semble être erronée.";
$config['no_message']= "Dites-moi quelque chose.";


// NE RIEN TOUCHER CI-DESSOUS
$errors= array();

if(isset($_POST) && count($_POST)>0){

	if(!strpos($_SERVER['HTTP_REFERER'],$_SERVER['HTTP_HOST'])){
		// si la requête ne vient pas de ce serveur, l'interrompre, quelqu'un tente de l'utiliser pour envoyer du spam.
		die("you should'nt be here.");
	}
	
	
	$nom = trim($_POST['nom']);
	$email = trim($_POST['email']);
	$message = trim($_POST['message']);


	if(empty($nom)){
		// Le nom a-t-il bien été introduit?
		$errors[]=  $config['no_name'];
	}

	if(empty($email)){
		// L'adresse email a-t-elle bien été encodée?
		$errors[]= $config['no_email'];
	}

	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// l'adresse email est-elle valide?
		$errors[]= $config['wrong_email'];
	}

	if(empty($message)){
		// Le message a-t-il bien été introduit?
		$errors[]= $config['no_message'];
	}


	if(count($errors)<1){

		$message= "$nom ($email) a écrit: \n\r$message";
		
		foreach ($_POST as $k=>$v){
			if (!in_array($k, array('nom','email','message'))){
				if(is_array($v)){
					$message.="\n\r$k = ".implode(',', $v);
				} else {
					$message.="\n\r$k = $v";
				}
			}
		}

		$message = wordwrap($message, 70, "\r\n");
		// send the email
		if(empty($config['email'])){
			die("tu as oublié d'encoder l'adresse email, banane. (regarde pour config['email']) dans le code php");
		}
		mail($config['email'], $config['sujet'], $message);
		// redirect to thank you page
	}
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<title>Portfolio - Martin Denis | Webdeveloper & Webdesigner</title>
	<meta charset="UTF-8">
	<meta name="description" content="Webdesigner et webdeveloper à Gembloux - Namur. Je m'occuperai de la réalisation de votre site web de A à Z">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1"/>
	
	<!-- <link rel="icon" type="image/png" href="img/favicon.png"/> -->
	<link rel="stylesheet" type="text/css" href="css/reset.css"/>
	<!-- <link rel="stylesheet" type="text/css" href="css/material-design-iconic-font.min.css"/> -->
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
	<link rel="stylesheet" type="text/css" href="css/responsive.css"/>
</head>
<body>
	<nav id="menu">
		<ul>
			<li><a href="#hello" class="current">Hello</a></li>
			<li><a href="#projects">Projects</a></li>
			<li><a href="#contact">Get in touch</a></li>
		</ul>
	</nav>

	<header id="hello" class="section-block">
		<div class="big-container">
			<h1>Hi, I am Martin</h1>
			<p>I'm a 27 years old front-end developer and webdesigner,<br>living in Louvain-la-Neuve, Belgium</p>
			<p>I graduated from the <a href="http://www.infographie-sup.be/" target="_blank">ESIAJ</a> in 2015<br>and have been working at <a href="https://www.e-net-b.be/" target="_blank">E-net Business</a> since.</p>
		</div><!-- FIN Big Container -->
	</header><!-- FIN Me -->

	
	<section id="projects" class="section-block section-white">
	<?php /*
		<h2>Projets</h2>

		<article class="section-block">
			<div class="big-container">

				<h3>Hex Kingdom</h3>
				<img src="img/hexkingdom.png" alt="Hex Kingdom - Mon TFE.">

				<div class="small-container container">
					<p><strong>Hex Kingdom</strong> est un jeu de plateau imaginé pour le multijoueur et créé dans le cadre du <strong>TFE</strong> de 3e année à la <a href="http://www.infographie-sup.be/"><abbr title="École Supérieure d'Infographie Albert Jacquard">ESIAJ</abbr></a>. Le but du jeu est de capturer la tour adverse. Pour se faire, chaque joueur dispose d’une monnaie qu’il utilise pour placer ses chevaliers sur le plateau, les déplacer et les faire combattre pour gagner la partie.</p>

					<p>Afin de prendre l’avantage sur votre adversaire, vous pouvez prendre le contrôle d’un <strong>objectif</strong> généralement placé au centre de la carte. En faisant cela, vous vous offrez une pièce supplémentaire à chaque tour et pouvez prendre plus facilement l’ascendant sur votre adversaire.</p>

					<p>Le jeu est construit en <strong>HTML & CSS</strong> pour la partie interface. La partie fonctionnement du jeu et des règles est gérée en JavaScript, un langage de programmation qui me plaît et avec lequel je suis à l’aise.</p>

					<a href="http://www.martindenis.be/tfe/juin/index.html" role="button" class="btn" target="blank">Voir le projet</a>
				</div> <!-- FIN SMALL CONTAINER -->
			</div> <!-- FIN BIG CONTAINER -->
		</article> <!-- FIN 36 -->

		<!-- <article class="section-block">
			<div class="big-container">

				<h3>AJSquare</h3>
				<img src="img/ajsquare.png" alt="AJSquare - Carte des bons plans de Namur.">

				<div class="small-container">
					<p><strong>AJSquare</strong> est une <strong>application web</strong> pour mobile développée pendant le workshop <a href="http://dwm.re/bootfactory/">Reboot Factory</a> à l’<a href="http://www.infographie-sup.be/">ESIAJ</a>. L’objectif était de rendre un <strong>prototype fonctionnel</strong> d’une application web. Nous pouvions choisir notre concept pourvu qu’il soit en rapport avec notre école. Nous avons choisis de réaliser une carte reprenant les <strong>bonnes adresses</strong> proches de l’école : copy-centers, snacks, papetteries, bars, etc.</p>

					<p>Nous formions un groupe de 5 pour cet exercice : Christophe Gindt, Laura Mélard, Jérome Daras, Cyrielle Vuillemin et moi. Je me suis encore une fois occupé des fonctionnalités en <strong>Javascript</strong> ainsi que de la centralisation des parties <strong>HTML & CSS</strong> des autres membres du groupe.</p>

					<p>Le <strong>code</strong> de l’application ne représentait cependant qu’une <strong>infime partie</strong> du temps de son développement. En effet, nous avions passé un mois auparavant à réfléchir aux <strong>différentes fonctionnalités</strong> à y apporter, à réaliser des expériences utilisateurs. C’est donc par une suite d’<strong>essais/erreurs</strong> que nous sommes parvenus à ce résultat.</p>

					<a href="http://martindenis.be/rebootfactory/" role="button" class="btn" target="blank">Voir le projet</a>
				</div>
			</div>
		</article> -->

		<article class="section-block">
			<div class="big-container">
				<h3>Datakillers</h3>
				<img src="img/datakillers.png" alt="Datakillers - Dataviz sur les Tueurs en série.">

				<div class="small-container">
					<p><strong>DataKillers</strong> est une <strong>visualisation de données</strong> sur les tueurs en série dans le monde. Datakillers était un exercice intéressant car très complet : il regroupait un travail de recherche de données, de classification, de calculs de pourcentage pour arriver à une représentation visuelle claire, précise et agréable à l’œil (non, ce n’est pas prétentieux).</p>

					<p>C’est un projet <strong>scolaire</strong> réalisé pendant le workshop <strong>Datavizualisation</strong> à l’<a href="http://www.infographie-sup.be/">ESIAJ</a>. Nous avions formé un groupe de 4 pour cet exercice : Javier Sotomayor, Simon Salembier, Sarah Bernard, et moi même. Je me suis essentiellement occupé de la partie <strong>JavaScript</strong> et <strong>animation</strong> sur l’interface.</p>
					
					<a href="http://www.martindenis.be/datakillers" role="button" class="btn" target="blank">Voir le projet</a>
				</div> <!-- FIN SMALL CONTAINER -->
			</div> <!-- FIN BIG CONTAINER -->
		</article> <!-- FIN DATAKILLERS -->
		*/ ?>
	</section> <!-- FIN PROJETS -->

	<section id="contact" class="section-block">
	<?php /*
		<h2>Contact</h2>
		<article>
			<div class="big-container section-block">
				<p class="mb24 mt0">Si vous voulez me joindre, vous pouvez remplir mon formulaire.</p>
				<div id="dial" class="col2">
					<h3>Martin</h3>
					<form action="#form" method="post" id="form">
						<p class="me">Salut ;)</p>
						<p class="me">Moi c’est Martin.<br>Comment vous appelez-vous ?</p>

						<div class="you">
							<label for="nom" id="nom-label">Votre Nom</label>
							<input type="text" id="nom" placeholder="Michel" value="<?php echo ($nom!='') ? $nom: '' ?>" name="nom">
						</div>

						<p class="me">Super !</p>
						<p class="me">Avant d'aller plus loin, dites-moi où vous joindre ?</p>

						<div class="you">
							<label for="email" id="email-label">Votre Email</label>
							<input type="email" id="email" placeholder="michel@gmail.com" value="<?php echo ($email!='') ? $email: '' ?>" name="email">
						</div>

						<p class="me">Que souhaitez-vous me dire ?</p>

						<div class="you">
							<label for="message" id="msg-label">Message</label>
							<textarea id="message" placeholder="Je vous engage !" name="message"><?php echo ($_POST['message']!='') ? $_POST['message']: '' ?></textarea>
						</div>

						<?php
							// if form has been submitted, show the errors
							if($_POST && count($errors)>0){
							?>
								<div id="feedback" class="me">
									<p>Quelques petites erreurs :</p>
									<ul>
									<?php
										foreach($errors as $e){
											echo "<li>$e</li>";
										}
									?>
									</ul>
								</div>
								<?php
							}
						?>

						<?php
							// if form has been submitted, say thx
							if($_POST && count($errors)<1){
							?>
								<div id="merci" class="me">
									<p>Merci pour tout !</p>
								</div>
								<?php
							}
						?>

						<input type="submit" value="Envoyer">
					</form> <!-- FIN FORM -->
				</div> <!-- FIN DIAL -->

				<div class="col2" id="coords">
					<p>Mes coordonnées :</p>

					<p class="icon-p mt36"><i class="zmdi zmdi-email"></i><a href="mailto:martin.2nis@gmail.com">martin.2nis@gmail.com</a></p>
					<p class="icon-p"><i class="zmdi zmdi-pin"></i>Chaussée Romaine, 14<br>5030 Gembloux, Belgique</p>
					<p class="icon-p"><i class="zmdi zmdi-phone"></i>0477/ 39 62 49</p>
					<p class="icon-p"><i class="zmdi zmdi-download"></i><a href="img/CV_Martin_Denis.pdf" target="_blank">Téléchargez aussi mon CV.</a></p>

					<ul id="social">
						<li class="social"><a href="https://twitter.com/martydeny"><i class="zmdi zmdi-twitter"></i></a></li>
						<li class="social"><a href="https://www.facebook.com/daniel.au.scours"><i class="zmdi zmdi-facebook"></i></a></li>
						<li class="social"><a href="https://plus.google.com/u/0/109193810401127771326/posts"><i class="zmdi zmdi-google-plus"></i></a></li>
					</ul>
				</div>

			</div> <!-- FIN BIG CONTAINER -->
		</article> <!-- FIN ARTICLE CONTACT -->
	*/ ?>
	</section> <!-- FIN CONTACT -->

	<footer id="footer">
	<?php /*
		<div class="big-container">
			<p>Créé avec amour par Martin Denis dans le cadre du travail de fin de 2e année à l'<a href="http://www.infographie-sup.be/">ESIAJ</a> à Namur, Belgique.</p>

			<div class="col2">
				<h4>Crédits</h4>

				<ul>
					<li><a href="http://www.teehanlax.com/tools/iphone/">iOS7 GUI PSD (iPhone)</a></li>
					<li><a href="http://www.pixeden.com/psd-mock-up-templates/macbook-pro-retina-psd-mockup">MacBook Pro Retina Psd Mockup</a></li>
					<li><a href="http://jquery.com/">jQuery</a></li>
					<li><a href="https://www.youtube.com/watch?v=FOUirpUZqVw">Grafikart.fr | ScrollSpy</a></li>
					<li><a href="http://meyerweb.com/eric/tools/css/reset/">Reset CSS</a></li>
					<li><a href="http://www.bknoop.de/ups/deadlink.png">Dead link</a></li>
				</ul>
			</div>

			<div class="col2">
				<h4>Typographies</h4>
				<ul>
					<li>Roboto</li>
					<li>Roboto Slab</li>
					<li>Roboto Condensed</li>
				</ul>
			</div>
		</div> <!-- FIN BIG CONTAINER -->
	*/ ?>
	</footer> <!-- FIN FOOTER -->

	<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@200..700&display=swap" rel="stylesheet">
	<script src="js/jquery.js"></script>
	<script src="js/main.js"></script>
</body>
</html>