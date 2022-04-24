<template>
  <div class="position-absolute bottom-0 end-0">
    <div
      v-for="el in info"
      :key="el.item"
      :class="
        'alert position-relative overflow-hidden alert-dismissible fade show alert-' +
        el.status
      "
      role="alert"
    >
      {{ el.message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <div class="alert-bar w-100 position-absolute bottom-0 start-0">
        <div class="w-100 bg-warning"></div>
      </div>
    </div>
  </div>
</template>

<script src="./AlertController.js"></script>
<style scoped>
@import "./Alert.css";
</style>