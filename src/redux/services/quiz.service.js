import ApiService from "../../services/api.service";

class QuizService {
    list = (query) => {
        return ApiService.get("/quiz/quiz-list-all");
    };
    lastQuizByBook = (book) => {
        return ApiService.get("/quiz/get-last-enabled-quiz-by-book-id/" + book);
    };
    createTakingQuiz = (payload) => {
        return ApiService.post("/quiz/create-taking-quiz", payload);
    };
    updateTakingQuiz = (id) => {
        return ApiService.patch("/quiz/update-taking-quiz/" + id);
    };
    createTakingQuizAnswer = (payload) => {
        return ApiService.post("/quiz/create-taking-quiz-answer", payload);
    };
    getQuizHistoryByChild = () => {
        return ApiService.get("/quiz/get-quiz-history-by-child");
    };
    getQuizHistoryByChildId = (child) => {
        return ApiService.get("/quiz/get-quiz-history-by-child-id/" + child);
    };
}

const quizService = new QuizService();
export default quizService;
