import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/courses");
  }

  get(id) {
    console.log(id)
    return http.get(`/courses/${id}`);
  }

  create(data) {
    return http.post("/courses", data);
  }

  update(id, data) {
    return http.put(`/courses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/courses/${id}`);
  }

  deleteAll() {
    return http.delete(`/courses`);
  }

  findByTitle(title) {
    return http.get(`/courses?title=${title}`);
  }
}

export default new TutorialDataService();
