import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getPublicContent() {
    return axios.get(process.env.REACT_APP_API_URL + "api/v1/animals");
  }

  getUserBoard() {
    return axios.get(process.env.REACT_APP_API_URL + "user", { headers: authHeader() });
  }

  getOwerPets() {
    return axios.get(process.env.REACT_APP_API_URL + 'api/v1/animals/owner_pets', { 
      headers: authHeader()
    } )
  }
}

export default new UserService();
