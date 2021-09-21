import ApiService from "../../services/api.service";

/**
 * Class to define API urls and HTTP requests for reports.
 */
class ReportService {
  readingHistoryAdd = ({ data }) => {
    return ApiService.post("/book/add-reading-history-record", data);
  };
  
}

const reportService = new ReportService();
export default reportService;
