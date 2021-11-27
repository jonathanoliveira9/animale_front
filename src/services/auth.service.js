import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "users/sign_in", {user: { email, password } })
      .then((response) => {
        if (response.headers.authorization) {
          
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, phone, city, country, password, password_confirmation) {
    return axios.post(API_URL + "users", {
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
