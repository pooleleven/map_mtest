function menuComponent() {
    return {
        menu: { top: [], bottom: [] },
        activeSlug: '',
        pageTitle: '',
        loadedHtml: '',
        includeFile: '',
        dynamicModule: null,

        async init() {
            const res = await fetch('get_menu_data.php');
            this.menu = await res.json();
        },

        async loadPage(slug) {
            this.activeSlug = slug;
            this.pageTitle = '';
            this.loadedHtml = '';
            this.includeFile = '';
            this.dynamicModule = null;

            try {
                const res = await fetch('get_page_content.php?slug=' + encodeURIComponent(slug));
                const data = await res.json();

                this.pageTitle = data.titel || '';
                this.loadedHtml = data.content || '';
                this.includeFile = data.php_include || '';
                this.dynamicModule = data.js_module || null;

                // Falls ein JS-Modul erforderlich ist, lade es dynamisch
                if (this.dynamicModule) {
                    await this.loadJSModule(this.dynamicModule);
                }

                // Alpine muss neu evaluieren, damit das dynamische x-data/x-init greift
                await this.$nextTick();
                Alpine.initTree(this.$el);

            } catch (err) {
                console.error('Fehler beim Laden der Seite:', err);
                this.pageTitle = 'Fehler';
                this.loadedHtml = '<p>Fehler beim Laden des Inhalts.</p>';
            }
        },

        async loadJSModule(moduleName) {
            // Suche die Datei im js/ Verzeichnis, z.B. gridComponent.js oder mapComponent.js
            const filename = `js/${moduleName}.js`;

            // Lade das Script nur, wenn es nicht schon vorhanden ist
            if (!window[moduleName]) {
                try {
                    await import(`../components/${filename}`);
                    console.log(`${moduleName} geladen.`);
                } catch (e) {
                    console.error(`Fehler beim Laden von ${filename}`, e);
                }
            }
        }
    };
}
