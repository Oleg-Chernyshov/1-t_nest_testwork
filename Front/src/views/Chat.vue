<template>Чат</template>
<script setup>
import { onMounted, ref } from 'vue';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000', { autoConnect: false });

const chat_id = ref(localStorage.getItem('chat_id'));
const chats = ref([]);
const messages = ref([]);
const message = ref('');

onMounted(() => {
  authorization();

  socket.on('connect_error', (error) => {
    console.error(error);
  });

  socket.on('get-chats', (data) => {
    chats.value = data;
  });

  socket.on('chats_list_changed', (data) => {
    rooms.value.push(data);
  });

  socket.on('message', (data) => {
    messages.value.unshift(data);
  });
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

  socket.emit('message', send_message);
  message.value = '';
};

const joinRoom = (cur_chat_id) => {
  socket.emit('leave_room', { chat_id: chat_id.value });
  chat_id.value = cur_chat_id;
  socket.emit('join_room', { chat_id: chat_id.value });
};
</script>
