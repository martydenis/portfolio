<?php include_once PARTIALS_PATH . '_header.php'; ?>

<section id="hero" class="section">
    <div class="section__fullheight container-fluid justify-end">
        <div class="section__content">
            <p class="d-block animate" data-anim-type="lines">Hi there, I'm</p>
            <h1 class="d-block animate ff-serif lh-serif" data-anim-type="letters" data-anim-delay="0.5">Martin Denis</h1>
        </div>
    </div>
</section>

<section id="presentation" class="container-big section__fullheight pt-20">
    <div class="section__content">
        <div class="row justify-between flex-column flex-row-lg">
            <div class="col-5">
                <h2 class="animate m-0 h3 text-body" data-anim-type="lines">I'm a Web Designer and Frontend Developer based in Brussels.</h2>
                <p class="animate h3 text-body" data-anim-type="lines" data-anim-delay="0.5">I design web interfaces and build frontend applications, most of the time using modern technologies. My focus is on creating digital experiences that are both engaging and intuitive.</p>
            </div>
            <div class="col-5 mt-40">
                <p class="animate h3 text-body" data-anim-type="lines">At the end of the day, I just do what I love, really. I aim to build things that inspire me and, hopefully, bring a little bit of joy to others. The goal? Keep it interesting, keep it fun and make sure it looks, you know, not ugly.</p>
            </div>
        </div>
    </div>
</section>

<section id="projects" class="section__white">
    <div id="projects__intro__wrapper">
        <div id="projects__intro">
            <h2 id="projects__intro__title" class="ff-serif">my work</h2>
            <p class="animate">A selection of recent projects</p>
        </div>
    </div>

    <article id="project__sandbox" class="project section">
        <div class="pin-wrapper">
            <div class="container-big section__fullheight">
                <div class="section__content">
                    <h3 class="ff-serif">Sandbox</h3>
                    <p>My personal coding experiments & challenges. This is where I test out new ideas or explore different techniques.</p>
                    <p class="btn-container">
                        <a href="/projects" class="btn btn-link hover-icon-effect">
                            Play around
                            <svg class="icon">
                                <use href="/static/img/icons/icons.svg#arrow-right"></use>
                            </svg>
                        </a>
                    </p>
                </div>
            </div>
            <canvas id="project__sandbox__canvas" class="fullsize-canvas" width="300" height="200"></canvas>
        </div>
    </article>

    <article id="project__easy-alarm" class="project section">
        <div class="pin-wrapper">
            <div class="container-big section__fullheight">
                <div class="section__image">
                    <img src="static/img/easy-alarm.webp" alt="Easy Alarm" class="project__laptop" width="840" height="490">
                </div>
                <div class="section__content">
                    <h3 class="ff-serif">Easy-Alarm</h3>
                    <p>E-shop selling domestic safety systems.</p>
                    <p class="btn-container">
                        <a href="https://www.easy-alarm.be/" rel="noopener" class="btn btn-link hover-icon-effect" target="_blank">
                            See the e-shop
                            <svg class="icon">
                                <use href="/static/img/icons/icons.svg#arrow-up-right"></use>
                            </svg>
                        </a>
                    </p>
                </div>
            </div>
            <canvas id="project__easy-alarm__canvas" class="fullsize-canvas" width="300" height="200"></canvas>
        </div>
    </article>

    <article id="project__artinmov" class="project section">
        <div class="pin-wrapper">
            <div class="container-big section__fullheight">
                <div class="section__image">
                    <img src="static/img/artinmov.webp" alt="Art In Mov" class="project__laptop" width="840" height="490">
                </div>
                <div class="section__content">
                    <h3 class="ff-serif">Art in Mov</h2>
                    <p>E-shop selling contemporary African art.</p>
                    <p class="btn-container">
                        <a href="https://www.art-in-mov.com/fr/" rel="noopener" class="btn btn-link hover-icon-effect" target="_blank">
                            See the e-shop
                            <svg class="icon">
                                <use href="/static/img/icons/icons.svg#arrow-up-right"></use>
                            </svg>
                        </a>
                    </p>
                </div>
            </div>
            <canvas id="project__artinmov__canvas" class="fullsize-canvas" width="300" height="200"></canvas>
        </div>
    </article>

    <?php /*
        <article id="project__hexkingdom" class="project section">
            <div class="pin-wrapper">
                <div class="container-big section__fullheight">
                    <div class="section__image">
                        <picture>
                            <source srcset="static/img/hexkingdom.webp" type="image/webp">
                            <source srcset="static/img/hexkingdom.png" type="image/png"> 
                            <img src="static/img/hexkingdom.png" alt="HexKingdom" class="project__laptop" width="840" height="490" >
                        </picture>
                    </div>
                    <div class="section__content">
                        <h3 class="ff-serif">HexKingdom</h3>
                        <p>Round by round game imagined for multiplayer. Created as part of my end-of-study project.</p>
                        
                        <p class="btn-container">
                            <a href="/projects/hexkingdom/" class="btn" target="_blank">See the project</a>
                            <a href="/projects/pathfinding/" class="btn-link" target="_blank">Experimentation</a>
                        </p>
                    </div>

                    <picture>
                        <source srcset="static/img/hexkingdom_tile_1.webp" type="image/webp">
                        <source srcset="static/img/hexkingdom_tile_1.png" type="image/png"> 
                        <img src="static/img/hexkingdom_tile_1.png" alt="HexKingdom" id="hexkingdom_tile_1" class="hexkingdom_tile" width="180" height="256" >
                    </picture>

                    <picture>
                        <source srcset="static/img/hexkingdom_tile_2.webp" type="image/webp">
                        <source srcset="static/img/hexkingdom_tile_2.png" type="image/png"> 
                        <img src="static/img/hexkingdom_tile_2.png" alt="HexKingdom" id="hexkingdom_tile_2" class="hexkingdom_tile" width="224" height="336" >
                    </picture>

                    <picture>
                        <source srcset="static/img/hexkingdom_tile_3.webp" type="image/webp">
                        <source srcset="static/img/hexkingdom_tile_3.png" type="image/png"> 
                        <img src="static/img/hexkingdom_tile_3.png" alt="HexKingdom" id="hexkingdom_tile_3" class="hexkingdom_tile" width="328" height="385" >
                    </picture>

                    <picture>
                        <source srcset="static/img/hexkingdom_tile_4.webp" type="image/webp">
                        <source srcset="static/img/hexkingdom_tile_4.png" type="image/png"> 
                        <img src="static/img/hexkingdom_tile_4.png" alt="HexKingdom" id="hexkingdom_tile_4" class="hexkingdom_tile" width="256" height="303" >
                    </picture>
                </div>
            </div>
        </article>
        */ ?>
</section>
<!-- FIN PROJECTS -->

<?php include_once PARTIALS_PATH . '_footer.php' ?>
