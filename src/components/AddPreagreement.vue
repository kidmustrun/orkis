<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Оформить предварительное соглашение</h1>

      <div class="form-floating">
        <input type="number" class="form-control" id="count" v-model="count" />
        <label for="count">Кол-во туристов</label>
      </div>
      <div class="form-floating">
        <input type="date" class="form-control" id="start" v-model="start" />
        <label for="start">Начало поездки</label>
      </div>
      <div class="form-floating">
        <input type="date" class="form-control" id="end" v-model="end" />
        <label for="end">Конец поездки</label>
      </div>
      <div class="form-floating">
        <select class="form-select" id="clients" v-model="client">
          <option v-for="client in clients" :value="client.id" :key="client.id">
            {{ client.id }}.{{ client.first_name }} {{ client.last_name }}
          </option>
        </select>
        <label for="clients">Выберите клиента</label>
      </div>
      <div class="form-group">
        <label for="cities">Выберите города</label>
        <select
          name="cities"
          multiple
          class="form-control"
          id="cities"
          v-model="pr_cities"
        >
          <option v-for="city in cities" :value="city.id" :key="city.id">
            {{ city.id }}.{{ city.city }}
          </option>
        </select>
      </div>
      <div v-for="input in inputs" :key="input.input_id">
        <div class="form-floating">
          <select
            :name="input.hotel_label"
            class="form-select"
            :id="input.input_id"
            v-model="input.vmodel_hotel"
          >
            <option v-for="hotel in hotels" :value="hotel.id" :key="hotel.id">
              {{ hotel.id }}.{{ hotel.name }}
            </option>
          </select>
          <label :for="input.hotel_label">{{ input.hotel_label }}</label>
        </div>
        <div class="form-floating">
          <select
            :name="input.room_label"
            class="form-select"
            :id="input.input_id"
            v-model="input.vmodel_room"
          >
            <option v-for="room in rooms" :value="room.id" :key="room.id">
              {{ room.id }}.{{ room.name }}
            </option>
          </select>
          <label :for="input.room_label">{{ input.room_label }}</label>
        </div>
      </div>
      <button @click.prevent="addHotel()">Добавить отель</button>
    </form>
    <button
      class="w-100 btn btn-submit btn-lg btn-primary"
      style="margin-top: 10px"
      @click="sendPreagr()"
    >
      Добавить предв.соглашение
    </button>
    <router-link style="color: #87748c; margin-top: 1%" to="/main"
      >На главную</router-link
    >
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
  name: "AddPreagreement",
  data() {
    return {
      inputs: [
        {
          input_id: 1,
          hotel_label: "Добавить отель - 1",
          room_label: "Выберите номер - 1",
          vmodel_hotel: "selected_hotel1",
          vmodel_room: "selected_room1",
        },
      ],
      clients: {},
      countries: {},
      cities: {},
      count: "",
      start: "",
      end: "",
      client: "",
      pr_cities: [],
      hotels: [
        { id: 1, name: "Tokio Hotel" },
        { id: 2, name: "Moscow Hotel" },
      ],
      rooms: [
        { id: 1, name: "Комната обычная" },
        { id: 2, name: "Комната невероятная" },
      ],
      selected_hotels: [],
      showError: false,
      loading: false,
      errorMessage: "",
      orgs: {},
    };
  },
  created() {
    getSomething("api/v1/clients").then((response) => {
      this.clients = response.data;
    });
    getSomething("api/v1/cities").then((response) => {
      this.cities = response.data;
    });
    getSomething("api/v1/countries").then((response) => {
      this.countries = response.data;
    });
  },
  methods: {
    addHotel() {
      this.inputs.push({
        id: this.inputs.length + 1,
        hotel_label: "Добавить отель - " + (this.inputs.length + 1),
        room_label: "Выберите номер - " + (this.inputs.length + 1),
        vmodel_hotel: "selected_hotel" + (this.inputs.length + 1),
        vmodel_room: "selected_room" + (this.inputs.length + 1),
      });
    },
    sendPreagr() {
      this.loading = true;
      this.showError = false;
      let citiesArr = [];
      for (let i in this.pr_cities) {
        citiesArr.push({ id: this.pr_cities[i] });
      }
      let selectedHotelsArr = [];
      for (let i in this.inputs) {
        selectedHotelsArr.push({
          hotelid: this.inputs[i].vmodel_hotel,
          room: this.inputs[i].vmodel_room,
        });
        console.log(selectedHotelsArr);
      }

      postSomething("api/v1/preagreements/create", {
        TouristsCount: this.count,
        start: this.start,
        end: this.end,
        clientId: this.client,
        cities: citiesArr,
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
      // this.$router.push(`/preagreements`);
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
