<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Оформить договор</h1>

    <h6 style="color:white">Данные о датах поездки</h6>
    <ul class="list-group list-group-flush" style="margin-bottom:10px">
      <li class="list-group-item">
        С {{ preagreement.start }} по {{ preagreement.end }}</li>
      </ul>

    <h6 style="color:white">Данные о городах</h6>
    <ul class="list-group" v-for="city in cities" :key="city.id" >
      <li class="list-group-item">{{ city.city }}</li>
    </ul><br>

    <h6 style="color:white">Кол-во туристов - {{ preagreement.TouristsCount }}</h6><br>

    
      
    </form>
    <button class="w-100 btn btn-submit btn-lg btn-primary" style="margin-top:10px" @click="sendPreagr()">
     Добавить предв.соглашение
    </button>
    <router-link style="color:#87748c; margin-top:1%" to="/main">На главную</router-link>
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
import { postSomething } from "../api/post.js";
export default {
  name: "AddAgreement",
  data() {
    return {
      clients:{},
      countries:{},
      cities:{},
      preagreement: {},
      hotels:{},
     
      showError: false,
      loading: false,
      errorMessage: "",
      orgs: {},
    };
  },
  created() {
    getSomething("api/v1/hotels").then((response) => {
      this.hotels = response.data;
    });
    getSomething("api/v1/cities").then((response) => {
      this.cities = response.data;
    });
    getSomething(`api/v1/preagreements/${this.$route.params.id}`).then(
      (resp) => ((this.preagreement = resp.data[0]), (this.cities = resp.data[1]), (this.client = resp.data[2]), (this.employee = resp.data[3]))
    );
  },
  methods: {
    sendPreagr() {
      this.loading = true;
      this.showError = false;
      postSomething('api/v1/preagreements/create',{
        TouristsCount: this.count,
        start: this.start,
        end: this.end,
        clientId: this.client,
        cities: this.pr_cities,
      })
      
        .then((resp) => {
          this.loading = false;
          this.$router.push(`/preagreements/${resp.data.data.id}`);
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.response.data.error.errors;
          this.showError = true;
          console.log(error);
          
          
        });
        this.$router.push(`/preagreements`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/downloading.scss";
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
