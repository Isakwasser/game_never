<template>
  <div>
    <h2>Questions</h2>
    <div class="d-flex">
      <nav aria-label="Page navigation" v-if="numOfPages > 1">
        <ul class="pagination m-0">
          <li
            class="page-item"
            :class="{
              disabled: page == 1,
            }"
            @click="prevPage"
          >
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="(el, i) in pageItem"
            v-bind:key="i"
            :class="{
              active: el == page,
            }"
            @click="changePage(el)"
          >
            <a class="page-link" href="#">
              {{ el }}
            </a>
          </li>
          <li
            class="page-item"
            :class="{
              disabled: page == numOfPages,
            }"
            @click="nextPage"
          >
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-success ms-auto"
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
          <th>category</th>
          <th>title</th>
          <th>text</th>
          <th>positive</th>
          <th>negative</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, i) in tableData" v-bind:key="i">
          <td>{{ el.id }}</td>
          <td>{{ el.category.name }}</td>
          <td>{{ el.title }}</td>
          <td>{{ el.text }}</td>
          <td>{{ el.ratingPlus }}</td>
          <td>{{ el.ratingMinus }}</td>
          <td>
            <i
              class="fas fa-pen text-primary me-1"
              title="Редактировать"
              @click="
                idUpdate = el.id;
                titleUpdate = el.title;
                textUpdate = el.text;
                categoryIdUpdate = el.category.id;
              "
              data-bs-toggle="modal"
              data-bs-target="#updateModal"
            ></i>
            <i
              class="fas fa-trash-alt text-danger"
              title="Удалить"
              @click="deleteItem(el.id)"
            ></i>
          </td>
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
                <label for="addTitleModalInput" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="addTitleModalInput"
                  aria-describedby="addTitleModal"
                  v-model.trim="title"
                />
                <div id="addTitleModal" class="form-text">Заглавие вопроса</div>
              </div>
              <div class="mb-3">
                <label for="addTextModalInput" class="form-label">Text</label>
                <input
                  type="text"
                  class="form-control"
                  id="addTextModalInput"
                  v-model.trim="text"
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

    <!-- Modal Update -->
    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      aria-labelledby="updateModalLabel"
      aria-hidden="true"
      ref="updateModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">Изменить запись</h5>
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
                <label for="updateTitleModalInput" class="form-label"
                  >Title</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="updateTitleModalInput"
                  aria-describedby="addTitleModal"
                  v-model.trim="titleUpdate"
                />
                <div id="updateitleModal" class="form-text">
                  Заглавие вопроса
                </div>
              </div>
              <div class="mb-3">
                <label for="updateTextModalInput" class="form-label"
                  >Text</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="updateTextModalInput"
                  v-model.trim="textUpdate"
                />
              </div>
              <div class="mb-3">
                <label for="updateTextModalInput" class="form-label"
                  >Category</label
                >
                <select v-model="categoryIdUpdate" class="form-select">
                  <option v-for="(el, i) in categories" :value="el.id" :key="i">
                    {{ el.name }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="updateItem">
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/controllers/Admin/QuestionsController.js"></script>