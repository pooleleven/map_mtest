<?php
if (!isset($include_id)) $include_id = '';
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Menü mit Untermenüs</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>console.log('STARTSEITE');</script>
</head>
<body x-data="menuComponent()" x-init="init()">
<!-- TOP MENU -->
<nav class="main-nav">
    <ul>
        <template x-for="item in menu.top" :key="item.id">
            <li x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false"
                :class="{ 'has-children': item.children }">
                <a href="#" @click.prevent="loadPage(item.slug)" x-text="item.label"
                   :class="{ 'active': activeSlug === item.slug }"></a>

                <template x-if="item.children">
                    <ul class="submenu" :class="{ 'show': open }">
                        <template x-for="child in item.children" :key="child.id">
                            <li x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false"
                                :class="{ 'has-children': child.children }">
                                <a href="#" @click.prevent="loadPage(child.slug)" x-text="child.label"
                                   :class="{ 'active': activeSlug === child.slug }"></a>

                                <template x-if="child.children">
                                    <ul class="submenu" :class="{ 'show': open }">
                                        <template x-for="subchild in child.children" :key="subchild.id">
                                            <li>
                                                <a href="#" @click.prevent="loadPage(subchild.slug)" x-text="subchild.label"
                                                   :class="{ 'active': activeSlug === subchild.slug }"></a>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </li>
                        </template>
                    </ul>
                </template>
            </li>
        </template>
    </ul>
</nav>

<!-- CONTENT -->
<div class="content-area">
    <h2 x-text="pageTitle"></h2>
    <div id="dynamic-content"></div>
</div>

<!-- FOOT MENU -->
<nav class="footer-nav">
    <ul>
        <template x-for="item in menu.bottom" :key="item.id">
            <li>
                <a href="#" @click.prevent="loadPage(item.slug)" x-text="item.label"
                   :class="{ 'active': activeSlug === item.slug }"></a>
            </li>
        </template>
    </ul>
</nav>

<script>window.include_id = '<?= $include_id ?>';</script>

<script src="js/project.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>

</body>
</html>
