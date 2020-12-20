import http from "../http-common";

class InstructorsDataService {
  getAll() {
    return http.get("/instructors");
  }

  get(id) {
    return http.get(`/instructors/${id}`);
  }

  create(data) {
    return http.post("/instructors", data);
  }

  update(id, data) {
    return http.put(`/instructors/${id}`, data);
  }
}

export default new InstructorsDataService();
