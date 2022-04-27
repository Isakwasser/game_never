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
        <button
          type="button"
          class="islike btn btn-danger mx-1"
          @click="setDislike"
          ref="dislike"
        >
          <i class="far fa-thumbs-down"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary mx-3 fw-bold"
          @click="updateQuestion"
        >
          Дальше
        </button>
        <button
          type="button"
          class="islike btn btn-success mx-1"
          @click="setLike"
          ref="like"
        >
          <i class="far fa-thumbs-up"></i>
        </button>
      </div>
    </div>
    <div class="dropdown text-end">
      <button
        class="btn btn-secondary opacity-25"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fas fa-bars"></i>
      </button>
      <ul class="dropdown-menu mw-100">
        <li>
          <a
            class="dropdown-item text-truncate"
            href="#"
            @click="showDeveloperData = !showDeveloperData"
            >{{ showDeveloperData ? "Скрыть" : "Показать" }} информацию
            разработчика</a
          >
        </li>
        <li>
          <a class="dropdown-item text-truncate" href="/admin/login">Войти</a>
        </li>
      </ul>
    </div>
    <div
      class="position-fixed bottom-0 end-0 text-end lh-1 pb-1"
      v-if="showDeveloperData && data.length"
    >
      <div>
        id: {{ data[0] ? data[0].id : "..." }}<br />
        category: {{ data[0] ? data[0].categoryId : "..." }}<br />
        likes: {{ data[0] ? data[0].ratingPlus : "..." }}<br />
        dislikes: {{ data[0] ? data[0].ratingMinus : "..." }}<br />
      </div>
    </div>
  </div>
</template>

<script src="@/controllers/User/UserController.js"></script>
<style scoped src="@/styles/User/UserView.css"></style>