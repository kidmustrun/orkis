<template>
  <div class="container">
    <h1 style="font-size:30px">Отели</h1>
    <router-link style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" to="/main">Назад</router-link>
    
    <div style="background:white; margin-top:2%; padding:2%">
    <ul class="list-group" v-for="city in cities" :key="city.id">
      <li class="list-group-item">
        {{ city.id }}.
        {{ city.city }}
      </li>
      <ul  v-for="hotel in hotels" :key="hotel.id">
        
      <li style="font-size:17px; margin:3px;list-style-type: none; background: #f5d4ff; padding:4px; border-radius: 5px;" v-if="city.id == hotel.cityId" >
        {{ hotel.name }} <br>
        <span style="font-size:14px">Адрес - {{ hotel.address }}</span><br>
        <span style="font-size:14px">Категория - {{ hotel.category }}</span>
      </li>
    </ul>
    </ul>
    
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Hotels",
  inject: ["reload"],
  data() {
    return {
      hotels: [],
      cities: [],
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  created() {
    getSomething("api/v1/hotels").then((resp) => {
      this.hotels = resp.data;
      this.loading = false;
    });
    getSomething("api/v1/cities").then((resp) => {
      this.cities = resp.data;
      this.loading = false;
    });
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
