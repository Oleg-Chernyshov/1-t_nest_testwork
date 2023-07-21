<template>
  <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
    <CategoryForm :id="id" @submit="onSubmit" />
  </Layout>
</template>

<script>
import { useStore } from "vuex";

import { updateItem, addItem } from "@/store/categories/selectors";
import Layout from "@/components/Layout/Layout";
import CategoryForm from "@/components/CategoryForm/CategoryForm";
export default {
  name: "CategoryEdit",
  props: {
    id: String,
  },
  components: {
    Layout,
    CategoryForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, name }) =>
        id ? updateItem(store, { id, name }) : addItem(store, { name }),
    };
  },
};
</script>
