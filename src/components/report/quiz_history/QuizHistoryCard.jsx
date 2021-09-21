import React, {useState} from "react";
import {Accordion, Button, Card, Collapse, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useTranslation } from "react-i18next";

export default function QuizHistoryCard({item, ...dist}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Card className={"text-dark"} {...dist}>
                <div className="px-3 py-2">
                    <div className={"d-flex align-items-center"}>
                        <FontAwesomeIcon className={"me-3"} icon={"check-double"} size={"lg"}/>
                        <div style={{lineHeight: 1.2, flex: 1}}>
                            <div className={"fw-bold"}>{item.title}</div>
                            <small><b>{t('reports.quiz_history.score')}:</b> {item.total_point}</small>
                        </div>
                        <Button size={"sm"}
                                onClick={() => setOpen(!open)}
                        >
                            <FontAwesomeIcon className={"me-2"} icon={"eye"}/>
                            {t('reports.quiz_history.details')}
                        </Button>
                    </div>
                    <Collapse in={open}>
                        <div className={"pt-2 pb-2 mt-2 border-top"}>
                            <small className={"pb-2 d-block"}><b>{t('reports.quiz_history.answers')}</b></small>
                            <Accordion defaultActiveKey="0">
                                {item.answers.map((answer, i) => {
                                    return (
                                        <Accordion.Item eventKey={i} key={i}>
                                            <Accordion.Header>
                                                <div className="d-flex align-items-center my-n2">
                                                    <div className="me-2">{t('reports.quiz_history.question')} {i + 1}</div>
                                                    {answer.answer_is_correct ? (
                                                        <Button as={'div'} variant={"success"} size={"sm"}><FontAwesomeIcon
                                                            className={"me-2"} icon={"check-circle"}/>{t('reports.quiz_history.correct')}</Button>
                                                    ) : (
                                                        <Button as={'div'} variant={"danger"} size={"sm"}><FontAwesomeIcon
                                                            className={"me-2"} icon={"times-circle"}/>{t('reports.quiz_history.wrong')}</Button>
                                                    )}
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div><b>{t('reports.quiz_history.question')}: </b>{answer.question_text}</div>
                                                <div><b>{t('reports.quiz_history.selected_answer')}: </b>{answer.answer_text}</div>
                                                <Alert variant={answer.answer_is_correct ? "success" : "danger"} className={"px-3 py-2 mb-0 mt-2"}>
                                                    <b className={"pb-1 d-block"}><FontAwesomeIcon
                                                            className={"me-2"} icon={"info-circle"}/>{t('reports.quiz_history.topic_title')}</b>
                                                        <small>{answer.question_topic_content}</small>
                                                </Alert>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        </div>
                    </Collapse>
                </div>
            </Card>
        </div>
    )
}
