
    <p>Testausgabe: <span x-text="typeof activeSlug !== 'undefined' ? activeSlug : 'n/a'"></span></p>
    <button @click="startAddMarker()">🞧 Marker hinzufügen</button>
    <!-- Kartencontainer -->
    <div id="map" style="height: 500px; margin-bottom: 1em;"></div>

    <!-- Objektliste / optional editierbar 
    <template x-if="objects.length">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Beschreibung</th>
                    <th>Lat</th>
                    <th>Lng</th>
                </tr>
            </thead>
            <tbody>
                <template x-for="obj in objects" :key="obj.id">
                    <tr>
                        <td x-text="obj.id"></td>
                        <td><input x-model="obj.name" /></td>
                        <td><input x-model="obj.description" /></td>
                        <td><input x-model="obj.latitude" /></td>
                        <td><input x-model="obj.longitude" /></td>
                    </tr>
                </template>
            </tbody>
        </table>
    </template> -->

    <template x-if="!objects.length">
        <p>Keine Daten geladen.</p>
    </template>

