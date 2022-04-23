<template>
  <div>
    <h2>Categories</h2>
    <div>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addingModal"
      >
        Добавить запись
      </button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>question count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, i) in tableData" v-bind:key="i">
          <td>{{ el.id }}</td>
          <td>{{ el.name }}</td>
          <td>{{ el.description }}</td>
          <td>{{ el.questions.length }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addingModal"
      tabindex="-1"
      aria-labelledby="addingModalLabel"
      aria-hidden="true"
      ref="addingModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addingModalLabel">Добавить запись</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="addTitleModalInput" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="addTitleModalInput"
                  aria-describedby="addTitleModal"
                  v-model.trim="name"
                />
                <div id="addTitleModal" class="form-text">
                  Название категории
                </div>
              </div>
              <div class="mb-3">
                <label for="addTextModalInput" class="form-label"
                  >Description</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="addTextModalInput"
                  v-model.trim="description"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="addItem">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/controllers/Admin/CategoriesController.js"></script>