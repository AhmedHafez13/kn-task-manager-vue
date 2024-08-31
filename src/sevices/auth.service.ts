import axios from './axios';

const BASE_PATH = '/api';

export default class AuthService {
  static register(data: { email: string; name: string; password: string }) {
    return axios.post(BASE_PATH + '/register', data);
  }

  static login(data: { email: string; password: string }) {
    return axios.post(BASE_PATH + '/login', data);
  }
}
