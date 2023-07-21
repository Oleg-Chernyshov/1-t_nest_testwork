<template>
  <Layout title="Категории">
    <CategoryList />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/Layout";
import CategoryList from "@/components/CategoryList/CategoryList";

export default {
  name: "CategoryPage",
  components: {
    Layout,
    CategoryList,
  },
};
</script>
