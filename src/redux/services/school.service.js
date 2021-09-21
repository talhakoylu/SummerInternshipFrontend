import ApiService from "../../services/api.service";

class SchoolService {
  list = () => {
    return ApiService.get("/school/school-list");
  };
  classList = () => {
    return ApiService.get("/school/class-list-by-instructor");
  };
  classAdd = (payload) => {
    return ApiService.post("/school/class-add", payload);
  };
  classUpdate = (id, payload) => {
    return ApiService.patch("/school/class-update/" + id, payload);
  };
  classDelete = (id) => {
    return ApiService.delete("/school/class-update/" + id);
  };
  studentListByClassInstructor = () => {
    return ApiService.get("/school/student-list-by-class-instructor");
  };
  addStudentListItem = (payload) => {
    return ApiService.post("/school/add-student-list-item", payload);
  };
  getClassReadingHistoryByInstructor = () => {
    return ApiService.get(
      "/school/reports/get-class-reading-history-by-instructor"
    );
  };
  getClassQuizHistoryByInstructor = () => {
    return ApiService.get(
      "/school/reports/get-class-quiz-history-by-instructor"
    );
  };
  studentListItemDestroy = (classId, childId) => {
    return ApiService.delete(
      "/school/student-list-item-destroy/" + classId + "-" + childId
    );
  };
  getAllClassQuizHistoryByPrincipal = () => {
    return ApiService.get(
      "/school/reports/get-all-classes-quiz-history-by-school-principal"
    );
  };
  getAllClassReadingHistoryByPrincipal = () => {
    return ApiService.get(
      "/school/reports/get-all-class-reading-history-by-principal"
    );
  };
  getAllClassHistoryByCountryForByPrincipal = () => {
    return ApiService.get(
      "/school/reports/get-all-class-reading-history-by-country-for-principal"
    );
  };
}

const schoolService = new SchoolService();
export default schoolService;
