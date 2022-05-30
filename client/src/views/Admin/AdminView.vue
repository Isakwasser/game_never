<template>
  <div class="container-fluid">
    <div class="row Admin__window flex-column flex-md-row">
      <div class="col-md-2 bg-dark pt-3">
        <div v-if="!isLogin">
          <router-link :to="{ name: 'login' }" class="btn w-100 mb-3 btn-light" >Login</router-link>
        </div>
        <div v-else>
          <div>
            <button @click="logout" class="btn w-100 mb-3 btn-outline-light">Logout</button>
          </div>
          <div>
            <router-link :to="{ name: 'questions' }" class="btn w-100 mb-3 btn-outline-light" active-class="btn-light text-dark">Вопросы</router-link>
          </div>
          <div>
            <router-link :to="{ name: 'categories' }" class="btn w-100 mb-3 btn-outline-light" active-class="btn-light text-dark">Категории</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-10 py-3">
        <router-view :setToken="setToken" :setInfo="setInfo" :token="token" />
      </div>
    </div>
    <AlertView :info="info" />
  </div>
</template>

<script src="../../controllers/Admin/AdminController.js"></script>
<style>
@import "@/styles/Admin/AdminView.css";
</style>