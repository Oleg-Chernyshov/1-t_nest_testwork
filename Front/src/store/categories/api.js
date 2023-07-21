import Api from '@/api/index';
import axios from 'axios';

class Types extends Api {

  /**
   * Вернет список всех групп
   * @returns {Promise<Response>}
   */
  category = () => this.rest('/categories');

  /**
   * Удалит группу по id
   * @param id
   * @returns {Promise<*>}
   */
  remove = ( id ) =>   
  axios
  .delete(
    "http://localhost:3000/categories/" + id,
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    }
  )
  .then((result) => {
    return id
  });

  /**
   * Создаст новую запись в таблице
   * @param type объект группы, взятый из TypeGroup
   * @returns {Promise<Response>}
   */
  add = ( category ) =>    
  axios
  .post(
    "http://localhost:3000/categories",
    category,
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    }
  )
  .then((result) => {
    return result.data
  });

  /**
   * Отправит измененную запись
   * @param type объект группы, взятый из TypeGroup
   * @returns {Promise<*>}
   */
  update = ( category ) => axios
  .patch(
    "http://localhost:3000/categories/" + category.id,
    {
      name: category.name
    },
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    }
  )
  .then((result) => {
    return result.data
  });

}

export default new Types();
