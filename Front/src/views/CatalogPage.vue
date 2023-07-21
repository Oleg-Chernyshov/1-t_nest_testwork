<template>
  <Layout title="Товары">
    <CatalogList />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/Layout";
import CatalogList from "@/components/CatalogList/CatalogList";
import Btn from "@/components/Btn/Btn.vue";

export default {
  name: "Catalog",
  components: {
    Layout,
    CatalogList,
    Btn,
  },
};
</script>
