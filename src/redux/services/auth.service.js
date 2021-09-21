import ApiService from "../../services/api.service";

/**
 * Class to define API urls and HTTP requests for user information.
 */
class AuthService {
  token = ({ data }) => {
    return ApiService.post("/token/", data);
  };
  refreshToken = ({ data }) => {
    return ApiService.post("/token/refresh", data);
  };
  register = ({ data }) => {
    return ApiService.post("/account/register", data);
  };
  me = () => {
    return ApiService.get("/account/me");
  };
  childProfileUpdate = (payload) => {
    return ApiService.patch("/account/child-profile-update", payload);
  };
  parentProfileUpdate = (payload) => {
    return ApiService.patch("/account/parent-profile-update", payload);
  };
  instructorProfileUpdate = (payload) => {
    return ApiService.patch("/account/instructor-profile-update", payload);
  };
  getChildProfile = () => {
    return ApiService.get("/account/child-profile-update");
  };
  getParentProfile = () => {
    return ApiService.get("/account/parent-profile-update");
  };
  getInstructorProfile = () => {
    return ApiService.get("/account/instructor-profile-update");
  };
  updatePassword = (payload) => {
    return ApiService.patch("/account/update-password", payload);
  };
  childList = (payload) => {
    return ApiService.get("/account/child-list-by-parent", payload);
  };
  addChildRecord = (payload) => {
    return ApiService.post("/account/add-child-record", payload);
  };
  getChildByIdentity = (identityNumber) => {
    return ApiService.get("/account/get-child-by-identity/" + identityNumber);
  };
  destroyChildRecord = (child) => {
    return ApiService.delete("/account/destroy-child-record/" + child);
  };
}

const authService = new AuthService();
export default authService;