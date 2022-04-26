<template>
  <div class="UserView">
    <div
      class="
        position-absolute
        top-50
        start-50
        translate-middle
        container
        text-center
      "
    >
      <div v-if="data.length">
        <h2>{{ data[0] ? data[0].title : "" }}</h2>
        <h4>{{ data[0] ? data[0].text : "" }}</h4>
      </div>
      <div>
        <button type="button" class="btn btn-success mx-1" @click="setLike">
          =)
        </button>
        <button
          type="button"
          class="btn btn-primary mx-1"
          @click="updateQuestion"
        >
          Дальше
        </button>
        <button type="button" class="btn btn-danger mx-1" @click="setDislike">
          =(
        </button>
      </div>
    </div>
    <div
      class="position-fixed bottom-0 end-0 text-end lh-1 pb-1"
      v-if="data.length"
    >
      id: {{ data[0].id ? data[0].id : "" }}<br />
      category: {{ data[0].categoryId ? data[0].categoryId : "" }}<br />
      likes: {{ data[0].ratingPlus ? data[0].ratingPlus : "" }}<br />
      dislikes: {{ data[0].ratingMinus ? data[0].ratingMinus : "" }}<br />
      <router-link :to="{ name: 'admin' }">Админка</router-link>
    </div>
    <router-link :to="{ name: 'admin' }" class="lh-1 pb-1">Админка</router-link>
  </div>
</template>

<script src="@/controllers/User/UserController.js"></script>
<style scoped src="@/styles/User/UserView.css"></style>