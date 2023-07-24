<template>
  <div class="align-items-center text-center card">
    <p class="card-header">{{ cart_item_data.name }}</p>
    <p class="card-text fs-4">{{ cart_item_data.cost }} ₽</p>
    <p class="card-text">{{ cart_item_data.category_id.name }}</p>
    <p class="card-text">Кол-во: {{ cart_item_data.quantity }}</p>
    <button @click="deleteFromCart" class="btn btn-danger round">Delete</button>
  </div>
</template>
<script>
export default {
  name: 'v-cart-item',
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart');
    },
  },
};
</script>

<style>
.card-header {
  font-size: 20px;
  font-weight: 500;
}
.card-text {
  font-size: 15px;
}
.card-btn {
  border-radius: 10px;
  background: white;
  cursor: pointer;
}
.card-btn:hover {
  background: black;
  color: white;
}
.card {
  background-color: aquamarine;
  width: 200px;
  height: 300px;
  padding: 10px;
  margin: 10px;
}
</style>
