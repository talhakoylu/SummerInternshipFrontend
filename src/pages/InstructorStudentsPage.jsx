import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/actions/auth.action";
import { SchoolService } from "../redux/services";
import Area from './../components/Area';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChildCard from './../components/report/ChildCard';
import ReadingHistoryModal from './../components/report/reading_history/ReadingHistoryModal';
import QuizHistoryModal from './../components/report/quiz_history/QuizHistoryModal';
import AddStudentModal from './../components/report/AddStudentModal';
import { useSelector } from "react-redux";
import RedirectToHome from './../components/RedirectToHome';
import { useTranslation } from "react-i18next";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function InstructorStudentsPage() {
    let query = useQuery();
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [readingHistoryShow, readingHistorySetShow] = useState(false);
    const readingHistoryHandleClose = () => readingHistorySetShow(false);
    const readingHistoryHandleShow = () => readingHistorySetShow(true);
    const [quizHistoryShow, quizHistorySetShow] = useState(false);
    const quizHistoryHandleClose = () => quizHistorySetShow(false);
    const quizHistoryHandleShow = () => quizHistorySetShow(true);

    const auth = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const [classroom, setClassroom] = useState(null);
    const [children, setChildren] = useState([]);

    const getChildren = () => {
        dispatch(setLoading(true))
        SchoolService.studentListByClassInstructor()
            .then((res) => {
                let _classroom = res.data.find(x => x.id.toString() === query.get('classroom'));
                setClassroom(_classroom)
                setChildren(_classroom?.students || [])
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        getChildren()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return auth.user && auth.user.user_type === 4 ? (classroom ? (
        <>
            <Container>
                <Area title={classroom.name + ": " + t('reports.student_record.students')}
                    toolbar={(
                        <div className={"d-flex align-items-center m-n2"}>
                            <Link to={"/profile/classroom/reports/quiz-report?classroom=" + classroom.id}>
                                <Button variant={"warning"} className={"m-2"} size={"sm"}>
                                    <FontAwesomeIcon className={"me-2"} icon={"eye"} />
                                    {t('reports.student_record.quiz_history_all')}
                                </Button>
                            </Link>
                            <Link to={"/profile/classroom/reports/reading-report?classroom=" + classroom.id}>
                                <Button variant={"success"} className={"m-2"} size={"sm"}>
                                    <FontAwesomeIcon className={"me-2"} icon={"eye"} />
                                    {t('reports.student_record.read_history_all')}
                                </Button>
                            </Link>
                            <Button className={"m-2"} size={"sm"} onClick={() => handleShow()}>
                                <FontAwesomeIcon className={"me-2"} icon={"plus"} />
                                {t('reports.student_record.add_new_student')}
                            </Button>
                        </div>
                    )}>
                    {children.length ? (
                        <Row className={"my-n2"}>
                            {
                                children.map((child, i) => {
                                    return (
                                        <ChildCard
                                            deleteService={() => SchoolService.studentListItemDestroy(classroom.id, child.child.user.id)}
                                            quizHistoryHandleShow={quizHistoryHandleShow}
                                            readingHistoryHandleShow={readingHistoryHandleShow} setUser={setUser}
                                            children={children} setChildren={setChildren} child={child}
                                            className={"my-2"}
                                            key={i} />
                                    )
                                })
                            }
                        </Row>
                    ) : (
                        <div className={"small text-muted p-3 text-center"}> {t('reports.student_record.student_not_found')}</div>
                    )}
                </Area>
                <ReadingHistoryModal user={user} getChildren={getChildren} show={readingHistoryShow}
                    handleClose={readingHistoryHandleClose} />
                <QuizHistoryModal user={user} getChildren={getChildren} show={quizHistoryShow}
                    handleClose={quizHistoryHandleClose} />
                <AddStudentModal classroom={classroom} getChildren={getChildren} show={show} handleClose={handleClose} />
            </Container>
        </>
    ) : null
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
