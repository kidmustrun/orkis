<template>
  <div class="container">
    <h1>Клиент с id {{ $route.params.id }}</h1>
    <router-link to="/clients">Назад</router-link>
    <hr />
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        {{ client.second_name }} {{ client.first_name }} {{ client.last_name }},
        {{ client.birth_date }}
      </li>
      <li class="list-group-item">Телефон: {{ client.phone }}</li>
      <li class="list-group-item">Город: {{ client.city }}</li>
      <li class="list-group-item">Статус: {{ client.status }}</li>
      <li class="list-group-item">Пол: {{ client.gender }}</li>
    </ul>
    <button class="btn btn-accent m-2" @click="deleteClient">
      Удалить клиента
    </button>
    <button @click="clickEdit" class="btn btn-submit m-2">
      Редактировать клиента
    </button>
    
    <form v-if="clicked" class="p-3 bg-light">
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
        <select class="form-select" id="status" v-model="status">
          <option selected value="normal">Стандартный</option>
          <option value="premium">Привилегированный</option>
          <option value="VIP">VIP</option>
        </select>
        <label for="status">Выберите роль</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="birth_date"
          v-model="birth_date"
          placeholder="Иванович"
        />
        <label for="birth_date">Дата рождения</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="city"
          v-model="city"
          placeholder="Город"
        />
        <label for="city">Город</label>
      </div>

      <div class="form-floating">
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="phone"
          pattern="[0-9]{11}"
          required
        />
        <label for="phone">Номер телефона</label>
      </div>
      <button
        class="btn btn-submit"
        style="margin-bottom: 3%"
        @click="sendEditClient"
      >
        Отправить
      </button>
      <div v-show="showError" class="mt-2 alert alert-danger">
        {{ this.errorMessage }}
      </div>
    </form>
    <hr />
    <div v-if="passportIsset">
      <h4>Паспорт не заполнен</h4>
      <button @click="clickAddPas" class="btn btn-submit m-2">
        Заполнить данные о паспорте
      </button>
      <form v-if="clickedAddPas" class="p-3 bg-light">
        <div class="form-floating">
          <input type="text" class="form-control" id="pasId" v-model="pasId" />
          <label for="pasId">Серия и номер</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="isuueOrg"
            v-model="issueOrg"
          />
          <label for="issueOrg">Орган выдавший документ</label>
        </div>
        <div class="form-floating">
          <input
            type="date"
            class="form-control"
            id="issueDate"
            v-model="issueDate"
          />
          <label for="issueDate">Дата выдачи</label>
        </div>
        <button
          class="btn btn-submit"
          style="margin-bottom: 3%"
          @click="sendPassport"
        >
          Созранить
        </button>
        <div v-show="showError" class="mt-2 alert alert-danger">
          {{ this.errorMessage }}
        </div>
      </form>
    </div>
    <div v-if="!passportIsset">
      <h3>Паспорт клиента</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Серия и номер паспорта: {{ passport.pasId }}
        </li>
        <li class="list-group-item">Дата выдачи: {{ passport.issueDate }}</li>
        <li class="list-group-item">
          Орган выдавший паспорт: {{ passport.issueOrg }}
        </li>
      </ul>
      <button @click="delPas" class="btn btn-accent m-2">
        Удалить данные о паспорте
      </button>

      <button @click="clickEditPas" class="btn btn-submit m-2">
        Редактировать паспорт клиента
      </button>
      <form v-if="clickedPas" class="p-3 bg-light">
        <div class="form-floating">
          <input type="text" class="form-control" id="pasId" v-model="pasId" />
          <label for="pasId">Серия и номер</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="isuueOrg"
            v-model="issueOrg"
          />
          <label for="issueOrg">Орган выдавший документ</label>
        </div>
        <div class="form-floating">
          <input
            type="date"
            class="form-control"
            id="issueDate"
            v-model="issueDate"
          />
          <label for="issueDate">Дата выдачи</label>
        </div>
        <button
          class="btn btn-submit"
          style="margin-bottom: 3%"
          @click="sendEditPassport"
        >
          Отправить
        </button>
        <div v-show="showError" class="mt-2 alert alert-danger">
          {{ this.errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
import { putSomething } from "../api/put";
import { postSomething } from "../api/post.js";
import { deleteSomething } from "../api/delete";

export default {
  name: "Client",
  inject: ["reload"],
  data() {
    return {
      client: {},
      passport: {},
      pas_id: "",
      error: "",
      pasId: "",
      issueDate: "",
      issueOrg: "",
      genderComp: "",
      clicked: false,
      clickedPas: false,
      clickedAddPas: false,
      name: "",
      surname: "",
      lastname: "",
      birth_date: "",
      gender: "",
      status: "",
      city: "",
      phone: "",
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  computed: {
    passportIsset: function () {
      if (this.passport.error === "нет") return true;
      else return false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.name = this.client.first_name;
      this.surname = this.client.second_name;
      this.lastname = this.client.last_name;
      this.gender = this.client.gender;
      this.birth_date = this.client.birth_date;
      this.status = this.client.status;
      this.city = this.client.city;
      this.phone = this.client.phone;

      this.pas_id = this.passport.id;
      this.pasId = this.passport.pasId;
      this.issueDate = this.passport.issueDate;
      this.issueOrg = this.passport.issueOrg;
      this.error = this.passport.error;
    }, 500);
  },
  created() {
    getSomething(`api/v1/clients/${this.$route.params.id}`).then(
      (resp) => ((this.client = resp.data[0]), (this.passport = resp.data[1]))
    );
  },
  methods: {
    deleteClient() {
      deleteSomething(`api/v1/clients/${this.$route.params.id}/delete`).then(() =>
        this.$router.push("/clients")
      );
    },
    clickEdit() {
      this.clicked = !this.clicked;
    },
    clickEditPas() {
      this.clickedPas = !this.clickedPas;
    },
    clickAddPas() {
      this.clickedAddPas = !this.clickedAddPas;
    },
    sendEditClient() {
      putSomething(`api/v1/clients/${this.$route.params.id}/update`, {
        first_name: this.name,
        second_name: this.surname,
        last_name: this.lastname,
        gender: this.gender,
        status: this.status,
        city: this.city,
        phone: this.phone,
        birth_date: this.birth_date,
      });
      this.reload();
    },
    sendEditPassport() {
      putSomething(`api/v1/clients/update/passport/${this.passport.id}`, {
        pasId: this.pasId,
        issueDate: this.issueDate,
        issueOrg: this.issueOrg,
      });
      this.reload();
    },
    sendPassport() {
      postSomething(`api/v1/clients/create/passport/${this.$route.params.id}`, {
        pasId: this.pasId,
        issueDate: this.issueDate,
        issueOrg: this.issueOrg,
      });
      this.reload();
    },
    delPas() {
      postSomething(`api/v1/clients/delete/passport/${this.passport.id}`, {});
      this.reload();
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
