<?php include_once PARTIALS_PATH . '_header.php'; ?>

<section id="projects" class="section section__fullheight pt-20">
    <div class="row flex-column flex-row-lg container-fluid pb-20">
        <h1 class="col-7 ff-serif text-body lh-animate">
            <span class="animate d-block" data-anim-type="lines">Personal &</span>
            <span class="animate d-block mt-n1" data-anim-type="lines" data-anim-delay="0.25">professional</span>
            <span class="animate d-block text-highlight mt-n1 fw-normal" data-anim-type="lines" data-anim-delay="0.5">projects</span>
        </h1>
        <div class="col-3 mt-30">
            <p class="h3 text-body animate" data-anim-type="lines" data-anim-delay="0.5">This is my playground, the place where I play around and try new stuff.</p>
            <p class="h3 text-body animate" data-anim-type="lines" data-anim-delay="0.75">Here you will find my <strike>latest</strike>, <strike>best</strike>, and most polished JavaScript experiments, as well as my latest personal work.</p>
        </div>
    </div>

    <div class="container-big">
        <ul id="projects-list" class="row d-flex flex-wrap">
            <li class="project animate col-6">
                <article>
                    <a href="//wishy.martindenis.be" target="_blank">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/wishy.webp" alt="Wishy" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Wishy</h3>
                        <p>Wishlist web application created for self-training purposes</p>
                        <ul class="project-tags">
                            <li class="tag-laravel">Laravel</li>
                            <li class="tag-tailwind">Tailwind.css</li>
                            <li class="tag-vue">Vue.js</li>
                        </ul>
                    </a>
                </article>
            </li>
            <li class="project animate col-6">
                <article>
                    <a href="/project/pewpew">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/pewpew.png" alt="Pew Pew" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Pew Pew</h3>
                        <p>Simulation of gravity, again. This time in space.</p>
                        <ul class="project-tags">
                            <li class="tag-js">JS</li>
                        </ul>
                    </a>
                </article>
            </li>
            <li class="project animate col-6">
                <article>
                    <a href="/project/double-pendulum">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/double-pendulum.png" alt="Double pendulum" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Double pendulum</h3>
                        <p>Simulation of the physics behind a double pendulum</p>
                        <ul class="project-tags">
                            <li class="tag-js">JS</li>
                        </ul>
                    </a>
                </article>
            </li>
            <li class="project animate col-6">
                <article>
                    <a href="/project/snake">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/snake.png" alt="Snake" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Snake</h3>
                        <p>Recreation of the famous Nokia game</p>
                        <ul class="project-tags">
                            <li class="tag-js">JS</li>
                        </ul>
                    </a>
                </article>
            </li>
            <li class="project animate col-6">
                <article>
                    <a href="/project/gravity-circular">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/gravity-circular.png" alt="Circular gravity" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Circular gravity</h3>
                        <p>Simulation of gravity physics, but around a disc, not a plane</p>
                        <ul class="project-tags">
                            <li class="tag-js">JS</li>
                        </ul>
                    </a>
                </article>
            </li>
            <li class="project animate col-6">
                <article>
                    <a href="/project/scratch">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/scratch.jpg" alt="Scratch game" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Scratch game</h3>
                        <p>Well, it's a scratch game</p>
                        <ul class="project-tags">
                            <li class="tag-js">JS</li>
                        </ul>
                    </a>
                </article>
            </li>
            <li class="project animate col-6">
                <article>
                    <a href="/project/gravity">
                        <div class="project-thumb-container">
                            <img src="./static/img/projects/gravity.png" alt="Gravity" loading="lazy" width="588" height="420">
                        </div>
                        <h3 class="ff-serif">Gravity</h3>
                        <p>Simulation of gravity physics. Click to throw the balls in the air</p>
                        <ul class="project-tags">
                            <li class="tag-js">JS</li>
                        </ul>
                    </a>
                </article>
            </li>
        </ul>
    </div>
</section>

<?php include PARTIALS_PATH . '_footer.php' ?>
