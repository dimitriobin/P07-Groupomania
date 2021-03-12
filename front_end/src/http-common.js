import axios from 'axios';

export default axios.create({
  baseURL: 'https://powerful-badlands-53803.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json',
  },
});
