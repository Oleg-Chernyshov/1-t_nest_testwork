<template>
  <Layout title="Товары">
    <CatalogSortedList />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/Layout";
import CatalogSortedList from "@/components/CatalogSortedList/CatalogSortedList";
import Btn from "@/components/Btn/Btn.vue";

export default {
  name: "Catalog",
  components: {
    Layout,
    CatalogSortedList,
    Btn,
  },
};
</script>
