<template>
  <div>
    <h2>Login</h2>

    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-5">Логин:</div>
          <div class="col-md-7" ref="login">
            <input
              type="text"
              class="w-100"
              v-model.trim="login"
              placeholder="Введите логин"
            />
          </div>
          <div class="col-md-5">Пароль:</div>
          <div class="col-md-7" ref="password">
            <input
              type="text"
              class="w-100"
              v-model.trim="password"
              placeholder="Введите пароль"
            />
          </div>
          <div class="col-12 text-end">
            <button @click="tryLogin">Войти</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../controllers/Admin/LoginController.js"></script>