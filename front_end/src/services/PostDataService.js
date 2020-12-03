import http from "../http-common";

class PostDataService {
  create(data) {
    return http.post('/posts', data);
  }

  getAll() {
    return http.get('/posts');
  }

  getAllByUser(id) {
    return http.get(`/posts/user/${id}`);
  }

  getAllBySubject(id) {
    return http.get(`/posts/subject/${id}`);
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }

  findByKeyword(keyword) {
    return http.get(`/posts?keyword=${keyword}`);
  }
};

export default new PostDataService();