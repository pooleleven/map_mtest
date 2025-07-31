<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Menü mit Untermenüs</title>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="project.js" defer></script>
</head>
<body x-data="menuComponent()" x-init="init()">

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

<!-- Include-Dateien rendern ihren eigenen Content-Bereich -->
<template x-if="includeFile">
  <div class="content-area" x-data="window[dynamicModule] ? window[dynamicModule]() : {}" x-init="init()">
    <h2 x-text="pageTitle"></h2>
    <div x-html="loadedHtml"></div>
  </div>
</template>



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

<script src="project.js"></script>

</body>
</html>
