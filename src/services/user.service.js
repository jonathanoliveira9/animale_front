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

  postCommunicators(name, phone, occurrence, animal_id) {
    return axios.post(process.env.REACT_APP_API_URL + 'api/v1/communicators', 
    { "name": name,
       "phone": phone,
       "occurrence": occurrence,
       "animal_id": animal_id
    }
    )
  }

  postAnimal(name, age, extra_information) {
    return axios.post(process.env.REACT_APP_API_URL + 'api/v1/animals',
    {
      "name": name,
      "age": age,
      "extra_information": extra_information
    }, { headers: authHeader() })
  }
}

export default new UserService();
