<?php

$config = array();

$config['email'] = "martin.2nis@gmail.com";
// Messages d'erreur
$config['no_name'] = "I need your name.";
$config['too_fast'] = "You went suspiciously fast to submit this form. Please try again slower.";
$config['no_email'] = "Please enter your email address, so that i can contact you back";
$config['wrong_email'] = "Oops, your address email seems wrong.";
$config['no_message'] = "Please tell me something.";


// NE RIEN TOUCHER CI-DESSOUS
$errors = array();
$messageSent = false;

if (isset($_POST) && count($_POST)>0) {
	if(!strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'])){
		// si la requête ne vient pas de ce serveur, l'interrompre, quelqu'un tente de l'utiliser pour envoyer du spam.
		die("You shouldn't be here.");
	}
	
	$timestamp = intval($_POST['timestamp']);
	$name = trim($_POST['name']);
	$email = trim($_POST['email']);
	$subject = trim($_POST['subject']);
	$message = trim($_POST['message']);

	if ($subject != '') {
		die('Get out robot');
	}

	if ($name == '') {
		// Le nom a-t-il bien été introduit?
		$errors['name'] = $config['no_name'];
	}

	if ($email == '') {
		// L'adresse email a-t-elle bien été encodée?
		$errors['email'] = $config['no_email'];
	} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// l'adresse email est-elle valide?
		$errors['email'] = $config['wrong_email'];
	}

	$time = time();
	if ($time < $timestamp + 5) {
		// Le formulaire a été soumis moins de 5 secondes après le chargement de la page.
		// A robot may be trying to submit it automatically.
		$errors['time'] = $config['too_fast'];
	}

	if ($message == '') {
		// Le message a-t-il bien été introduit?
		$errors['message'] = $config['no_message'];
	}

	if (count($errors) < 1) {
		foreach ($_POST as $key => $val){
			if (!in_array($key, array('name', 'email', 'subject', 'timestamp', 'message'))){
				if(is_array($val)){
					$message.="\n\r$key = ".implode(',', $val);
				} else {
					$message.="\n\r$key = $val";
				}
			}
		}

		$message .= "\n\r($name : $email)";
		$message = wordwrap($message, 70, "\r\n");

		$subject = "Message de " . $name . " depuis le portfolio";
		$headers = "From:'" . $name . "' <info@martindenis.be>\r\n" . "Reply-To:" . $email . "\r\n";

		mail($config['email'], $subject, $message, $headers);

		$messageSent = true;
	}
}
?>