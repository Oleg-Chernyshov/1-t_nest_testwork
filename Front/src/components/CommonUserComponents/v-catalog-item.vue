<template>
  <div class="align-items-center text-center card">
    <p class="card-header">{{ product_data.name }}</p>
    <p class="card-price fs-4">{{ product_data.cost }} ₽</p>
    <p class="card-category-name fs-4">{{ product_data.category_id.name }}</p>
    <button class="card-btn" @click="addToCart">Добавить в корзину</button>
  </div>
</template>

<script>
export default {
  name: 'v-catalog-item',
  props: {
    product_data: {
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
    addToCart() {
      this.$emit('addToCart', this.product_data);
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
  height: 200px;
  padding: 10px;
  margin: 10px;
}
</style>
