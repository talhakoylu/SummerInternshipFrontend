import React, { useEffect, useState } from "react";
import _ from 'lodash';
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/actions/auth.action";
import { SchoolService } from "../redux/services";
import Area from './../components/Area';
import { Link } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StudentQuizHistoryCard from './../components/report/instructor/StudentQuizHistoryCard';
import { useTranslation } from "react-i18next";
import RedirectToHome from './../components/RedirectToHome';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function InstructorStudentsReportQuizPage() {
    const { t } = useTranslation();
    let query = useQuery();
    const auth = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const [classroom, setClassroom] = useState(null);
    const [mostWrongQuestion, setMostWrongQuestion] = useState(null);

    const getChildren = () => {
        dispatch(setLoading(true))
        SchoolService.getClassQuizHistoryByInstructor()
            .then((res) => {
                let _classroom = res.data.find(x => x.id.toString() === query.get('classroom'));
                setClassroom(_classroom)

                let answers = [];

                _classroom?.students?.length && _classroom.students.map((student) => { // eslint-disable-line array-callback-return
                    student.student.quiz_history.length && student.student.quiz_history.map((quizHistory) => { // eslint-disable-line array-callback-return
                        let wrongAnswers = quizHistory.answers.filter(x => x.answer_is_correct === false);
                        if (wrongAnswers.length) {
                            answers = answers.concat(wrongAnswers)
                        }
                    })
                })

                let searchMostWrongQuestions = _.orderBy(_.groupBy(answers, 'question'), [function (o) {
                    return o.length;
                }], ['desc']);

                if (searchMostWrongQuestions.length) {
                    let answer = searchMostWrongQuestions[0][0];

                    setMostWrongQuestion({
                        id: answer.question,
                        title: answer.question_text,
                        subject: answer.question_topic_content,
                        count: searchMostWrongQuestions[0].length,
                    });
                } else {
                    setMostWrongQuestion(null);
                }
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
                <Area title={classroom.name + ": " + t('reports.student_record.quiz_history_all')}
                    toolbar={(
                        <Link to={"/profile/classroom/students?classroom=" + classroom.id}>
                            <Button variant={"light"} size={"sm"}>
                                <FontAwesomeIcon className={"me-2"} icon={"chevron-left"} />
                                {t('reports.turn_back')}
                            </Button>
                        </Link>
                    )}>
                    {classroom.students.length ? (
                        <div>
                            {mostWrongQuestion ? (
                                <div className={"mb-2"}>
                                    <div className={"m-n2"}>
                                        <Button className={"m-2"} variant={"danger"}>
                                            <FontAwesomeIcon className={"me-2"} icon={"question-circle"} />
                                            {t('reports.student_record.most_incorrectly_answered_question')}: <b>{mostWrongQuestion.title} ({mostWrongQuestion.count} {t('reports.times')})</b>
                                        </Button>
                                    </div>
                                </div>
                            ) : null}
                            <Row className={"my-n2"}>
                                {
                                    classroom.students.map((student, i) => {
                                        return (
                                            <StudentQuizHistoryCard student={student.student} className={"my-2"} key={i}/>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    ) : (
                        <div className={"small text-muted p-3 text-center"}>{t('reports.student_record.student_not_found')}</div>
                    )}
                </Area>
            </Container>
        </>
    ) : null
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
