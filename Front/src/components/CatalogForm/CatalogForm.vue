<template>
  <div :class="$style.root">
    <div v-if="form.id" :class="$style.item">
      <div :class="$style.label">
        <label for="id">ID</label>
      </div>
      <input
        v-model="form.id"
        disabled
        :class="$style.input"
        id="id"
        placeholder="id"
        type="text"
      />
    </div>
    <img
      v-if="form.photo_url"
      :src="form.photo_url"
      style="
        height: 200px;
        width: 200px;
        margin-left: 150px;
        margin-top: 20px;
        margin-bottom: 20px;
      "
    />
    <div :class="$style.item" v-else>
      <div :class="$style.label">
        <label for="photo">Фотография</label>
      </div>
      <input
        id="photo"
        placeholder="Имя"
        type="file"
        @change="onFileChange($event)"
      />
    </div>
    <div :class="$style.item">
      <div :class="$style.label">
        <label for="name">Название</label>
      </div>
      <input
        v-model="form.name"
        :class="$style.input"
        id="name"
        placeholder="Имя"
        type="text"
      />
    </div>
    <div :class="$style.item">
      <div :class="$style.label">
        <label for="price">Цена</label>
      </div>
      <input
        v-model="form.cost"
        :class="$style.input"
        id="price"
        placeholder="Цена"
        type="number"
      />
    </div>
    <div :class="$style.item">
      <div :class="$style.label">
        <label for="type">Тип</label>
      </div>
      <select
        v-model="form.category_id"
        :class="$style.select"
        name="type"
        id="type"
      >
        <option v-for="{ name, id } in CategoryList" :key="id" :value="name">
          {{ name }}
        </option>
      </select>
    </div>
    <div :class="$style.item">
      <Btn @click="onClick" :disabled="!isValidForm" theme="info"
        >Сохранить</Btn
      >
    </div>
  </div>
</template>

<script>
import { computed, reactive, onBeforeMount, watchEffect, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { selectItemById, fetchItems } from '@/store/catalog/selectors';
import {
  selectItems as selectGroups,
  fetchItems as fetchGroups,
} from '@/store/categories/selectors';
import Btn from '@/components/Btn/Btn';
import axios from 'axios';

export default {
  name: 'CatalogForm',
  props: {
    id: { type: String, default: '' },
  },
  components: {
    Btn,
  },
  setup(props, context) {
    const file = ref(null);
    const store = useStore();
    const router = useRouter();
    const CategoryList = computed(() => selectGroups(store));
    const form = reactive({
      id: '',
      name: '',
      photo_url: null,
      cost: 0,
      category_id: '',
    });

    onBeforeMount(() => {
      fetchItems(store);
      fetchGroups(store);
    });

    watchEffect(() => {
      const type = selectItemById(store, props.id);
      Object.keys(type).forEach((category_name) => {
        if (category_name == 'category_id') {
          form[category_name] = type[category_name].name;
        } else form[category_name] = type[category_name];
      });
    });

    return {
      CategoryList,
      form,
      isValidForm: computed(
        () => !!(form.name && form.cost >= 0 && form.category_id),
      ),
      onClick: async () => {
        if (file.value)
          await axios
            .post(
              'http://localhost:3000/files',
              { file: file.value },
              { headers: { 'Content-Type': 'multipart/form-data' } },
            )
            .then((result) => {
              form.photo_url = result.data;
            });
        let index = -1;
        for (let i = 0; i < CategoryList.value.length; i++) {
          if (CategoryList.value[i].name == form.category_id)
            index = CategoryList.value[i].id;
        }
        form.category_id = index;
        context.emit('submit', form);
        router.push({ name: 'Catalog' });
      },
      onFileChange: (data) => {
        file.value = data.target.files[0];
      },
    };
  },
};
</script>

<style module lang="scss">
.root {
  padding-top: 30px;
  max-width: 900px;

  .item {
    display: flex;
    align-items: center;

    & + .item {
      margin-top: 15px;
    }
  }

  .label {
    flex: 0 0 150px;
  }

  .input {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .select {
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    appearance: none;
  }
}
</style>
