<template>
<div class="form-signin">
<form>
    <h1 class="h3 mb-3 fw-normal">Зарегистрироваться</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="email" placeholder="name@example.com">
      <label for="email">Email</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="login" placeholder="login">
      <label for="login">Логин</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="name" placeholder="Иван">
      <label for="name">Имя</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="surname" placeholder="Иванов">
      <label for="surname">Фамилия</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="lastname" placeholder="Иванович">
      <label for="lastname">Отчество</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="password" placeholder="Пароль">
      <label for="password">Пароль</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="repeat_password" placeholder="Пароль еще раз">
      <label for="password">Повторите пароль</label>
    </div>
<select class="form-select" aria-label="Выбор организации">
  <option selected>Выберите организацию</option>
  <option value="1">Организация 1</option>
  <option value="2">Организация 2</option>
  <option value="3">Организация 3</option>
</select>
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Запомнить меня
      </label>
    </div>
    <button class="w-100 btn btn-submit btn-lg btn-primary" type="submit">Войти</button>
  </form>
  <router-link to="/signin">Войти</router-link>
</div>
</template>

<script>
export default {
  name: 'SignUp',
}
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
