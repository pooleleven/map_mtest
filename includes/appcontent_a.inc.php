<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Beschreibung</th>
      <th>Lat</th>
      <th>Lng</th>
      <th>Aktionen</th>
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
        <td><button @click="save(obj)">💾</button></td>
      </tr>
    </template>
  </tbody>
</table>

<template x-if="!objects.length">
  <p>Keine Daten vorhanden.</p>
</template>