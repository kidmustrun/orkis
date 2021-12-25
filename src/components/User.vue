<template>
  <div class="container">
    <h1>Сотрудник с id {{ $route.params.id }}</h1>
    <router-link to="/users">Назад</router-link>
    <hr />
    <div class="row">
      <div class="col-sm col-xl-3">
        <img v-if="user.photo" :src="user.photo" class="mb-2 rounded" />
        <br />
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <br />
        <a v-if="user.photo != plug" download="photo.jpg" :href="user.photo">Скачать картинку </a>
        <br />
        <div v-if="owner.id == this.$route.params.id || admin">
          <button  v-if="user.photo != plug" class="btn btn-accent mt-2" v-on:click="deletePhoto()">
            Удалить фотографию
          </button>
          <button class="btn btn-submit mt-2" v-on:click="submitFile()">
            Редактировать фотографию
          </button>
          <div v-show="showError" class="mt-2 alert alert-danger">
            {{ this.errorMessage }}
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush col-sm col-xl-9">
        <li class="list-group-item">
          {{ user.second_name }} {{ user.first_name }} {{ user.last_name }}
          <i v-if="owner.id == this.$route.params.id">- Это вы</i>
        </li>
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">
          Роль: <span v-if="user.role == 'agent'">Агент</span>
          <span v-if="user.role == 'manager'">Менеджер</span>
          <span v-if="user.role == 'accountant'">Бухгалтер</span>
          <span v-if="user.role == 'admin'">Администратор</span>
        </li>
        <li class="list-group-item">
          Организация: {{ org.name }}, {{ org.address }}, {{ org.email }},
          {{ org.phone }}
        </li>
        <li v-if="admin" class="list-group-item">
          <button  v-if="owner.id != $route.params.id" class="btn btn-accent mb-2 me-2" @click="deleteUser">
            Удалить пользователя
          </button>
          <button class="btn btn-submit mb-2" @click="clickEdit">
            Редактировать пользователя
          </button>
        </li>
        <li v-else class="list-group-item">
          <i
            >Для изменения учетной записи, пожалуйста, обратитесь к
            администратору.</i
          >
        </li>
      </ul>
    </div>
    <form v-if="clicked">
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="name@example.com"
        />
        <label for="email">Email</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="login"
          v-model="login"
          placeholder="login"
        />
        <label for="login">Логин</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Иван"
          v-model="name"
        />
        <label for="name">Имя</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="surname"
          v-model="surname"
          placeholder="Иванов"
        />
        <label for="surname">Фамилия</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model="lastname"
          placeholder="Иванович"
        />
        <label for="lastname">Отчество</label>
      </div>
      <div class="form-floating">
        <select class="form-select" id="orgs" v-model="org_edit">
          <option v-for="org in orgs" :value="org.id" :key="org.id">
            {{ org.name }}, {{ org.address }}
          </option>
        </select>
        <label for="orgs">Выберите организацию</label>
      </div>
      <div class="form-check form-check-inline mt-2 mb-2">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="man"
          value="male"
          v-model="gender"
        />
        <label class="form-check-label" for="man"> Мужской </label>
      </div>
      <div class="form-check form-check-inline mt-2 mb-2">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="woman"
          value="female"
          v-model="gender"
        />
        <label class="form-check-label" for="woman"> Женский </label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="roles" v-model="role">
          <option selected value="agent">Агент</option>
          <option value="manager">Менеджер</option>
          <option value="accountant">Бухгалтер</option>
          <option value="admin">Администратор</option>
        </select>
        <label for="roles">Выберите роль</label>
      </div>
      <button class="btn btn-submit" @click="sendEditUser">Отправить</button>
      <div v-show="showError" class="mt-2 alert alert-danger">
        {{ this.errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
import { putSomething } from "../api/put";
import { deleteSomething } from "../api/delete";
import { postFile } from "../api/postFile";

export default {
  name: "User",
  inject: ["reload"],
  data() {
    return {
      user: {},
      file: "",
      owner: {},
      org: {},
      orgs: {},
      clicked: false,
      email: "",
      login: "",
      name: "",
      surname: "",
      lastname: "",
      org_edit: "",
      gender: "",
      role: "",
      showError: false,
      loading: false,
      errorMessage: "",
      plug: "data:image/png;base64,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RUc0SHtyFMPq4RhwWCLEual3V5iY8vmYcjcVipHl4hC0yaoYEdvnscIn8p5guEokf17slqsYig8SqxzFyARdFSOXwPyqRLXNFi8sUvIoKEa2yWHgUMSwnqcd3pDh+Bj088XQ4k4ZWRXTTYeKcxUTDldH95XEGJa/eDBl+lQXS7K5KTcJfiPG6My/ZuHdS0WMHHCJ94dlAx6kwqI18DePtjx4+Wmn1uxAjGHGuY8Y1j7ExJz6KKIM7aeDdqv1OJEr3XykPbHxGzGGdX7w4yxG3pb80K5ELC0ZRpG2+FrcxXOn1eq+fotTWdfDJEiIcT7iTLt3EWOYY02MHaxA7LnHcI2OZerg0e/EKChi+MhV8g7VqxLDzKfgvsLp4EEDtoseKbj3TX2tksv59JXmuDyJH9/7rKXu62oxFq+2iXuaMrcNr84caAttKms25SzG6LtanmINnPOzGN7muZS+r2vFsAY38J7YQAzhOFEj/TBXns7ZT5Qv5Z5i7NFs9qE9HmC/zGazQdzf49Thc+wfnPkAjx22prPZJLggxv95SQtF1utsNhW3VBqnTT6SXQujezr++zl7sdpvy+3p4MfN10szFpBqH7MUurcQkxVmlmuNRqNeNq9uHG9wcMOu8oNXLOMmR7/x46y5zpCfevRb7Yue8wWQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQGQGACJAZAYAIkBkBgAiQH8D6g41mFbTVOWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTE0VDE1OjA5OjQ2KzAwOjAwWXioSgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0xNFQxNTowOTo0NiswMDowMCglEPYAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANjAwet69tQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA2MDDpL+3oAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1OTIxNDczODYzpZUcAAAAEnRFWHRUaHVtYjo6U2l6ZQAzNzE5QkKZr+i8AAAAQXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS9taW5za2dzbS9jaXR5Y29jby5ieS9maWxlcy9ub2ltYWdlLnBuZ1swXUl0Px4AAAAASUVORK5CYII="
    };
  },
  mounted() {
    setTimeout(() => {
      this.email = this.user.email;
      this.login = this.user.username;
      this.name = this.user.first_name;
      this.surname = this.user.second_name;
      this.lastname = this.user.last_name;
      this.gender = this.user.gender;
    }, 500);
  },
  created() {
    getSomething(`api/v1/users/${this.$route.params.id}`).then((resp) => {
      this.user = resp.data[0];
      console.log(this.user.photo==this.plug)
      this.org = resp.data[1];
    });
    getSomething("api/v1/user").then((response) => {
      this.owner = response.data[0];
    });
    getSomething("organisations").then((response) => {
      this.orgs = response.data;
    });
    
  },
  computed: {
    admin: function () {
      if (this.owner.role === "admin") return true;
      else return false;
    },
  },
  methods: {
    clickEdit() {
      this.clicked = !this.clicked;
    },
    deleteUser() {
      deleteSomething(`api/v1/users/${this.$route.params.id}/delete`).then(() =>
        this.$router.push("/users")
      );
    },
    sendEditUser() {
      putSomething(`api/v1/users/${this.$route.params.id}/update`, {
        email: this.email,
        username: this.login,
        first_name: this.name,
        second_name: this.surname,
        last_name: this.lastname,
        organisation: +this.org_edit,
        gender: this.gender,
        role: this.role,
      });
      this.reload();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      this.showError = false;
      let formData = new FormData();
      formData.append("file", this.file);
      var reader = new FileReader();
      reader.onloadend = () => {
        console.log("RESULT");
        this.file = reader.result;
        console.log(this.file);
        postFile(`api/v1/user/${this.$route.params.id}/photo`, {
          photo: reader.result,
        })
          .then(() => console.log("success"))
          .catch((error) => {
            if (error.response.data.error.code == 22001) {
              this.showError = true;
              this.errorMessage =
                "Превышен допустимый размер изображения. Пожалуйста, выберите изображение с меньшим размером.";
            }
          });
      };
      reader.readAsDataURL(this.file);
    },
    deletePhoto() {
      postFile(`api/v1/user/${this.$route.params.id}/photo/delete`);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
