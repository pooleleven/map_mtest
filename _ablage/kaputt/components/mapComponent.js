function mapComponent() {
    return {
        map: null,
        markerLayer: null,
        objects: [],
        addingMarker: false,

        async init() {
            this.map = L.map('map').setView([51.1657, 10.4515], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap'
            }).addTo(this.map);

            this.markerLayer = L.layerGroup().addTo(this.map);

            this.map.on('click', this.addMarkerOnClick.bind(this));

            await this.loadObjects();
        },

        async loadObjects() {
            try {
                const res = await fetch('get_appdata.php?app=map');
                this.objects = await res.json();
                this.refreshMarkers();
            } catch (err) {
                console.error('Fehler beim Laden der Kartenobjekte:', err);
            }
        },

        refreshMarkers() {
            this.markerLayer.clearLayers();
            this.objects.forEach(obj => {
                const marker = L.marker([obj.latitude, obj.longitude])
                    .bindPopup(`<b>${obj.name}</b><br>${obj.description}`);
                this.markerLayer.addLayer(marker);
            });
        },

        startAddMarker() {
            this.addingMarker = true;
        },

        addMarkerOnClick(event) {
            if (!this.addingMarker) return;
            this.addingMarker = false;

            const lat = event.latlng.lat;
            const lng = event.latlng.lng;

            const name = prompt('Name des Objekts:');
            const description = prompt('Beschreibung:');

            if (!name || !description) return;

            const newObj = { name, description, latitude: lat, longitude: lng };

            fetch('save_object.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObj)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        this.objects.unshift(result.object);
                        this.refreshMarkers();
                    } else {
                        alert('Fehler beim Speichern');
                    }
                })
                .catch(err => {
                    console.error('Fehler beim Speichern:', err);
                    alert('Fehler beim Speichern');
                });
        }
    };
}
