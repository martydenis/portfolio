<nav class="nav absolute-center">
    <ul class="navbar">
        <li><a href="/" class="nav-link<?php echo $route['name'] === 'index' ? ' active' : '' ?>">Home</a></li>
        <li><a href="/projects" class="nav-link<?php echo $route['name'] === 'projects' ? ' active' : '' ?>">Work</a></li>
        <li><a href="/contact" class="nav-link<?php echo $route['name'] === 'contact' ? ' active' : '' ?>">Contact</a></li>
    </ul>
</nav>
