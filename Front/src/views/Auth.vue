<template>
  <section class="auth_section">
    <h3>Вход</h3>
    <div>
      <input class="my_input" v-model="form.email" placeholder="Почта" />
    </div>
    <div>
      <input class="my_input" v-model="form.password" placeholder="Пароль" />
    </div>
    <Btn @click="onClick" theme="info">Отправить</Btn>
  </section>

  <section class="register_section auth_section">
    <h3>Регистрация</h3>
    <div>
      <input
        class="my_input"
        v-model="formRegister.email"
        placeholder="Почта"
      />
    </div>
    <div>
      <input
        class="my_input"
        v-model="formRegister.password"
        placeholder="Пароль"
      />
    </div>
    <Btn @click="onClickRegister" theme="info">Отправить</Btn>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Btn from '@/components/Btn/Btn.vue';
import axios from 'axios';

const router = useRouter();
const store = useStore();

const form = ref({
  email: '',
  password: '',
});

const formRegister = ref({
  email: '',
  password: '',
});

const onClick = () => {
  axios
    .post(
      'http://localhost:3000/auth/login',
      'user=' + JSON.stringify(form.value),
    )
    .then((result) => {
      store.dispatch('SET_ADMIN');
      localStorage.setItem('access_token', result.data.access_token);
      localStorage.setItem('is_admin', result.data.is_admin);
      localStorage.setItem('id', result.data.id);
      localStorage.setItem('chat_id', result.data.chat_id);
      router.push('/shop');
    });
};

const onClickRegister = () => {
  axios
    .post('http://localhost:3000/auth/register', formRegister.value)
    .then((result) => {
      if (result.data.id) {
        alert('Регестрация успешна');
      } else {
        alert('Ошибка');
      }
    });
};
</script>

<style scoped>
.auth_section {
  margin-left: 20px;
}
.my_input {
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  width: 30%;
  margin-bottom: 2px;
}

.register_section {
  margin-top: 20px;
}
</style>
