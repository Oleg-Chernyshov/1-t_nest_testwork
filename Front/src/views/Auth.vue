<template>
  <section class="auth_section">
    <h3>Вход</h3>
    <div>
      <input class="my_input" placeholder="Почта" />
    </div>
    <div>
      <input class="my_input" placeholder="Пароль" />
    </div>
    <Btn @click="onClick" theme="info">Отправить</Btn>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Btn from "@/components/Btn/Btn.vue";
import axios from "axios";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const onClick = () => {
  axios
    .post(
      "http://localhost:3000/auth/login",
      "user=" + JSON.stringify(form.value)
    )
    .then((result) => {
      localStorage.setItem("access_token", result.data.access_token);
      router.push("/catalog");
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
</style>
