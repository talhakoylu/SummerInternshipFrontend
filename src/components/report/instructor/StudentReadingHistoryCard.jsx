import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function StudentReadingHistoryCard({ student, ...dist}) {
    const { t } = useTranslation()
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
                    {student.reading_history.length ? <div className={"mt-3"}>
                        <small className={"fw-bold"}>{t('reports.student_record.books_read')}</small>
                        {(!show && student.reading_history.length > 3 ? student.reading_history.slice(0, 3) : student.reading_history).map((readingHistory, i) => {
                            return (
                                <div style={{ borderBottomWidth: 1, borderColor: "#ccc", borderBottomStyle: "dashed" }} className="my-1" key={i}>
                                    <FontAwesomeIcon className={"me-2"} icon={"newspaper"} />
                                    <small>{readingHistory.book.name} <Badge bg={"warning"} className="ms-3 mb-1">{t('reports.student_record.read_count')}: {readingHistory.counter}</Badge></small>
                                </div>
                            )
                        })}
                        {!show && student.reading_history.length > 3 ? (
                            <div className={"text-center"}>
                                <small style={{ cursor: "pointer" }} className={"mt-2 d-inline-block fw-bold"} onClick={() => {
                                    setShow(true)
                                }}>{t('reports.student_record.show_all')}</small>
                            </div>
                        ) : null}
                    </div> : null}
                </div>
            </Card>
        </div>
    )
}