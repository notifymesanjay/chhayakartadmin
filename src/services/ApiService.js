import appConstant from "../components/appConstant";

export default class ApiService {
  constructor(baseUrl = appConstant.API_ENDPOINT) {
    this.baseUrl = baseUrl;
  }

  get getHeaders() {
    let headers = {
      accept: "application/json",
      //role:"Admin"
    };

    if (typeof localStorage !== "undefined") {
      const authData = JSON.parse(localStorage.getItem("authorizationData"));
      if (authData) {
        headers.Authorization = `Bearer ${authData.access_token}`; 
      }
    }

    return headers;
  }

  get postHeaders() {
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    if (typeof localStorage !== "undefined") {
      const authData = JSON.parse(localStorage.getItem("authorizationData"));
      if (authData) {
        headers.Authorization = `Bearer ${authData.access_token}`;
      }
    }

    return headers;
  }

  get postFormHeaders() {
    let headers = {};
    if (localStorage) {
      const authData = JSON.parse(localStorage.getItem("authorizationData"));
      if (authData) {
        headers.Authorization = `Bearer ${authData.access_token}`;
      }
    }

    return headers;
  }

  get(url) {
    return fetch(`${this.baseUrl}${url}`, {
      headers: this.getHeaders,
      method: "GET",
    })
      .catch((error) => {
        throw error;
      })
      .then((res) => {
        if (!res.ok) {
          window.location.replace("/login");
          return res.json().then((data) => {
            var err = new Error();
            err.response = res;
            err.data = data;
            throw err;
          });
        }
        return res;
      })
      // .then((res) => res.json());
  }

  post(url, data, hasFullUrl = false) {
    let apiUrl = hasFullUrl ? url : this.baseUrl + url;
    return fetch(apiUrl, {
      headers: this.postHeaders,
      method: "POST",
      body: JSON.stringify(data || {}),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          var err = new Error();
          err.response = res;
          err.data = data;
          throw err;
        });
      }
      return res;
    });
  }

  put(url, data) {
    return fetch(`${this.baseUrl}${url}`, {
      headers: this.postHeaders,
      method: "PUT",
      body: JSON.stringify(data || {}),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          var err = new Error();
          err.response = res;
          err.data = data;
          throw err;
        });
      }
      return res;
    });
  }

  delete(url) {
    return fetch(`${this.baseUrl}${url}`, {
      headers: this.getHeaders,
      method: "DELETE",
    })
      .catch((error) => {
        throw error;
      })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            var err = new Error();
            err.response = res;
            err.data = data;
            throw err;
          });
        }
        return res;
      })
      .then((res) => res.json());
  }

  postForm(url, formData, method = "POST") {
    return fetch(`${this.baseUrl}${url}`, {
      headers: this.postFormHeaders,
      method: method,
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          var err = new Error();
          err.response = res;
          err.data = data;
          console.log(err);
          throw err;
        });
      }
      return res;
    });
  }
}
