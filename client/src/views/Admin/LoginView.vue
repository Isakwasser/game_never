<template>
  <div>
    <h2>Login</h2>

    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-5">Логин:</div>
          <div class="col-md-7" ref="login">
            <input type="text" class="w-100" v-model.trim="login" />
          </div>
          <div class="col-md-5">Пароль:</div>
          <div class="col-md-7" ref="password">
            <input type="text" class="w-100" v-model.trim="password" />
          </div>
          <div class="col-12 text-end">
            <button @click="tryLogin">Войти</button>
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script src="../../controllers/Admin/LoginController.js"></script>