import ApiService from "../../services/api.service";

class CountryService {
  list = () => {
    return ApiService.get("/country/country-list");
  };
  detail = (country) => {
    return ApiService.get("/country/country-detail/" + country);
  };
}

const countryService = new CountryService();
export default countryService;
