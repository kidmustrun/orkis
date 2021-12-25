<template>
  <div class="container">
    <h1 style="font-size:30px">Предварительное соглашение с id {{ $route.params.id }}</h1>
    <router-link style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" to="/preagreements">Назад</router-link><br>
    <router-link v-if="canAdd & (preagreement.agreement === 0)" style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" :to="AddAgr(preagreement.id)">Создать договор на основе соглашения</router-link>
    
    <div style="background:white; margin-top:2%; padding:2%">
    <ul class="list-group list-group-flush" style="margin-bottom:10px">
      <li class="list-group-item">
        Дата и время создания соглашения - {{ preagreement.date }} 
      </li>
      <li class="list-group-item">Начало поездки: {{ preagreement.start }}</li>
      <li class="list-group-item">Конец поездки: {{ preagreement.end }}</li>
      <li class="list-group-item">Количество туристов: {{ preagreement.TouristsCount }}</li>
      <li v-if="preagreement.agreement === 0" style="background:#a33333; color:white" class="list-group-item">Не оформлено</li>
      <li v-if="preagreement.agreement === 1" style="background:#2e470b; color:white" class="list-group-item">Успешно оформлено</li>
    </ul>

    <h5>Данные о <router-link style="color:green" :to="clientOpen(client.id)">клиенте</router-link></h5>
    <ul class="list-group list-group-flush" style="margin-bottom:10px">
      <li class="list-group-item">
        ФИО - {{ client.second_name }} {{ client.first_name }} {{ client.last_name }}
      <li class="list-group-item">Дата рождения: {{ client.birth_date }}</li>
      <li class="list-group-item">Телефон: {{ client.phone }}</li>
      <li class="list-group-item">Город: {{ client.city }}</li>
      <li class="list-group-item">Статус: {{ client.status }}</li>
      <li class="list-group-item">Пол: {{ client.gender }}</li></ul>

    <h5>Данные о городах посещения</h5>
    <div style="margin-bottom:10px">
    <ul class="list-group" v-for="city in cities" :key="city.id" >
    <li class="list-group-item">{{ city.city }}</li>
    </ul></div>
    <h5 style="margin-bottom:20px">Данные о <router-link style="color:green" :to="userOpen(user.id)">сотруднике</router-link></h5>

    <button @click="deletePreagr" v-if="admin" class="btn btn-danger mb-2 me-2" >
      Удалить соглашение
    </button>
    <button  @click="clickEdit" v-if="canAdd" class="btn btn-success mb-2">
      Редактировать соглашение
    </button>


     <form v-if="clicked" class="p-3 bg-light">
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="pr_start"
          v-model="pr_start"
        />
        <label for="pr_start">Дата начала поездки</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="pr_end"
          v-model="pr_end"
        />
        <label for="pr_end">Окончание поездки</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          id="count"
          v-model="pr_tourists"
        />
        <label for="count">Количество туристов</label>
      </div>

      <div class="form-floating">
        <select name="cities[]" multiple="multiple" class="form-select" id="cities" v-model="pr_cities">
          <option v-for="city in citiesAll" :value='city.id' :key="city.id">
            {{ city.id }}.{{ city.city }}
          </option>
        </select>
      </div>

      <button
        class="btn btn-success"
        style="margin-bottom: 3%"
        @click="sendEditPreagr"
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
import { deleteSomething } from "../api/delete";

export default {
  name: "Preagreement",
  inject: ["reload"],
  data() {
    return {
      user: {},
      preagreement: {},
      cities:[],
      employee:{},
      client:{},
      citiesAll:[],
      
      clicked:"",

      pr_id:"",
      pr_date:"",
      pr_org:"",
      pr_client:"",
      pr_torists:"",
      pr_employee:"",
      pr_start:"",
      pr_end:"",
      pr_agreement:"",
      pr_cities:[],

      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  computed: {
    canAdd: function () {
      if ((this.user.role === "accountant")) return false;
      else return true;
    },
    admin: function () {
      if ((this.user.role === "admin")) return true;
      else return false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.pr_id = this.preagreement.id;
      this.pr_date = this.preagreement.date;
      this.pr_org = this.preagreement.organisationId;
      this.pr_client = this.preagreement.clientId;
      this.pr_tourists = this.preagreement.TouristsCount;
      this.pr_employee = this.preagreement.employee;
      this.pr_start = this.preagreement.start;
      this.pr_end = this.preagreement.end;
      this.pr_agreement = this.preagreement.agreement;

    }, 500);
  },
  created() {
    getSomething(`api/v1/preagreements/${this.$route.params.id}`).then(
      (resp) => ((this.preagreement = resp.data[0]), (this.cities = resp.data[1]), (this.client = resp.data[2]), (this.employee = resp.data[3]))
    );
    getSomething('api/v1/user').then((response) => {
      this.user = response.data[0];
    });
    getSomething('api/v1/cities').then((response) => {
      this.citiesAll = response.data;
    });
  },
  methods: {
    clientOpen: function (id) {
      return `/clients/${id}`;
    },
    userOpen: function (id) {
      return `/users/${id}`;
    },
    AddAgr: function (id) {
      return `/addagr/${id}`;
    },
    deletePreagr() {
      deleteSomething(`api/v1/preagreements/${this.$route.params.id}/delete`).then(() =>
        this.$router.push("/preagreements")
      );
    },
    clickEdit() {
      this.clicked = !this.clicked;
    },
    sendEditPreagr() {
      for (let $i in this.pr_cities, $i++){
          $i = '{id:'+$i+'}'
      }
      putSomething(`api/v1/preagreements/${this.$route.params.id}/update`, {
        start: this.pr_start,
        end: this.pr_end,
        TouristsCount: this.pr_tourists
      });
      putSomething(`api/v1/preagreements/${this.$route.params.id}/updateCities`, {
        cities: this.pr_cities
      });
      this.reload();
    },

  }
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

</style>
