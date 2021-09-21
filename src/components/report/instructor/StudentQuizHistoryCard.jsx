import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuizHistoryCard from './../quiz_history/QuizHistoryCard';

export default function StudentQuizHistoryCard({ student, ...dist }) {
    const { t } = useTranslation();
    const [show, setShow] = useState(null);

    return (
        <div>
            <Card className={"text-dark"} {...dist}>
                <div className="p-3">
                    <div className={"d-flex align-items-center"}>
                        <FontAwesomeIcon className={"me-3"} icon={"user"} size={"lg"} />
                        <div style={{ lineHeight: 1.2, flex: 1 }}>
                            <div className={"fw-bold"}>{student.first_name} {student.last_name} ({student.username})</div>
                            <small>{student.email}</small>
                        </div>
                        <div className="d-flex mx-n1 align-items-center">
                        </div>
                    </div>
                    <div className="my-2">
                        {student.quiz_history.length ? <div className={"mt-3"}>
                            <small className={"fw-bold pb-2 d-block"}>{t('reports.student_record.solved_quizzes')}</small>

                            {(!show && student.quiz_history.length > 3 ? student.quiz_history.slice(0, 3) : student.quiz_history).map((quizHistory, i) => {
                                return <QuizHistoryCard item={quizHistory} className="mb-2" key={i}/>
                            })}
                            {!show && student.quiz_history.length > 3 ? (
                                <div className={"text-center"}>
                                    <small style={{ cursor: "pointer" }} className={"mt-2 d-inline-block fw-bold"}
                                        onClick={() => {
                                            setShow(true)
                                        }}>{t('reports.student_record.show_all')}</small>
                                </div>
                            ) : null}
                        </div> : null}
                    </div>
                </div>
            </Card>
        </div>
    )
}