export const fetchItems = (store) => {
  const { dispatch } = store;
  dispatch('catalog/fetchItems');
};

export const selectItems = (store) => {
  const { getters } = store;
  return getters['catalog/items']
}

export const removeItem = (store, id) => {
  const { dispatch } = store;
  dispatch('catalog/removeItem', id);
}

export const addItem = (store, { name, cost, category_id }) => {
  const { dispatch } = store;
  dispatch('catalog/addItem', { name, cost, category_id });
}

export const updateItem = (store, { id, name, cost, category_id }) => {
  const { dispatch } = store;
  dispatch('catalog/updateItem', { id, name, cost, category_id });
}

export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['catalog/itemsByKey'][id] || {};
}

export const filter = (store, type_id) => {
  const { dispatch } = store;
  dispatch('catalog/filter', { type_id })
}
