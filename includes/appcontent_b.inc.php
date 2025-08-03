<!-- <script>
    window.include_id = 'appcontent_b'; // oder 'appcontent_b'
</script> -->


<!-- Kartencontainer -->
<div x-data="mapComponent()" x-init="init()">
    <button @click="startAddMarker()">🞧 Marker hinzufügen</button>
    <div id="map" style="height: 500px; margin-bottom: 1em;"></div>



<template x-if="!objects.length">
    <p>Keine Daten geladen.</p>
</template>
</div>