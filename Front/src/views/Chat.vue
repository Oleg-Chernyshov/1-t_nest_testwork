<template>
  <div class="home">
    <div class="wrapper">
      <div class="chat">
        <p>Чат с поддержкой</p>
        <div class="chat-history">
          <div
            class="chat-history-item"
            v-for="message in messages"
            :key="message.id"
          >
            <p>{{ message.message }}</p>
          </div>
        </div>
        <p>Сообщение</p>
        <div>
          <input type="text" style="width: 250px" v-model="message" />
          <button
            @click="sendMessage"
            :disabled="is_admin == 'true' && chat_id == user_id"
          >
            Отправить
          </button>
        </div>
      </div>
      <div class="rooms" v-if="is_admin == 'true'">
        <p>Комнаты</p>
        <div class="rooms-list">
          <div class="rooms-list-item" v-for="room in chats" :key="room.id">
            <p
              v-if="!(user_id == room.id) && is_admin == 'true'"
              @click="joinRoom(room.id)"
              :style="room.id === chat_id ? 'text-decoration: underline' : ''"
            >
              Чат для пользователя - {{ room.id }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000', { autoConnect: false });

const user_id = localStorage.getItem('id');
const chat_id = ref(localStorage.getItem('id'));
const is_admin = localStorage.getItem('is_admin');
const chats = ref([]);
const messages = ref([]);
const message = ref('');

onMounted(() => {
  authorization();

  socket.on('connect_error', (error) => {
    console.error(error);
  });

  socket.on('createMessage', (data) => {
    messages.value.push(data);
  });

  socket.on('findAllMessage', (data) => {
    messages.value = data;
    console.log(messages.value);
  });

  if (localStorage.getItem('is_admin') == 'true') {
    socket.on('findAllChat', (data) => {
      chats.value = data;
      console.log(chats.value);
    });
    socket.emit('findAllChat');
  } else {
    socket.emit('findAllMessage', localStorage.getItem('id'));
  }
});

const authorization = () => {
  let cur_author = localStorage.getItem('id');
  socket.auth = { cur_author };
  socket.connect();
};

const sendMessage = () => {
  let send_message = {
    author_id: localStorage.getItem('id'),
    message: message.value,
    chat_id: chat_id.value,
  };

  socket.emit('createMessage', send_message);
  message.value = '';
};

const joinRoom = (cur_chat_id) => {
  socket.emit('leaveChat', { id: chat_id.value });
  chat_id.value = cur_chat_id;
  socket.emit('EnterChat', { id: chat_id.value });
};
</script>

<style scoped>
.wrapper {
  width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid gray;
}

.chat-history,
.rooms-list {
  width: 350px;
  height: 300px;
  background-color: #f5f5f5;
  overflow-y: scroll;
}

.rooms-list-item > p {
  cursor: pointer;
}

.enter {
  margin: 0px;
  margin-right: 10px;
}
.chat-history-item {
  padding: 10px;
  border: 1px solid #bebebe;
  text-align: left;
}

.home {
  display: flex;
  justify-content: center;
}
</style>
