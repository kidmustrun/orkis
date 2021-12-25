<template>
  <div class="container">
    <h1 style="font-size:30px">Договор с id {{ $route.params.id }}</h1>
    <router-link style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" to="/agreements">Назад</router-link><br>
    <router-link v-if="accountant & (agreement.payment === 0)" style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" to="/addpreagr">Оплатить договор</router-link><br>
    <router-link :to="preagrOpen(agreement.preagreement)" style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back">Открыть предварительное соглашение</router-link>
    
    <div style="background:white; margin-top:2%; padding:2%">
    <ul class="list-group list-group-flush" style="margin-bottom:10px">
      <li class="list-group-item">
        Дата и время создания соглашения - {{ agreement.date }} 
      </li>
      <li class="list-group-item">Начало поездки: {{ agreement.start }}</li>
      <li class="list-group-item">Конец поездки: {{ agreement.end }}</li>
      <li class="list-group-item">Количество туристов: {{ preagreement.TouristsCount }}</li>
      <li v-if="agreement.payment == 0" style="background:#a33333; color:white" class="list-group-item">Оплачен</li>
      <li v-if="agreement.payment == 1" style="background:#2e470b; color:white" class="list-group-item">Не оплачен</li>
    </ul>

    <h5>Данные о <router-link style="color:green" :to="clientOpen(client.id)">клиенте</router-link></h5>
    <ul class="list-group list-group-flush" style="margin-bottom:10px">
      <li class="list-group-item">
        ФИО - {{ client.second_name }} {{ client.first_name }} {{ client.last_name }}
      <li class="list-group-item">Телефон: {{ client.phone }}</li>
      <li class="list-group-item">Город: {{ client.city }}</li>
      <li class="list-group-item">Статус: {{ client.status }}</li></ul>

    <h5>Данные о городах посещения</h5>
    <div style="margin-bottom:10px">
    <ul class="list-group" v-for="city in cities" :key="city.id" >
    <li class="list-group-item">{{ city.city }}</li>
    </ul>
    
    <h5>Данные о отелях проживания</h5>
    <ul class="list-group" v-for="hotel in hotels" :key="hotel.id" >
      <li class="list-group-item active">{{ hotel.name }} {{ hotel.category }}, Адрес - {{ hotel.address }}</li>
      <ol style="margin-left: 20px"  v-for="number in rooms" :key="number.id" >
      <li class="list-group-item" v-if="number.hotel === hotel.id">Номер {{ number.roomType }} {{ number.bedCount }}-х спальный
        <p>Заезд - {{number.arrival}}</p>
        <p>Выезд - {{number.departure}}</p>
      </li>
    </ol>
    </ul>



    <h5>Данные о туристах</h5>
    <ul style="margin: 5px" class="list-group" v-for="tourist in tourists" :key="tourist.id" >
      <li class="list-group-item">{{ tourist.first_name }} {{ tourist.last_name }} {{ tourist.second_name }}</li>
      <li class="list-group-item">Паспортные данные - {{ tourist.passportId }} {{ tourist.PassportSeries }}</li>
    </ul>

    </div>
    <h5 style="margin-bottom:20px">Данные о <router-link style="color:green" :to="userOpen(user.id)">сотруднике</router-link></h5>



    <button @click="deleteAgr" v-if="admin" class="btn btn-danger mb-2 me-2" >
      Удалить договор
    </button>
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
import { putSomething } from "../api/put";
import { deleteSomething } from "../api/delete";

export default {
  name: "Agreement",
  inject: ["reload"],
  data() {
    return {
      user: {},
      preagreement: {},
      agreement: {},
      cities:[],
      rooms:[],
      hotels:[],
      tourists:[],
      employee:{},
      client:{},
      citiesAll:[],
      
      clicked:"",

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
    accountant: function () {
      if ((this.user.role === "accountant")) return true;
      else return false;
    },
  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  created() {
    getSomething(`api/v1/agreements/${this.$route.params.id}`).then(
      (resp) => ((this.agreement = resp.data[0]), (this.rooms = resp.data[2]), (this.tourists = resp.data[3]), (this.hotels = resp.data[4]))
    );
    getSomething(`api/v1/agreements/preagreement/${this.$route.params.id}`).then(
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
    preagrOpen: function (id) {
      return `/preagreements/${id}`;
    },
    clientOpen: function (id) {
      return `/clients/${id}`;
    },
    userOpen: function (id) {
      return `/users/${id}`;
    },
    deleteAgr() {
      deleteSomething(`api/v1/agreements/${this.$route.params.id}/delete`).then(() =>
        this.$router.push("/agreements")
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
