class Api {
  constructor() {
    this.base = 'http://localhost:3000';
  }

  request = async (method, options) => {
    const url = this.base + method;
    return fetch(url, { ...options, headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    })
  }

  rest = async (method, options) => {
    return this.request(method, options)
      .then((data) => data);
  }

}

export default Api;
