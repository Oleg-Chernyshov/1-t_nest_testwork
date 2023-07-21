import Api from '@/api/index';
import axios from 'axios';

class Catalog extends Api {

  /**
   * Вернет список всех студентов
   * @returns {Promise<Response>}
   */
  catalog = () => this.rest('/catalog',{
    method: 'GET',
  });

  /**
   * Вернет отфлильтрованный список работ
   * @param works объект работы, взятый из FormStudent
   * @returns {Promise<*>}
   */
  filter = (type_id) => this.rest('/catalog/filter/' + type_id,{
    method: 'GET',
    headers: {
      "Content-type": 'application/x-www-form-urlencoded'
    }
  })

  /**
   * Удалит работу по id
   * @param id
   * @returns {Promise<*>}
   */
  remove = ( id ) =>   
  axios
  .delete(
    "http://localhost:3000/catalog/" + id,
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
   * @param student объект работы, взятый из FormWorks
   * @returns {Promise<Response>}
   */
  add = (catalog) =>   axios
  .post(
    "http://localhost:3000/catalog",
    catalog,
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
   * @param work объект работы, взятый из FormStudent
   * @returns {Promise<*>}
   */
  update = ( catalog ) => 
  axios
  .patch(
    "http://localhost:3000/catalog/" + catalog.id,
    {
      name: catalog.name,
      cost: catalog.cost,
      category_id: catalog.category_id
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

export default new Catalog();
