<template>
  <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
    <CatalogForm @submit="onSubmit" :id="id" />
  </Layout>
</template>

<script>
import { useStore } from "vuex";

import { updateItem, addItem } from "@/store/catalog/selectors";
import CatalogForm from "@/components/CatalogForm/CatalogForm";
import Layout from "@/components/Layout/Layout";

export default {
  name: "CategoryEdit",
  props: {
    id: String,
  },
  components: {
    Layout,
    CatalogForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, name, description, cost, category_id }) =>
        id
          ? updateItem(store, {
              id,
              name,
              description,
              cost,
              category_id,
            })
          : addItem(store, {
              name,
              description,
              cost,
              category_id,
            }),
    };
  },
};
</script>
