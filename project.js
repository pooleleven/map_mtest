function menuComponent() {
    return {
        menu: { top: [], bottom: [] },
        content: '',
        pageTitle: '',
        includeFile: '',
        dynamicModule: '',
        loadedHtml: '',

        async init() {
            const res = await fetch('get_menu_data.php');
            this.menu = await res.json();
        },

        async loadPage(slug) {
            this.pageTitle = '';
            this.loadedHtml = '';
            this.includeFile = '';
            this.dynamicModule = '';
            this.content = '';

            try {
                const res = await fetch('get_page_content.php?slug=' + encodeURIComponent(slug));
                const data = await res.json();
                this.pageTitle = data.titel;
                this.includeFile = data.include_file;
                this.dynamicModule = data.js_module || null;

                // Lade HTML-Content (Include-Datei dynamisch laden)
                const htmlRes = await fetch('includes/' + this.includeFile);
                this.loadedHtml = await htmlRes.text();
            } catch (err) {
                this.pageTitle = 'Fehler';
                this.loadedHtml = '<p>Fehler beim Laden der Seite.</p>';
                console.error(err);
            }
        }
    };
}

function gridComponent() {
    return {
        objects: [],

        async init() {
            try {
                const res = await fetch('get_appdata.php?app=objects');
                this.objects = await res.json();
            } catch (err) {
                console.error('Fehler beim Laden der Objekte:', err);
            }
        },

        async save(obj) {
            try {
                const res = await fetch('save_object.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                });
                const result = await res.json();
                if (result.success) {
                    alert('Objekt gespeichert');
                } else {
                    alert('Fehler beim Speichern');
                }
            } catch (err) {
                console.error('Fehler beim Speichern:', err);
                alert('Fehler beim Speichern');
            }
        }
    };
}

function mapComponent() {
    return {
        map: null,
        markers: [],
        objects: [],

        async init() {
            this.map = L.map('map').setView([47.5, 13.9], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(this.map);

            await this.loadObjects();
        },

        async loadObjects() {
            try {
                const res = await fetch('get_appdata.php?app=map');
                const data = await res.json();

                if (data.error) {
                    console.error(data.error);
                    return;
                }

                this.objects = data;
                this.renderMarkers();
            } catch (err) {
                console.error('Fehler beim Laden der Marker:', err);
            }
        },

        renderMarkers() {
            this.markers.forEach(marker => this.map.removeLayer(marker));
            this.markers = [];

            this.objects.forEach(obj => {
                const marker = L.marker([obj.latitude, obj.longitude])
                    .addTo(this.map)
                    .bindPopup(`<strong>${obj.name}</strong><br>${obj.description || ''}`);
                this.markers.push(marker);
            });
        },

        startAddMarker() {
            const onClick = e => {
                const { lat, lng } = e.latlng;
                const name = prompt("Name des neuen Objekts:");
                if (name) {
                    this.saveObject({ name, description: '', latitude: lat, longitude: lng });
                }
                this.map.off('click', onClick);
            };

            alert("Klicke auf die Karte, um einen neuen Marker zu setzen.");
            this.map.on('click', onClick);
        },

        async saveObject(obj) {
            try {
                const res = await fetch('save_object.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                });
                const result = await res.json();

                if (result.success) {
                    alert('Marker gespeichert.');
                    this.loadObjects(); // neu laden
                } else {
                    alert('Fehler beim Speichern.');
                }
            } catch (err) {
                console.error('Fehler beim Speichern:', err);
                alert('Fehler beim Speichern.');
            }
        }
    };
}
