export const fetchItems = ( store ) => {
  const { dispatch } = store;
  dispatch('categories/fetchItems');
};

export const selectItems = ( store ) => {
  const { getters } = store;
  return getters['categories/items']
}

export const removeItem = ( store, id ) => {
  const { dispatch } = store;
  dispatch('categories/removeItem', id);
}

export const addItem = ( store, { name } ) => {
  const { dispatch } = store;
  dispatch('categories/addItem', { name });
}

export const updateItem = ( store, { id, name }) => {
  const { dispatch } = store;
  dispatch('categories/updateItem', { id, name });
}

export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['categories/itemsByKey'][id] || {};
}
