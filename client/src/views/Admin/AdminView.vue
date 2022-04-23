<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <div v-if="!isLogin">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </div>
        <div v-else>
          <div>
            <button @click="logout">Logout</button>
          </div>
          <div>
            <router-link :to="{ name: 'questions' }">Вопросы</router-link>
          </div>
          <div>
            <router-link :to="{ name: 'categories' }">Категории</router-link>
          </div>
        </div>
      </div>
      <div class="col-10">
        <router-view :setToken="setToken" :setInfo="setInfo" :token="token" />
      </div>
    </div>
    <AlertView :info="info" />
  </div>
</template>

<script src="../../controllers/Admin/AdminController.js"></script>