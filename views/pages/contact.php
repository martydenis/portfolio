<?php error_reporting(0); ?>
<?php require_once PARTIALS_PATH . '_form-validation.php'; ?>
<?php include_once PARTIALS_PATH . '_header.php'; ?>

<section id="contact" class="section section__fullheight pt-20 pb-20 container-fluid">
    <div class="row flex-column flex-row-lg">
        <div class="col-6">
            <h1 class="animate ff-serif lh-serif" data-anim-type="letters">Contact me</h1>

            <p class="h4 animate" data-anim-type="lines" data-anim-delay="0.45">Fill in this form and tell me anything.</p>
        </div>

        <div class="col-5 mt-20">
            <form action="#contact__form" method="post" id="contact__form" class="container-fluid">
                <?php
                    if(!$messageSent){
                ?>

                    <?php
                        if($_POST && $errors['time']){
                            echo '<p class="error-text">'.$errors['time'].'</p>';
                        }
                    ?>

                    <label for="name">Your name</label>
                    <input type="hidden" name="timestamp" value="<?php echo time() ?>">
                    <input type="text" id="name" required value="<?php echo ($name!='') ? $name: '' ?>"<?php if($_POST && $errors['name']) echo ' class="error"' ?> name="name">
                    <?php
                        if($_POST && $errors['name']){
                            echo '<p class="error-text">'.$errors['name'].'</p>';
                        }
                    ?>

                    <label for="email">Your email</label>
                    <input type="email" id="email" required value="<?php echo ($email!='') ? $email: '' ?>"<?php if($_POST && $errors['email']) echo ' class="error"' ?> name="email">
                    <?php
                        if($_POST && $errors['email']){
                            echo '<p class="error-text">'.$errors['email'].'</p>';
                        }
                    ?>
    
                    <label for="subject" class="subject">What is it about ?</label>
                    <input type="text" id="subject" value='' name="subject" class="subject">

                    <label for="message">What would you like to tell me ?</label>
                    <textarea id="message"<?php if($_POST && $errors['message']) echo ' class="error"' ?>name="message" required ><?php echo ($_POST['message']!='') ? $_POST['message']: '' ?></textarea>
                    <?php
                        if($_POST && $errors['message']){
                            echo '<p class="error-text">'.$errors['message'].'</p>';
                        }
                    ?>

                    <button type="submit" class="btn hover-icon-effect">
                        Send your message
                        <svg class="icon">
                            <use href="/static/img/icons/icons.svg#arrow-right"></use>
                        </svg>
                    </button>
                <?php
                    }
                    else {
                        echo '<p class="success-text">Thanks for your message, I\'ll soon reply to you.</p>';
                    }
                ?>
            </form>
        </div>
    </div>
</section>

<?php include_once PARTIALS_PATH . '_footer.php' ?>
