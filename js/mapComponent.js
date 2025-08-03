// js/mapComponent.js

function mapComponent() {
    return {
        map: null,
        markers: [],
        objects: [],

        async init() {
            // Leaflet-Map ggf. vorher entfernen (bei erneutem Laden der Seite!)
            if (this.map) {
                this.map.remove();    // Entfernt die alte Map-Instanz sauber
                this.map = null;
            }

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

// WICHTIG: Komponente global machen!
window.mapComponent = mapComponent;
console.log('mapComponent global gesetzt:', typeof window.mapComponent);
