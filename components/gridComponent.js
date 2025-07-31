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
