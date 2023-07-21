import { createStore } from 'vuex'
import catalog from './catalog';
import categories from './categories';
export default createStore({
  modules: {
    categories,
    catalog,
  },
  state: {},
  mutations: {},
  actions: {},
})
