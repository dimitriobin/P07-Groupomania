import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/';

class AuthService {
  login(user) {
    return axios
      .post(`${API_URL}login`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(`${API_URL}signup`, {
      user_name: user.username,
      email: user.email,
      password: user.password,
      image_url: user.image,
      // birthdate: user.birthdate,
      // parentEmail: user.parentEmail,
      // restricted: user.restricted,
      // shareWithPartners: user.shareWithPartners,
      // contactable: user.contactable
    });
  }
}

export default new AuthService();
