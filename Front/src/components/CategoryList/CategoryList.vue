<template>
  <div :class="$style.root">
    <Table
      :headers="[
        { isCategory: 'false' },
        { value: 'id', text: 'ID' },
        { value: 'name', text: 'Тип' },
        { value: 'control', text: 'Действие' },
      ]"
      :items="items"
    >
      <template v-slot:control="{ item }">
        <Btn @click="onClickEdit(item['id'], item['name'])" theme="info"
          >Изменить</Btn
        >
        <Btn @click="onClickRemove(item['id'])" theme="danger">Удалить</Btn>
      </template>
    </Table>
    <RouterLink :to="{ name: 'CategoryEdit' }">
      <Btn :class="$style.create" theme="info">Создать</Btn>
    </RouterLink>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  selectItems,
  removeItem,
  fetchItems,
} from "@/store/categories/selectors";
import Table from "@/components/Table/Table";
import Btn from "@/components/Btn/Btn";
export default {
  name: "CategoryList",
  components: {
    Btn,
    Table,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const items = computed(() => selectItems(store));
    onMounted(() => {
      fetchItems(store);
    });
    return {
      items,
      onClickRemove: (id) => {
        const isConfirmRemove = confirm(
          "Вы действительно хотите удалить запись?"
        );
        if (isConfirmRemove) {
          removeItem(store, id);
          fetchItems(store);
        }
      },
      onClickEdit: (id, name) => {
        router.push({ name: "CategoryEdit", params: { id, name } });
      },
    };
  },
};
</script>

<style module lang="scss">
.root {
  .create {
    margin-top: 16px;
  }
}
</style>
