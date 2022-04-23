<template>
  <div class="position-absolute top-0 end-0">
    <div
      v-for="(el, i) in info"
      v-bind:key="i"
      :class="'alert alert-dismissible fade show alert-' + el.status"
      role="alert"
    >
      {{ el.message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script src="./AlertController.js"></script>