<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <div>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </div>
        <div>
          <router-link :to="{ name: 'questions' }">Вопросы</router-link>
        </div>
        <div>
          <router-link :to="{ name: 'categories' }">Категории</router-link>
        </div>
      </div>
      <div class="col-10">
        <router-view :setToken="setToken" />
      </div>
    </div>
  </div>
</template>

<script src="../../controllers/Admin/AdminController.js"></script>