<template>
  <div class="container">
    <h1>Сотрудник с id {{ $route.params.id }}</h1>
    <router-link style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" to="/users">Назад</router-link>
    
    <div style="background:white; margin-top:2%; padding:2%">
    <div class="row">
      <div class="col-sm col-xl-3">
        <img style="max-height:300px" v-if="user.photo" :src="user.photo" />
        <br />
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <br />
        <a download="photo.jpg" style="margin-top: 20px;color:black;font-size: 17px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" :href="user.photo">Скачать картинку </a>
        <br />
        <div v-if="owner.id == this.$route.params.id || admin">
          <button class="btn btn-danger mt-1" v-on:click="deletePhoto()">
            Удалить фотографию
          </button>
          <button class="btn btn-submit mt-1" v-on:click="submitFile()">
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
        <li class="list-group-item">
         Email: {{ user.email }}
        </li>
        <li class="list-group-item">Роль: {{ user.role }}</li>
        <li class="list-group-item">
          Организация: {{ org.name }}, {{ org.address }}, {{ org.email }},
          {{ org.phone }}
        </li>
        <li v-if="admin" class="list-group-item">
        <button class="btn btn-danger mb-2" @click="deleteUser">
          Удалить пользователя
        </button>
        <button class="btn btn-primary mb-2" @click="clickEdit">
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
    <div style="padding:1%">
    <form v-if="clicked">
      <h3>Редактирование пользователя</h3>
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
    </div>
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
      console.log(this.user);
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