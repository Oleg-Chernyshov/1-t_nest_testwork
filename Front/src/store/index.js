import { createStore } from 'vuex'
import catalog from './catalog';
import categories from './categories';
import axios from 'axios';
export default createStore({
  modules: {
    categories,
    catalog,
  },
state: {
    products: [],
    cart: [],
    sum: 0
  },
  getters: {
    PRODUCTS (state) {
      return state.products
    },
    CART (state) {
      return state.cart
    },
    SUM (state) {
      return state.sum
    },
    QUANTITY_G (state) {
      return state.cart.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)
    }
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products
    },
    SET_CART: (state, product) => {
      if(!product.quantity){
        product.quantity = 0
      }
      if (product.quantity === 0 || !state.products.includes(product)) {
        state.cart.push(product)
        product.quantity++
      } else {
        product.quantity++
      }
      state.sum += product.cost
    },
    REMOVE_FROM_CART: (state, index) => {
      state.sum -= state.cart[index].cost
      if (state.cart[index].quantity === 1) {
        state.cart[index].quantity--
        state.cart.splice(index, 1)
      } else {
        state.cart[index].quantity--
      }
    }
  },
  actions: {
    GET_PRODUCTS_FROM_API ({ commit }) {
      return axios('http://localhost:3000/catalog', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
      })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data)
          return products
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    ADD_TO_CART ({ commit }, product) {
      commit('SET_CART', product)
    },
    DELETE_FROM_CART ({ commit }, index) {
      commit('REMOVE_FROM_CART', index)
    }
  },

})
