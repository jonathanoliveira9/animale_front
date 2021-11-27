import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "/api/v1/animals");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
