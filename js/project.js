console.log('include_id:', window.include_id);

function menuComponent() {
    return {
        menu: { top: [], bottom: [] },
        content: '',
        pageTitle: '',
        includeFile: '',
        dynamicModule: '',
        loadedHtml: '',
        activeSlug: '',

        async init() {
            const res = await fetch('get_menu_data.php');
            this.menu = await res.json();
        },

   async loadPage(slug) {
    this.pageTitle = '';
    this.includeFile = '';
    this.dynamicModule = '';
    this.content = '';
    this.activeSlug = slug;

    try {
        // 1. Hole die Metadaten zur Seite (Dateiname & JS-Modul)
        const res = await fetch('get_page_content.php?slug=' + encodeURIComponent(slug));
        const data = await res.json();
        this.pageTitle = data.titel;
        this.includeFile = data.include_file;
        this.dynamicModule = data.js_module || null;

        // 2. Lade das HTML
        const htmlRes = await fetch('includes/' + this.includeFile);
        const html = await htmlRes.text();
        console.log('set loadedHtml');

        // 3. Prüfe, ob ein dynamisches Modul geladen werden muss
        let scriptPromise = Promise.resolve();
        if (this.dynamicModule === 'gridComponent') {
            scriptPromise = new Promise(resolve => loadScript('js/gridComponent.js', resolve));
        }
        else if (this.dynamicModule === 'mapComponent') {
            scriptPromise = new Promise(resolve => loadScript('js/mapComponent.js', resolve));
        }
        await scriptPromise;
        console.log('script loaded', typeof window.gridComponent);

        // 4. Setze das HTML in den Container und initialisiere Alpine NUR auf diesen Bereich!
        const container = document.getElementById('dynamic-content');
        if (container) {
            container.innerHTML = html;
            Alpine.initTree(container);  // Jetzt werden alle Alpine-Direktiven im Grid aktiviert!
        }

    } catch (err) {
        this.pageTitle = 'Fehler';
        const container = document.getElementById('dynamic-content');
        if (container) container.innerHTML = '<p>Fehler beim Laden der Seite.</p>';
        console.error(err);
    }
}







    };
}

window.menuComponent = menuComponent;

function loadScript(src, callback) {
  // Lädt ein externes JS-Modul dynamisch nach
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

document.addEventListener('alpine:init', () => {
    Alpine.data('menuComponent', menuComponent);
});






