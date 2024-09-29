        </main>

        <footer id="footer" >
            <div class="container-fluid <?php echo $route['name'] !== 'contact' ? 'd-flex flex-column full-height' : '' ?>">
                <?php
                    if ($route['name'] !== 'contact') :
                ?>

                    <p class="flex-grow d-flex flex-column justify-center align-center">
                        <a class="footer_contact_link ff-serif h1 lh-animate text-hover-effect animate mb-0 mx-auto" href="/contact" data-anim-type="letters">Let's get in touch</a>
                        <a class="mb-0 btn btn-link hover-icon-effect" href="/contact">
                            Contact me
                            <svg class="icon">
                                <use href="/static/img/icons/icons.svg#arrow-right"></use>
                            </svg>
                        </a>
                    </p>

                <?php
                    endif;
                ?>

                <div id="footer__content" class="d-flex">
                    <a href="#top" class="js-sroll-to btn-circle absolute-center-x">
                        <svg class="icon">
                            <use href="/static/img/icons/icons.svg#arrow-up"></use>
                        </svg>
                    </a>

                    <p class="d-flex align-center">Made with ❤️ by Martin Denis</p>

                    <ul id="footer__socials" class="flex-basis justify-end navbar">
                        <li>
                            <a href="https://github.com/martydenis/" class="nav-link" target="_blank">
                                <svg class="icon">
                                    <use href="/static/img/icons/icons.svg#github"></use>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/martin-denis-593776a6/" class="nav-link" target="_blank">
                                <svg class="icon">
                                    <use href="/static/img/icons/icons.svg#linkedin"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </body>
</html>
