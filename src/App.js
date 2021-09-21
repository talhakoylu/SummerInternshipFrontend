import "./App.css";
import "./assets/scss/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Header from "./components/partials/Header";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { setLanguage, setUser } from "./redux/actions/auth.action";
import { ApiService } from "./services";
import { AuthService } from "./redux/services";
import { useTranslation } from "react-i18next";
import FullWidthLayoutRoute from "./layouts/FullWidthLayout";
import LayoutWidthSidebarRoute from "./layouts/LayoutWithSidebar";
import BooksPage from "./pages/BooksPage";
import localStorageClear from "./plugins/localStorageClear";
import Footer from "./components/partials/Footer";
import BookDetail from "./pages/BookDetail";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailPage from './pages/AuthorDetailPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import ReadingHistoryPage from './pages/ReadingHistoryPage';
import ParentChildrenPage from './pages/ParentChildrenPage';
import QuizHistoryPage from './pages/QuizHistoryPage';
import InstructorClassroomsPage from './pages/InstructorClassroomsPage';
import InstructorStudentsPage from "./pages/InstructorStudentsPage";
import InstructorStudentsReportReadingPage from "./pages/InstructorStudentsReportReadingPage";
import InstructorStudentsReportQuizPage from './pages/InstructorStudentsReportQuizPage';
import SchoolPage from './pages/SchoolPage';
import SchoolReportsReadingPage from './pages/SchoolReportsReadingPage';
import SchoolReportsQuizPage from './pages/SchoolReportsQuizPage';

library.add(fab, fas, far);

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const lang = localStorage.getItem("lang");
  const [isReady, setIsReady] = useState(false);

  // Checks the token data and preferred language data in this useEffect function.
  // If user token expired, localStorage will be cleared.
  useEffect(() => {
    async function init() {
      const lang = await localStorage.getItem("lang");
      const language = lang || "tr";
      ApiService.defaults.headers.common["Accept-Language"] = language;
      dispatch(setLanguage(language));
      i18n.changeLanguage(language);

      const token = await localStorage.getItem("token");
      if (token) {
        const user = await localStorage.getItem("user");
        dispatch(setUser(JSON.parse(user)));
        await AuthService.me()
          .then((res) => {
            dispatch(setUser(res.data));
          })
          .catch((err) => {
            localStorageClear();
          })
          .finally(() => {
            setIsReady(true);
          });
      } else {
        setIsReady(true);
      }
    }
    init();
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const loading = useSelector((state) => state.auth.loading)

  return isReady && (
    <div className="App">
      <Router>
        <div>
          <div className={"min-vh-100 d-flex flex-column"}>
            <Header></Header>
            <div style={{ flex: 1 }} className={"position-relative"}>
              {loading && (
                <div
                  className={
                    "position-absolute bg-white w-100 h-100 d-flex justify-content-center align-items-center"
                  }
                  style={{ zIndex: 20 }}
                >
                  <img
                    className={"d-inline-block"}
                    src={"/fetching.svg"}
                    alt="Loading"
                  />
                </div>
              )}
              <Switch>
                <LayoutWidthSidebarRoute path="/books" component={BooksPage}/>
                <FullWidthLayoutRoute path="/book/:slug" component={BookDetail} />
                <FullWidthLayoutRoute path="/authors" component={AuthorsPage} />
                <FullWidthLayoutRoute path="/author/:slug" component={AuthorDetailPage} />
                <FullWidthLayoutRoute path="/profile/update" component={ProfilePage} />
                <FullWidthLayoutRoute path="/profile/password-change" component={ChangePassword} />
                <FullWidthLayoutRoute path="/profile/reading-history" component={ReadingHistoryPage} />
                <FullWidthLayoutRoute path="/profile/quiz-history" component={QuizHistoryPage} />
                <FullWidthLayoutRoute path="/profile/my-children" component={ParentChildrenPage} />
                <FullWidthLayoutRoute path="/profile/my-classrooms" component={InstructorClassroomsPage} />
                <FullWidthLayoutRoute path="/profile/classroom/students" component={InstructorStudentsPage} />
                <FullWidthLayoutRoute path="/profile/classroom/reports/reading-report" component={InstructorStudentsReportReadingPage} />
                <FullWidthLayoutRoute path="/profile/classroom/reports/quiz-report" component={InstructorStudentsReportQuizPage} />
                <FullWidthLayoutRoute path="/profile/my-school" component={SchoolPage} />
                <FullWidthLayoutRoute path="/profile/my-school" component={SchoolPage} />
                <FullWidthLayoutRoute path="/profile/my-school-reports/reading-history" component={SchoolReportsReadingPage} />
                <FullWidthLayoutRoute path="/profile/my-school-reports/quiz-history" component={SchoolReportsQuizPage} />
                <FullWidthLayoutRoute path="/" component={HomePage} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
