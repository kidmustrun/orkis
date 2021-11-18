<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Зарегистрироваться</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
        <label for="email">Email</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="login"
          placeholder="login"
        />
        <label for="login">Логин</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="name" placeholder="Иван" />
        <label for="name">Имя</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="surname"
          placeholder="Иванов"
        />
        <label for="surname">Фамилия</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="lastname"
          placeholder="Иванович"
        />
        <label for="lastname">Отчество</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Пароль"
        />
        <label for="password">Пароль</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password2"
          placeholder="Пароль еще раз"
        />
        <label for="password2">Повторите пароль</label>
      </div>
      <div class="form-floating">
        <select
          class="form-select"
          id="orgs"
          aria-label="Floating label select example"
        >
          <option selected value="1">Организация 1</option>
          <option value="2">Организация 2</option>
          <option value="3">Организация 3</option>
        </select>
        <label for="orgs">Выберите организацию</label>
      </div>
      <div class="form-check form-check-inline mt-2 mb-2">
        <input class="form-check-input" type="radio" name="gender" id="man" />
        <label class="form-check-label" for="man"> Мужской </label>
      </div>
      <div class="form-check form-check-inline mt-2 mb-2">
        <input class="form-check-input" type="radio" name="gender" id="woman" />
        <label class="form-check-label" for="woman"> Женский </label>
      </div>
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="roles"
          aria-label="Floating label select example"
        >
          <option selected value="1">Роль 1</option>
          <option value="2">Роль 2</option>
          <option value="3">Роль 3</option>
        </select>
        <label for="roles">Выберите роль</label>
      </div>
      <button class="w-100 btn btn-submit btn-lg btn-primary" type="submit">
        Зарегистрироваться
      </button>
    </form>
    <router-link to="/signin">Войти</router-link>
  </div>
</template>

<script>
export default {
  name: "SignUp",
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
