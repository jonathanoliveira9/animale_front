import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://0.0.0.0:3001/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "/api/v1/animals");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
