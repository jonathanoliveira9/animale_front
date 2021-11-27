import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post(process.env.REACT_APP_API_URL + "users/sign_in", {user: { email, password } })
      .then((response) => {
        if (response.headers.authorization) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("authorization", JSON.stringify(response.headers.authorization))
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, phone, city, country, password, password_confirmation) {
    return axios.post(process.env.REACT_APP_API_URL + "users", {
      user: {
        name,
        email,
        phone,
        city,
        country,
        password,
        password_confirmation
      },
    });
  }
}

export default new AuthService();
