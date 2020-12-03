import http from "../http-common";

class PostDataService {
  getAll() {
    return http.get('/posts');
  }
};

export default new PostDataService();